#!/bin/bash
set -e

# Check if DEPLOYMENT_HOST is unset or empty
if [ -z "${DEPLOYMENT_HOST}" ]; then
    echo "Error: DEPLOYMENT_HOST is not set or empty." >&2
    exit 1
fi

# Check if NETWORK_NAME is unset or empty
if [ -z "${NETWORK_NAME}" ]; then
    echo "Error: NETWORK_NAME is not set or empty." >&2
    exit 1
fi

# ADD services/service-core
mkdir -p ./devops/package/services/service-core
cp -R services/service-core/dist ./devops/package/services/service-core
cp services/service-core/package.json ./devops/package/services/service-core/package.json
cp services/service-core/Dockerfile ./devops/package/services/service-core/Dockerfile

# ADD applications/webapp
mkdir -p ./devops/package/applications/webapp
cp -R applications/webapp/build ./devops/package/applications/webapp
cp applications/webapp/nginx.conf ./devops/package/applications/webapp/nginx.conf
cp applications/webapp/Dockerfile ./devops/package/applications/webapp/Dockerfile

# ADD deployment script
cp ./devops/deploy.sh ./devops/package/deploy.sh

# ADD docker-compose file with injected variables
cp ./devops/infrastructure-dev.yml ./devops/package/infrastructure-dev.yml
sed -i "s/__DEPLOYMENT_HOST__/$DEPLOYMENT_HOST/g" ./devops/package/infrastructure-dev.yml
sed -i "s/__NETWORK_NAME__/$NETWORK_NAME/g" ./devops/package/infrastructure-dev.yml

# TAR all files together
tar -czvf ./devops/package.tar.gz -C ./devops/package .