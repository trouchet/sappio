import startServer from '../server';
import { assert, spy } from 'sinon';
import { raise } from '#utils/logger';
import { report } from '#utils/logger';

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

  it('should call error callback with raise', () => {
    const port = 3000;

    appSpy = {
      listen: (port, errCallback) => {
        const err = {
          type: 'fireError',
          message: 'Fire',
          stack: {
            room: 'Match on;',
            curtain: 'Tissue on fire.',
            fire_alarm: "alert('Fire!');",
          },
        };

        errCallback(err);
      },
    };

    startServer(appSpy, port);

    expect(raise).toHaveBeenCalled();
  });

  it('should call error callback with report', () => {
    const port = 3000;

    appSpy = {
      listen: (port, errCallback) => {
        errCallback();
      },
    };

    startServer(appSpy, port);

    expect(report).toHaveBeenCalled();
  });
});
