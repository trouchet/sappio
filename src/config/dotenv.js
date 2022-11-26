import * as dotenv from "dotenv";

export const env = dotenv.config("./config/.env").parsed;
