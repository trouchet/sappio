#!/bin/bash

function jsonValueKeys() {
    echo "$1" | \
    jq -r ".$2" | \
    jq 'keys' | \
    perl -lne 'print $2 while m{(["'\''])((?:\\.|(?!\1).)*+)\1}g'
}

json_content="$(cat $1)"

jsonValueKeys "$json_content" "dependencies" | while read dependency; do
    echo "$dependency :-)"
done

jsonValueKeys "$json_content" "devDependencies" | while read devDependency; do
    echo "$devDependency :-)"
done


