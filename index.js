// [START app]
import apps from "./core/servers.js";
import { log } from "./utils/logger.js";

// Listen to the App Engine-specified port, otherwise 3000
let curr_port = process.env.APP_INIT_PORT || 3000;

let app = {};

for(const app_index in apps) {
  	app = apps[app_index];
	
	app.listen(curr_port, (err) => {
		err ?
		log("info", `Failed to listen on PORT ${curr_port}`):
		log("info", `Application server listening on PORT ${curr_port}`)
	});

	curr_port+=1;
}

