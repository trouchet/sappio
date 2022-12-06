#!/bin/bash

kcov --clean \
     --bash-dont-parse-binary-dir \
     --include-pattern=.sh \
     --exclude-pattern=tests \
     --include-path=$1 $2 bats $3

