#!/bin/bash

# Check if SSH_USER is unset or empty
if [ -z "${PRIVATE_KEY}" ]; then
    echo "Error: PRIVATE_KEY is not set or empty." >&2
    exit 1
fi

# Check if SSH_USER is unset or empty
if [ -z "${SSH_USER}" ]; then
    echo "Error: SSH_USER is not set or empty." >&2
    exit 1
fi

# Check if SSH_HOST is unset or empty
if [ -z "${SSH_HOST}" ]; then
    echo "Error: SSH_HOST is not set or empty." >&2
    exit 1
fi

echo "$PRIVATE_KEY" > deploy_key.pem
chmod 600 deploy_key.pem

ssh -o StrictHostKeyChecking=no -i deploy_key.pem $SSH_USER@$SSH_HOST "
    cd /home/$SSH_USER/projects/supply-trail &&
    find . -mindepth 1 ! -path './local' ! -path './local/*' -delete
"

# Transfer archive
scp -o StrictHostKeyChecking=no -i deploy_key.pem package.tar.gz $SSH_USER@$SSH_HOST:/home/$SSH_USER/projects/supply-trail

# Unpack and run installation script remotely
ssh -o StrictHostKeyChecking=no -i deploy_key.pem $SSH_USER@$SSH_HOST "
    cd /home/$SSH_USER/projects/supply-trail &&
    tar -xzvf package.tar.gz &&
    chmod +x deploy.sh &&
    ./deploy.sh
"
rm -f deploy_key.pem
