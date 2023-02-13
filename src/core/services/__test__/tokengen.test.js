import { generateJWToken } from '../tokengen';
import { jwt_token_string, jwt_token_duration_ms } from '#config/jwt_info';
import log from '#utils/logger';

let result, expectation;

jest.mock('#utils/logger.js');

describe('token', () => {
  it('must assert generateJWToken', () => {
    const duration = jwt_token_duration_ms;
    const secret = jwt_token_string;
    const payload = { name: 'Eduardo' };

    const jwtPayload = generateJWToken(payload, secret, duration);

    result = Object.keys(jwtPayload);
    expectation = ['iat', 'exp', 'jwtToken'];

    expect(result).toStrictEqual(expectation);
    expect(jwtPayload.exp - jwtPayload.iat).toEqual(Number(duration));
    expect(log).toHaveBeenCalled();
  });
});
