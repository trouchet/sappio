#!/bin/bash

npm run hooks:prepare && npm install --legacy-peer-deps && npm run build && npm audit fix --force
