#!/bin/bash
# Get keys from json dictionary
# 
# examples:
# 	>> bats-coverage . ./coverage/ ./tests
#   a
#   b

rm -rf $2

kcov --clean \
     --bash-dont-parse-binary-dir \
     --include-pattern=.sh \
     --exclude-pattern=tests \
     --include-path=$1 $2 bats $3
