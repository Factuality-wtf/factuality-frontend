module.exports = {
  apps: [{
    name: 'frontend',
    script: 'pnpm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_API_URL: "https://factuality.wtf"
    }
  }]
};
