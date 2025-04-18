#!/bin/bash

export NVM_DIR="$HOME/.nvm"
if [[ ":$PATH:" != *":$NVM_DIR/versions/node/v22.14.0/bin:"* ]]; then
  export PATH="$NVM_DIR/versions/node/v22.14.0/bin:$PATH"
fi

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node 22 if not already
nvm install 22
nvm use 22

# Install pnpm and pm2 if missing
if ! command -v pnpm &> /dev/null || ! command -v pm2 &> /dev/null; then
  [ ! "$(command -v pnpm)" ] && npm install -g pnpm
  [ ! "$(command -v pm2)" ] && npm install -g pm2
fi

# Confirm installed
for tool in node pnpm pm2; do
  if command -v $tool &>/dev/null; then
    version=$($tool -v)
    log "$tool: $version"
  else
    error "$tool is not installed"
  fi
done

# Setup deploy directory
mkdir -p /home/deployer/factuality-frontend
chown -R deployer:deployer /home/deployer/factuality-frontend

# Ensure PM2 boots on restart
sudo env PATH="$PATH" pm2 startup systemd -u deployer --hp /home/deployer

# Install project deps
cd /home/deployer/factuality-frontend
NODE_ENV=production pnpm install --frozen-lockfile

# Start or restart frontend with PM2
pm2 restart frontend || pm2 start ecosystem.config.js
pm2 save
