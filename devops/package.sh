#!/bin/bash
set -e

mkdir -p ./devops/package/services/service-core

cp -R services/service-core/dist ./devops/package/services/service-core
cp services/service-core/package.json ./devops/package/services/service-core/package.json
cp services/service-core/package-lock.json ./devops/package/services/service-core/package-lock.json
cp services/service-core/Dockerfile ./devops/package/services/service-core/Dockerfile

cp ./devops/deploy.sh ./devops/package/deploy.sh
cp ./devops/infrastructure-dev.yml ./infrastructure-dev.yml

tar -czvf ./devops/package.tar.gz -C ./devops/package .