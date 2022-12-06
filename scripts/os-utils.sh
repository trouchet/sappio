#!/bin/bash

set -e

# strip "v" prefix if present
VERSION="${VERSION#v}"

command_exists() {
	command -v "$@" > /dev/null 2>&1
}

# calver_compare compares two CalVer (YY.MM) version strings. returns 0 (success)
# if version A is newer or equal than version B, or 1 (fail) otherwise. Patch
# releases and pre-release (-alpha/-beta) are not taken into account
#
# examples:
#
# calver_compare 20.10 19.03 // 0 (success)
# calver_compare 20.10 20.10 // 0 (success)
# calver_compare 19.03 20.10 // 1 (fail)
calver_compare() (
	set +x

	yy_a="$(echo "$1" | cut -d'.' -f1)"
	yy_b="$(echo "$2" | cut -d'.' -f1)"
	if [ "$yy_a" -lt "$yy_b" ]; then
		return 1
	fi
	if [ "$yy_a" -gt "$yy_b" ]; then
		return 0
	fi
	mm_a="$(echo "$1" | cut -d'.' -f2)"
	mm_b="$(echo "$2" | cut -d'.' -f2)"
	if [ "${mm_a#0}" -lt "${mm_b#0}" ]; then
		return 1
	fi

	return 0
)

# version_gte checks if the version specified in $VERSION is at least
# the given CalVer (YY.MM) version. returns 0 (success) if $VERSION is either
# unset (=latest) or newer or equal than the specified version. Returns 1 (fail)
# otherwise.
#
# examples:
#
# VERSION=20.10
# version_gte 20.10 // 0 (success)
# version_gte 19.03 // 0 (success)
# version_gte 21.10 // 1 (fail)
version_gte() {
	if [ -z "$VERSION" ]; then
			return 0
	fi
	eval calver_compare "$VERSION" "$1"
}

get_distribution() {
	lsb_dist=""

	# Every system that we officially support has /etc/os-release
	if [ -r /etc/os-release ]; then
		lsb_dist="$(. /etc/os-release && echo "$ID")"
	fi
	# Returning an empty string here should be alright since the
	# case statements don't act unless you provide an actual value

	# perform some very rudimentary platform detection
	lsb_dist="$(echo "$lsb_dist" | tr '[:upper:]' '[:lower:]')"

	echo "$lsb_dist"
}

# Check if this is a forked Linux distro
check_forked() {

	# Check for lsb_release command existence, it usually exists in forked distros
	if command_exists lsb_release; then
		# Check if the `-u` option is supported
		set +e
		lsb_release -a -u > /dev/null 2>&1
		lsb_release_exit_code=$?
		set -e

		# Check if the command has exited successfully, it means we're in a forked distro
		if [ "$lsb_release_exit_code" = "0" ]; then
			# Print info about current distro
			cat <<-EOF
			You're using '$lsb_dist' version '$dist_version'.
			EOF

			# Get the upstream release info
			lsb_dist=$(lsb_release -a -u 2>&1 | tr '[:upper:]' '[:lower:]' | grep -E 'id' | cut -d ':' -f 2 | tr -d '[:space:]')
			dist_version=$(lsb_release -a -u 2>&1 | tr '[:upper:]' '[:lower:]' | grep -E 'codename' | cut -d ':' -f 2 | tr -d '[:space:]')

			# Print info about upstream distro
			cat <<-EOF
			Upstream release is '$lsb_dist' version '$dist_version'.
			EOF
		else
			if [ -r /etc/debian_version ] && [ "$lsb_dist" != "ubuntu" ] && [ "$lsb_dist" != "raspbian" ]; then
				if [ "$lsb_dist" = "osmc" ]; then
					# OSMC runs Raspbian
					lsb_dist=raspbian
				else
					# We're Debian and don't even know it!
					lsb_dist=debian
				fi
				dist_version="$(sed 's/\/.*//' /etc/debian_version | sed 's/\..*//')"
				case "$dist_version" in
					11)
						dist_version="bullseye"
					;;
					10)
						dist_version="buster"
					;;
					9)
						dist_version="stretch"
					;;
					8)
						dist_version="jessie"
					;;
				esac
			fi
		fi
	fi
}

dist_deprecation_notice() {

	distro=$1
	distro_version=$2

	echo
	printf "\033[91;1mDEPRECATION WARNING\033[0m\n"
	printf "    This Linux distribution (\033[1m%s %s\033[0m) reached end-of-life and is no longer supported by this script.\n" "$distro" "$distro_version"
	echo   "    No updates or security fixes will be released for this distribution, and users are recommended"
	echo   "    to upgrade to a currently maintained version of $distro."
	echo
	printf   "Press \033[1mCtrl+C\033[0m now to abort this script, or wait for the installation to continue."
	echo
	sleep 10
}

get_dist_version() {

	lsb_dist=$( get_distribution )
	case "$lsb_dist" in
		ubuntu)
			if command_exists lsb_release; then
				dist_version="$(lsb_release --codename | cut -f2)"
			fi
			if [ -z "$dist_version" ] && [ -r /etc/lsb-release ]; then
				dist_version="$(. /etc/lsb-release && echo "$DISTRIB_CODENAME")"
			fi
		;;

		debian|raspbian)
			dist_version="$(sed 's/\/.*//' /etc/debian_version | sed 's/\..*//')"
			case "$dist_version" in
				11)
					dist_version="bullseye"
				;;
				10)
					dist_version="buster"
				;;
				9)
					dist_version="stretch"
				;;
				8)
					dist_version="jessie"
				;;
			esac
		;;

		centos|rhel|sles)
			if [ -z "$dist_version" ] && [ -r /etc/os-release ]; then
				dist_version="$(. /etc/os-release && echo "$VERSION_ID")"
			fi
		;;

		*)
			if command_exists lsb_release; then
				dist_version="$(lsb_release --release | cut -f2)"
			fi
			if [ -z "$dist_version" ] && [ -r /etc/os-release ]; then
				dist_version="$(. /etc/os-release && echo "$VERSION_ID")"
			fi
		;;
	esac

	echo $dist_version
}

is_darwin() {
	case "$(uname -s)" in
	*darwin* ) true ;;
	*Darwin* ) true ;;
	* ) false;;
	esac
}

is_wsl() {

	case "$(uname -r)" in
		*microsoft* ) true ;; # WSL 2
		*Microsoft* ) true ;; # WSL 1
		* ) false;;
	esac
}

check_dist_deprecation() {
	lsb_dist=$( get_distribution )
	dist_version=$( get_dist_version ) 

	# Print deprecation warnings for distro versions that recently reached EOL,
	# but may still be commonly used (especially LTS versions).
	case "$lsb_dist.$dist_version" in
		debian.stretch|debian.jessie)
			dist_deprecation_notice "$lsb_dist" "$dist_version"
			;;
		raspbian.stretch|raspbian.jessie)
			dist_deprecation_notice "$lsb_dist" "$dist_version"
			;;
		ubuntu.xenial|ubuntu.trusty)
			dist_deprecation_notice "$lsb_dist" "$dist_version"
			;;
		fedora.*)
			if [ "$dist_version" -lt 33 ]; then
				dist_deprecation_notice "$lsb_dist" "$dist_version"
			fi
			;;
	esac
}


lsb_dist=$( get_distribution )
dist_version=$( get_dist_version )

if is_wsl; then
	echo
	echo "Operating system WSL DETECTED."
	echo
	exit 1
	cat >&2 <<-'EOF'

	EOF
	( set -x; sleep 20 )
fi

if [ -z "$lsb_dist" ]; then
	if is_darwin; then
		echo
		echo "Operating system 'macOS' DETECTED."
		echo
		exit 1
		cat >&2 <<-'EOF'

		EOF
		( set -x; sleep 20 )
	fi
fi

check_forked
check_dist_deprecation

echo "Operating system $lsb_dist, distribution $dist_version DETECTED."
