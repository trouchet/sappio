import startServer from '../server';
import { assert, spy } from 'sinon';

let appSpy;

jest.mock('#utils/logger');

describe('Server', () => {
  beforeEach(() => {
    appSpy = {
      listen: spy(),
    };
  });

  it('should setup server', () => {
    const port = 3000;

    startServer(appSpy, port);

    assert.calledOnce(appSpy.listen);
  });
});
