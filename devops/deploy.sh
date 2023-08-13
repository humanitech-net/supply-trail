#!/bin/bash
set -e

# Build service-core container

cd ./services/service-core/
docker build -t humanitech-supply-trail-service-core:development .

# Reload infrastructure
cd ../..
docker-compose -f infrastructure-dev.yml down
docker-compose -f infrastructure-dev.yml up -d

# Delete package as it is not needed anymore
rm package.tar.gz