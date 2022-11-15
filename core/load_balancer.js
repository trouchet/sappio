import express from "express";
import path from "path";
import axios from 'axios';

import { buildApp, prepareApp, pospareApp } from '../utils/app.js';
import { reportMerror } from '../utils/error-handler.js';
import { log } from '../utils/logger.js';
import { env } from '../config/dotenv.js';
import { router } from './routes/root.js';

const balancer_app = pospareApp(prepareApp(express()));

// Application servers
const app_hosts = [];
let port = 0; 
for (let i = 0; i < env.NUM_PORTS; i++) {
    let port = parseInt(env.APP_INIT_PORT)+i;
    app_hosts.push(`http://localhost:${port}`)
}

// Track the current application server to send request
let current = 0;

// Receive new request: Forward to application server
const balancer_handler = async (req, res) =>{
    
    // Destructure following properties from request object
    const { method, url, headers, body } = req;
  
    // Select the current server to forward the request
    const app_host = app_hosts[current];
  
    // Update track to select next server
    current === (app_hosts.length-1) ? current = 0 : current++
    
    try{
        // Requesting to underlying application server
        const response = await axios({
            url: `${app_host}${url}`,
            method: method,
            headers: headers,
            data: body
        });

        // Send back the response data
        // from application server to client 
        res.send(response.data)

    } catch(err){
        // Send back the error message
        log('error', err)
        res.status(500).send("Server error!")    
    }
}
  
// When receive new request
// Pass it to handler method
balancer_app.use( (req,res) => balancer_handler(req, res) );

// Listen on PORT 8080
balancer_app.listen(
    8080, 
    err => {
        err ?
        log('error', 'Failed to listen on PORT 8080'):
        log('info', 'Load Balancer Server '
              + 'listening on PORT 8080');
    }
);

