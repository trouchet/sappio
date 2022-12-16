import helmet from 'helmet';
import cors from 'cors';

/*
TODO: Ass JWT validation middleware
import { expressjwt } from "express-jwt";

expressjwt({
  secret: "shhhhhhared-secret",
  algorithms: ["HS256"],
})
*/

const security_middlewares = [
  helmet(), 
  cors(),
];

export default security_middlewares;

