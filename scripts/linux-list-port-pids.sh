#!/bin/bash
echo "$(sudo lsof -i ":$1" | awk '{ print $2 }' | awk 'NR>1')"  | uniq -u
