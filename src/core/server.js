import app from './app';
import log from '../utils/logger';

const startServer = (port) => {
  const fail_msg = `😿 Failed to listen on PORT ${port}`;
  const succ_msg = `😸 Application server listening on PORT ${port}`;

  const error_callback = (err) => (err ? log('error', fail_msg) : log('info', succ_msg));

  app.listen(port, error_callback);
};

export default startServer;
