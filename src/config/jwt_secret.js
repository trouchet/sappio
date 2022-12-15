import env from "./dotenv";

let jwt_secret = "";

export default jwt_secret = env.JWT_KEY || "1234";
