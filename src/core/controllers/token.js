import { log } from "../../utils/logger.js";
import { jwt_secret } from "../../config/jwt_secret.js";
import { generateJWToken } from "../services/tokengen.js";

export const getToken = (req, res, next) => {
  log("debug", "getToken controller called");

  const secret = res.get("x-secret") || jwt_secret;
  const duration = parseInt(res.get("x-duration")) || 3600;
  const jwtToken = createJWTToken(req.body, secret, duration);

  res.status = 200;
  res.send({
    jwtToken,
    payload: body,
  });

  return next();
};
