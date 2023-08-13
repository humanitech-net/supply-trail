#!/bin/bash
set -e

cd ./services/service-core/
docker build -t humanitech-supply-trail-service-core:development .

cd ../..
docker-compose -f infrastructure-dev.yml up -d