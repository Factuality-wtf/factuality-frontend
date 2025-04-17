#!/bin/bash

# Install NVM and Node 22
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

# Confirm Node setup
node -v
nvm current

# Enable and activate pnpm via corepack
corepack enable
corepack prepare pnpm@latest --activate

# Confirm pnpm works
pnpm -v

# Create frontend dir and set permissions
mkdir -p /home/deployer/frontend
chown -R deployer:deployer /home/deployer/frontend

# PM2 system startup
pm2 startup systemd -u deployer --hp /home/deployer
