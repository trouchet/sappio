// [START app]
import { app } from './utils/router.js';

app.get('/', (req, res) => {
  res.send('Hi! :)');
});

// [END app]