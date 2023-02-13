import { Express } from 'jest-express/lib/express';
import startServer from '../server';

let app;

describe('Server', () => {
  beforeEach(() => {
    app = new Express();
  });

  afterEach(() => {
    app.resetMocked();
  });

  test('should setup server', () => {
    const port = 3000;

    startServer(app, port);

    expect(app.listen).toBeCalled();
  });
});

