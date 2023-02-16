import { Express } from 'jest-express/lib/express';
import log from '#utils/logger';
import startServer from '../server';

let app;

jest.mock('#utils/logger');

describe('Server', () => {
  beforeEach(() => {
    app = new Express();
  });

  afterEach(() => {
    app.resetMocked();
  });

  it('should setup server', () => {
    const port = 3000;

    startServer(app, port);

    expect(app.listen).toBeCalled();
  });
});
