#!/bin/bash

BASEDIR=$(dirname $0)
source "${BASEDIR}/linux-utils.sh"

os_install_repo="$(echo "$( os_info )" | awk '{ print $3 }' FS=":")"

# Install curl if not already present
$os_install_repo install curl -y 

# Retrieve necessary repositories
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install node
curl https://rpm.nodesource.com/setup_16.x | sudo bash -
$os_install_repo install nodejs –y

# Install nvm
nvm install lts/*

# Echo library versions
echo NPM version: $(npm -v)
echo NVM version: $(nvm --version)
echo NodeJS version: $(node -v)

# Add node binaries to OS path
export PATH=$PATH:$(npm bin -g)

npm install -g pm2
