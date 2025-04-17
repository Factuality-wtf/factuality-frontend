#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

\. "$HOME/.nvm/nvm.sh"

nvm install 22

node -v
nvm current

corepack enable pnpm

pnpm -v

mkdir -p /home/deployer/frontend
chown -R deployer:deployer /home/deployer/frontend

pm2 startup systemd -u deployer --hp /home/deployer
