import log from '../../utils/logger'
import { jwt_token_string, jwt_token_duration_ms } from '../../config/jwt_info'
import { generateJWToken } from '../services/token-gen'

export const getToken = (req, res, next) => {
  log('debug', 'getToken controller called')

  const body = req?.body === undefined ? {} : req.body
  const secret = res.get('x-secret') || jwt_token_string
  const duration = parseInt(res.get('x-duration')) || jwt_token_duration_ms

  res.status = 200
  res.send({
    jwt_token: generateJWToken({ ...body }, secret, duration),
    payload: body
  })

  return next()
}
