#!/bin/bash

mkdir -p package/services/service-core

cp -R services/service-core/dist package/services/service-core
cp services/service-core/package.json package/services/service-core/package.json
cp services/service-core/package-lock.json package/services/service-core/package-lock.json

tar -czvf ./devops/package.tar.gz -C package .

