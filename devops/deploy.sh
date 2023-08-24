#!/bin/bash
set -e

# Build service-core container

cd ./services/service-core/
docker build -t humanitech-supply-trail-service-core:development .

cd ../../applications/webapp
docker build -t humanitech-supply-trail-webapp:development .

# Reload infrastructure
cd ../..
docker-compose -f infrastructure-dev.yml --enf-file=.dev.env down
docker-compose -f infrastructure-dev.yml --enf-file=.dev.env up -d

# Delete package as it is not needed anymore
rm package.tar.gz