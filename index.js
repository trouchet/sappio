// [START app]
import process from 'node:process';

import app from "./core/app.js";
import { log } from "./utils/logger.js";
import { env } from "./config/dotenv.js";
import db from "./db/knex.js";

// Listen to the App Engine-specified port, otherwise 3000
const curr_port = parseInt(env.APP_INIT_PORT) || 3000;

app.listen(
	curr_port, 
	(err) => {
		err ?
		log("error", `Failed to listen on PORT ${curr_port}`):
		log("info", `Application server listening on PORT ${curr_port}`)
	
	  process.send('ready')
	}
);

process.on(
	'message', 
	function(msg) {
	  if (msg == 'shutdown') {
	    log('info', 'Closing all connections...')
	    
	    setTimeout(
	    	function() {
	      		log('Finished closing connections')
	      		process.exit(0)
	    	}, 
	    	1500
	    )
	  }
})

