#!/bin/bash
set -e

mkdir -p ./devops/package/services/service-core

cp -R services/service-core/dist ./devops/package/services/service-core
cp services/service-core/package.json ./devops/package/services/service-core/package.json
cp services/service-core/package-lock.json ./devops/package/services/service-core/package-lock.json
cp services/service-core/Dockerfile ./devops/package/services/service-core/Dockerfile

cp ./devops/deploy.sh ./devops/package/deploy.sh

cp ./devops/infrastructure-dev.yml ./devops/package/infrastructure-dev.yml
sed -i 's/__DEPLOYMENT_HOST__/"$DEPLOYMENT_HOST"/g' ./devops/package/infrastructure-dev.yml
sed -i 's/__SSL_CERT_EMAIL__/"$HTTPS_CERT_EMAIL"/g' ./devops/package/infrastructure-dev.yml

tar -czvf ./devops/package.tar.gz -C ./devops/package .