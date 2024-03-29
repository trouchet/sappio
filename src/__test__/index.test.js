import app from '#core/app.js';
import env from '#config/env_info.js';
import startServer from '../core/server.js';
import * as main from '../index.js';

jest.mock('#core/app.js');
jest.mock('#config/env_info.js');
jest.mock('#core/server.js');

describe('healthcheck', () => {
  it('must assert mocked calls', async () => {
    expect(startServer).toHaveBeenCalled();
    expect(startServer).toHaveBeenCalledWith(app, parseInt(env.APP_PORT));
  });
});
