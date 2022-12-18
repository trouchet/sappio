#!/bin/bash

# Get value from json dictionary
# 
# examples:
# 	>> jsonValue "{"a": 1, "b": 2}" "a"
#   1
function jsonValue() {
    echo "$1" | jq -r ".$2"
}


# Get keys from json dictionary
# 
# examples:
# 	>> jsonKeys "{"a": 1, "b": 2}"
#   a
#   b
function jsonKeys() {
    echo "$1" | \
    jq -r 'to_entries[] | [.key]'
}

# 1. Navigate to package.json folder;
# 2. Call	list
ROOT_PROJECT_PATH="$1"

packages_route="$ROOT_PROJECT_PATH/package.json"

deps_keys=( "dependencies" "devDependencies" )
grepignore_tokens=( 
        "node_modules" 
        ".git" 
        "package-lock"
        "codecov"
        "scripts"
    )

dependency_ocurrences=""
dependency_count=0

touch ".npm_clean"

packages_json="$(cat $packages_route)"
package_keys="$(jsonKeys "$packages_json")"

for deps_key in "${deps_keys[@]}"; do
    deps_json="$(jsonValue "$packages_json" "$deps_key")"

    for dependency_name in "$(jsonKeys "$deps_json")"; do
        echo "${dependency_name[*]}"
    done;
done;