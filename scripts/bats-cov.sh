#!/bin/bash
# Get keys from json dictionary
#
# examples:
# 	>> bats-coverage . ./coverage/ ./tests
#    # coverage content from folder . on folder ./coverage

rm -rf $2

kcov --clean \
     --bash-dont-parse-binary-dir \
     --include-pattern=.sh \
     --exclude-pattern=tests \
     --include-path=$1 $2 bats $3
