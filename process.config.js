module.exports = {
  apps: [{
    name: 'app',
    cwd: './app/',
    script: 'npm',
    args: ['run', 'dev'],
    exec_mode: 'cluster',
    watch: false
  }, {
    name: 'server',
    cwd: './server/',
    script: "./app.js",
    exec_mode: 'cluster',
    watch: false
  }]
}