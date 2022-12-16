import app from './app';
import log from '../utils/logger';

let startServer = () => {}

export default startServer  = (port) => {
  app.listen(port, (err) => {
    err
      ? log('error', `😿 Failed to listen on PORT ${port}`)
      : log('info',  `😸 Application server listening on PORT ${port}`);
  });
};
