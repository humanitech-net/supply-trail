#!/bin/bash

cd ./services/service-core/
docker build -t humanitech-supply-trail-service-core:development .

cd ../../devops
docker-compose -f infrastructure-dev.yml up -d