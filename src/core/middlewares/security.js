import helmet from 'helmet';
import cors from 'cors';

export let security_middlewares = [];

security_middlewares = [
  helmet(), 
  cors()
]

export default security_middlewares;

/*
TODO: Define 
import { expressjwt } from "express-jwt";

expressjwt({
  secret: "shhhhhhared-secret",
  algorithms: ["HS256"],
})
*/
