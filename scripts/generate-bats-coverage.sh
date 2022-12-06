#!/bin/bash

rm -r $2

kcov --report-only \
     --clean \
     --bash-dont-parse-binary-dir \
     --include-pattern=.sh \
     --exclude-pattern=tests \
     --include-path=$1 $2 bats $3

