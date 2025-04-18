#!/bin/bash

# Install NVM and Node 22
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm install 22
nvm use 22

# Install pnpm and pm2 globally
npm install -g pnpm
npm install -g pm2

# Confirm versions
node -v
pnpm -v
pm2 -v

# Set up deploy dir
mkdir -p /home/deployer/factuality-frontend
chown -R deployer:deployer /home/deployer/factuality-frontend

# Set PM2 to run on boot
pm2 startup systemd -u deployer --hp /home/deployer
