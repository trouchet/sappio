import log from '#utils/logger.js';

const startServer = (app, port) => {
  const fail_msg = `😿 Failed to listen on PORT ${port}`;
  const succ_msg = `😸 Application server listening on PORT ${port}`;

  const errorCallback = (err) => (err ? raise(fail_msg) : report(succ_msg));

  app.listen(port, errorCallback);
};

export default startServer;

