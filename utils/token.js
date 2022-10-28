import rs from 'jsrsasign';

import { log } from '../utils/logger.js';

export const generateJWTToken = (secret, duration) => {
  log('debug', 'createJWTToken service called');

  const jwtHeader = { alg: 'HS256', typ: 'JWT' };

  const tNow = rs.KJUR.jws.IntDate.get('now');
  const tEnd = tNow + duration;
  
  const payload = {
    iat: tNow,
    exp: tEnd
  }

  return rs.KJUR.jws.JWS.sign('HS256', jwtHeader, payload, { utf8: secret });
}
