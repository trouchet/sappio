#!/bin/bash

echo "$(lsof -i ":5432" | awk '{ print $2 }' | awk 'NR>1' | uniq -u)"  
