#!/bin/bash

# Install curl if not already present
yum install curl -y 

# Retrieve necessary repositories
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

# Install node
curl –sL https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install –y nodejs

# Install nvm
nvm install lts/*

# Echo library versions
echo NPM version: $(npm -v)
echo NVM version: $(nvm --version)
echo NodeJS version: $(node -v)

# Add node binaries to OS path
export PATH=$PATH:$(npm bin -g)

