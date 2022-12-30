import env from "./env_info";

export default {
  apps: [
    {
      name: "sappio",
      script: "../src/index.js",
      instances: env.NUM_PORTS || 42,
      watch: true,
      exec_mode: "cluster",
      instance_var: "INSTANCE_ID",
      shutdown_with_message: true,
      wait_ready: true,
      increment_var: "PORT",
      merge_logs: true,
      cron_restart: "0 0 * * *",
      exp_backoff_restart_delay: 100,
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 80,
        NODE_ENV: "production",
      },
    },
  ],
};
