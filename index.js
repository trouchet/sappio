// [START app]
import app from "./core/app.js";

import { log } from "./utils/logger.js";
import { env } from "./config/dotenv.js";

// Listen to the App Engine-specified port, otherwise 3000
const NUM_APPS = parseInt(env.NUM_PORTS) || 1;
let curr_port = parseInt(env.APP_INIT_PORT) || 3000;

for(let i = 0; i < NUM_APPS; i++) {	
	app.listen(
		curr_port+i , 
		(err) => {
			err ?
			log("error", `Failed to listen on PORT ${curr_port+i}`):
			log("info", `Application server listening on PORT ${curr_port+i}`)
		}
	);
}

