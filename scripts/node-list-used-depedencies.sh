#!/bin/bash

function jsonValue() {
    echo "$1" | \
    jq -r ".$2"
}

function jsonKeys() {
    echo "$1" | \
    jq 'keys' | \
    perl -lne 'print $2 while m{(["'\''])((?:\\.|(?!\1).)*+)\1}g'
}

ROOT_PROJECT_PATH="$1"

dependency_json="$ROOT_PROJECT_PATH/package.json"
keys=( 'dependencies' 'devDependencies' )

grepignore_tokens=( 
        'node_modules' 
        '.git' 
        'package-lock'
        'codecov'
        'scripts'
    )

dependency_ocurrences=''
dependency_count=0

touch unused_dependencies.txt

for key in "${keys[@]}"; do
    jsonKeys "$(jsonValue "$(cat $dependency_json)" "$key")" | \
    while read dependency; do
        grep_command="grep -rnw "$ROOT_PROJECT_PATH" -e "$dependency" | \
                      grep -v -f <(printf '%s\n' "${grepignore_tokens[@]}")"
        
        dependency_ocurrences="$(eval "$grep_command")"
        
        dependency_ocurrences_filenames="$(eval "$grep_command" | \
                                           awk '{ print $1 }' FS=":" | \
                                           uniq -c)"
        
        dependency_count="$(eval "$grep_command" | wc -l)"
        
        if [[ $dependency_count -eq 1 ]]; then
            echo "$dependency" >> unused_dependencies.txt
            dependency="\033[91;1m$dependency\033[0m"
        else
            dependency="\033[0;32m$dependency\033[0m"
        fi

        echo "================================================================================="
        printf "Dependency \"$dependency\": \n"
        echo "---------------------------------------------------------------------------------"
        echo "Filenames: "
        echo "$dependency_ocurrences_filenames"
        echo "---------------------------------------------------------------------------------"
        echo "Ocurrences: count $dependency_count"
        echo "$dependency_ocurrences"
    done
done
