import rs from 'jsrsasign';

import log from '../../utils/logger';
import env from '../../config/env_info';

export const generateJWToken = (payload, secret, duration) => {
  log('debug', 'service generateJWToken called');

  const jwtPayload = {};

  const jwtHeader = {
    alg: env.JWT_ALGO,
    typ: 'JWT',
  };

  const tNow = rs.KJUR.jws.IntDate.get('now');
  const tEnd = tNow + Number(duration);
  
  jwtPayload.iat = tNow;
  jwtPayload.exp = tEnd;

  jwtPayload.jwtToken = rs.KJUR.jws.JWS.sign(env.JWT_ALGO, jwtHeader, payload, { utf8: secret })
  
  return jwtPayload;
};
