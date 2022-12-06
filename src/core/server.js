import app from "./app.js";
import { log } from "../utils/logger.js";

const FINISH_CONNECTION_TIMEOUT = 1500;

export let startServer = (port) => {
  app.listen(port, (err) => {
    err
      ? log("error", `Failed to listen on PORT ${port}`)
      : log("info", `Application server listening on PORT ${port}`);
  });
};
