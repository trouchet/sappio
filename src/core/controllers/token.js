import { log } from "../../utils/logger.js";
import { jwt_secret } from "../../config/jwt_secret.js";
import { generateJWToken } from "../services/token-gen.js";

const JWT_TOKEN_DURATION = 3600;

export const getToken = (req, res, next) => {
  log("debug", "getToken controller called");

  const body = req?.body === undefined ? {} : req.body;

  const secret = res.get("x-secret") || jwt_secret;

  const duration = parseInt(res.get("x-duration")) || JWT_TOKEN_DURATION;

  res.status = 200;
  res.send({
    jwt_token: generateJWToken({ ...body }, secret, duration),
    payload: body,
  });

  return next();
};
