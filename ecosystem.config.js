module.exports = {
  apps: [{
    name: 'frontend',
    script: 'pnpm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000 // or whatever port you're serving on
    }
  }]
};
