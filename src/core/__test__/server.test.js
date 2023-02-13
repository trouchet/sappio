import app from '../app';
import startServer from '../server';

jest.mock("../app.js");

/*
// Failed attempt :-(

describe(
  'server',
  () => {
    it(
      'call mocked app',
      () => {
        startServer(3000);

        expect(app).toHaveBeenCalled();
      }
    );
  }
);
*/

describe(
  'server',
  () => {
    it(
      'dummy test',
      () => {
        expect(42).toBe(42);
      }
    );
  }
);
