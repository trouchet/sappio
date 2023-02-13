import sinon from "sinon"
import { getToken } from '../token';
import log from '#utils/logger';

let req, res, next;

jest.mock('#utils/logger.js');

describe(
  'token',
  () => {
    beforeEach(
      () => {
        next = sinon.spy();
        req = { body: {"name": "Ford Prefect"} };
        res = { send: sinon.spy() }
      }
    );
    it(
      'must assert token',
      async () => {
         await getToken(req, res, next);
         expect(log).toHaveBeenCalled();
    }
  );
  }
);
