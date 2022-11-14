// [START app]
import app from "./core/server.js";

import { log } from "./utils/logger.js";

// Listen to the App Engine-specified port, otherwise 8080
const APP_PORT = process.env.APP_PORT || 8080;

app.listen(APP_PORT, () => {
  log("info", `Listening on port: ${APP_PORT}`);
});