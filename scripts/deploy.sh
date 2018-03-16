#!/bin/bash

# @Author: Spicer Matthews <spicer>
# @Date:   03/15/2018
# @Email:  spicer@cloudmanic.com
# @Last modified by:   spicer
# @Last modified time: 03/15/2018
# @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.

# Get configs
source .env

# Build frontend
cd ..
echo "Building Frontend"
ng build -prod
cd ./scripts

# Rsync the files to SSH_SERVER
rsync -avzhe ssh ../dist/  $SSH_USER@$SSH_SERVER:$SSH_DIR

# Login as myself and build and restart. This is restarting net-worth-server
ssh $SSH_SERVER "cd $DOCKER_DIR && docker-compose build && docker-compose down && docker-compose up -d"
