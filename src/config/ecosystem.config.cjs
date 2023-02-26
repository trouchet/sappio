const env = import('./env_info.js');

const index_path = process.cwd() + '/../index.js';

// Deployment configuration: https://pm2.keymetrics.io/docs/usage/application-declaration/
const appConfig = {
  script: '/home/brunolnetto/github/trouchet/sappio/src/index.js',
  watch: true,
  instances: env.NUM_PORTS || 5,
  exec_mode: 'cluster',
  instance_var: 'INSTANCE_ID',
  shutdown_with_message: true,
  wait_ready: true,
  increment_var: 'PORT',
  merge_logs: true,
  cron_restart: '0 0 * * *',
  exp_backoff_restart_delay: 100,
  post_update: ['npm install', 'echo "launching the app"'],
  max_restarts: 10,
  env: {
    PORT: env.APP_PORT,
    NODE_ENV: 'development',
  },
};

module.exports = {
  apps: [appConfig],
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/main',
      repo: 'https://github.com/trouchet/sappio',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ./src/config/ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
