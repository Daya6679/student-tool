module.exports = {
  apps: [
    {
      name: "student-tool",
      script: "app.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
