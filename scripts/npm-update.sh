#!/bin/bash

# Update packages and packages.json
npm i -g npm-check-updates
ncu -u && npm update --legacy-peer-deps

# Submit to git
git add package.json package-lock.json
git commit -m 'config/ package*.json'
git push
