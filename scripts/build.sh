#!/bin/bash

BASEDIR=$(dirname "$0")

bash "${BASEDIR}/node-build.sh" && bash "${BASEDIR}/docker-build.sh"
