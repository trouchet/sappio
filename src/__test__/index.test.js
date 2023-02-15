import app from '../core/app.js';
import startServer from '../core/server.js';
import * as main from '../index.js';
import env from '../config/env_info.js';

let req, res, next;
let port = parseInt(env.APP_PORT, 10) || 3000;

jest.mock('../core/app.js');
jest.mock('../core/server.js');

describe('healthcheck', () => {
  it('must assert mocked calls', async () => {
        expect(startServer).toHaveBeenCalled();
        expect(startServer).toHaveBeenCalledWith(app, port);
    });
});
