import { env } from "./dotenv.js";

export const jwt_secret = env.JWT_KEY || "1234";
