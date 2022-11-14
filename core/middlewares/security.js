import helmet from "helmet";
import cors from "cors";

export const security_MWs = [helmet(), cors()];

/*
TODO: Define 
import { expressjwt } from "express-jwt";

expressjwt({
  secret: "shhhhhhared-secret",
  algorithms: ["HS256"],
})
*/
