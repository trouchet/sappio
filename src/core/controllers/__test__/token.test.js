import sinon from 'sinon';
import { getToken } from '../token';
import log from '#utils/logger';
import { jwt_token_string, jwt_token_duration_ms } from '#config/jwt_info';
import { generateJWToken } from '../../services/tokengen';

let req, res, next;
let data, secret, duration;
let result, expectation;

jest.mock('#utils/logger.js');

describe('token', () => {
  beforeEach(() => {
    data = { name: 'Ford Prefect' };
    secret = jwt_token_string;
    duration = Number(jwt_token_duration_ms);
    
    next = sinon.spy();
    req = { body: data };
    res = { send: sinon.spy() };
  });
  it('must assert token', async () => {
    await getToken(req, res, next);
    expect(log).toHaveBeenCalled();
    sinon.assert.calledOnce(next);
  });
  it('must assert token', async () => {
    await getToken(req, res, next); 
    
    expectation = generateJWToken(data, secret, duration);
    sinon.assert.calledWith(res.send, expectation);
  });
});
