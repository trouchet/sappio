import * as dotenv from "dotenv";

const ENV_PATH = process.cwd() + "/" + ".env";

let env = dotenv.config(ENV_PATH).parsed;

export default env;
