module.exports = {
  apps: [
    {
      name: "admin-tool",
      script: "app.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ]
};
