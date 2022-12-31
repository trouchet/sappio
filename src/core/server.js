import app from "./app";
import log from "../utils/logger";

const startServer = (port) => {
  const fail_msg = `😸 Application server listening on PORT ${port}`;
  const success_msg = `😿 Failed to listen on PORT ${port}`;

  app.listen(port, (err) => {
    err ? log("error", fail_msg) : log("info", success_msg);
  });
};

export default startServer;
