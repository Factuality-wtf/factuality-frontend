module.exports = {
  apps: [
    {
      name: "factuality-frontend",
      cwd: "/home/deployer/actions-runner/_work/factuality-frontend/factuality-frontend",
      script: "pnpm",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
