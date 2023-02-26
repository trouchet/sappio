import { jwt_token_string, jwt_token_duration_ms } from '#config/jwt_info.js';
import { generateJWToken } from '../services/tokengen.js';
import { debug } from '#utils/logger.js';

export const getToken = (req, res, next) => {
  debug('Controller getToken called');

  const body = Object.keys(req).includes('body') ? req.body : {};
  const secret = Object.keys(res).includes('x-secret') ? res.get('x-secret') : jwt_token_string;
  const duration_str = Object.keys(res).includes('x-duration') ? res.get('x-duration') : undefined;

  const duration = parseInt(duration_str, 10) || Number(jwt_token_duration_ms);

  res.status = 200;
  const token_info = generateJWToken({ ...body }, secret, duration);

  res.send(token_info);

  return next();
};
