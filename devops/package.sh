#!/bin/bash
set -e

# Check if DEPLOYMENT_HOST is unset or empty
if [ -z "${DEPLOYMENT_HOST}" ]; then
    echo "Error: DEPLOYMENT_HOST is not set or empty." >&2
    exit 1
fi

# Check if HTTPS_CERT_EMAIL is unset or empty
if [ -z "${HTTPS_CERT_EMAIL}" ]; then
    echo "Error: HTTPS_CERT_EMAIL is not set or empty." >&2
    exit 1
fi

# ADD services/service-core
mkdir -p ./devops/package/services/service-core
cp -R services/service-core/dist ./devops/package/services/service-core
cp services/service-core/package.json ./devops/package/services/service-core/package.json
cp services/service-core/package-lock.json ./devops/package/services/service-core/package-lock.json
cp services/service-core/Dockerfile ./devops/package/services/service-core/Dockerfile

# ADD deployment script
cp ./devops/deploy.sh ./devops/package/deploy.sh

# ADD docker-compose file with injected variables
cp ./devops/infrastructure-dev.yml ./devops/package/infrastructure-dev.yml
sed -i "s/__DEPLOYMENT_HOST__/$DEPLOYMENT_HOST/g" ./devops/package/infrastructure-dev.yml
sed -i "s/__SSL_CERT_EMAIL__/$HTTPS_CERT_EMAIL/g" ./devops/package/infrastructure-dev.yml

# TAR all files together
tar -czvf ./devops/package.tar.gz -C ./devops/package .