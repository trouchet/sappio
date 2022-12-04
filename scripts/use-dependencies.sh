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

keys=( 'dependencies' 'devDependencies' )

grepignore_tokens=( 
        'node_modules' 
        '.git' 
        'package-lock'
        'codecov'
    )

dependency_grep=''
dependency_count=0

for key in "${keys[@]}"; do
    jsonKeys "$(jsonValue "$(cat $1)" "$key")" | \
    while read dependency; do
        grep_command="grep -rnw . -e "$dependency" | \
                      grep -v -f <(printf '%s\n' "${grepignore_tokens[@]}")"
        dependency_grep="$(eval "$grep_command")"
        dependency_count="$(eval "$grep_command" | wc -l)"
        
        echo "------------------------------------------------"
        echo "Dependency \"$dependency\": count $dependency_count"
        echo "$dependency_grep"
        echo "------------------------------------------------"
    done
done
