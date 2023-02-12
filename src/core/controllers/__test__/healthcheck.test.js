import sinon from "sinon"
import { healthCheck } from '../healthcheck';
import log from '#utils/logger';

let req, res, next;

jest.mock('#utils/logger.js');

describe(
    'healthcheck', 
    () => {
      beforeEach(
        () => {
          next = sinon.spy();
          req = { };
          res = { send: sinon.spy()}
        }
      );

      it(
        'must assert healthcheck', 
        async () => {
            await healthCheck(req, res, next);

            expect(log).toHaveBeenCalled(1);
        }
      );
  }
);
