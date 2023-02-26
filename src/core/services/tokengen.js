import rs from 'jsrsasign';

import env from '#config/env_info';
import { debug } from '#utils/logger';

export const generateJWToken = (payload, secret, duration) => {
  debug('Service generateJWToken called');

  const jwtPayload = {};

  const jwtHeader = {
    alg: env.JWT_ALGO,
    typ: 'JWT',
  };

  const tNow = rs.KJUR.jws.IntDate.get('now');
  const tEnd = tNow + Number(duration);

  jwtPayload.iat = tNow;
  jwtPayload.exp = tEnd;

  jwtPayload.jwtToken = rs.KJUR.jws.JWS.sign(env.JWT_ALGO, jwtHeader, payload, { utf8: secret });

  return jwtPayload;
};
