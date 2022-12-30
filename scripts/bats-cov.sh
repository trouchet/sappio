#!/bin/bash
# Get keys from json dictionary
#
# examples:
# 	>> bash ./bats-cov.sh . ./coverage/ ./tests
#    # coverage c/ontent from folder . on folder ./coverage

rm -rf $2

kcov --clean \
     --bash-dont-parse-binary-dir \
     --include-pattern=.sh \
     --exclude-pattern=tests \
     --include-path=$1 $2 bats $3
