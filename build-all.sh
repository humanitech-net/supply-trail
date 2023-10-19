#!/bin/bash

set -e  # Fail the script if any command fails

projects=(
    "libraries/lib-boilerplate"
    "services/service-core"
    "applications/webapp"
)

root_directory=$PWD  # Store the absolute path to your repository
npm install --ignore-scripts

for project in "${projects[@]}"; do
  echo "Building $project..."
  cd $root_directory/$project
  npm run build:release
  cd $root_directory
done
