import express from "express";
import { buildApp } from "../utils/app.js";
import { router } from "./routes/root.js";
import { log } from "../utils/logger.js";

const FINISH_CONNECTION_TIMEOUT=1500

export let startServer = (port) => {
  const app = buildApp(express(), [router]);
  
  app.listen(port, (err) => {
    err ? log("error", `Failed to listen on PORT ${port}`)
        : log("info", `Application server listening on PORT ${port}`);
    
    process.send("ready");
  });
};

process.on("message", (msg) => {
  if (msg == "shutdown") {
    log("info", "Closing all connections...");

    setTimeout(
    	() => {
    	    log("Finished closing connections");
    	    process.exit(0);
    	}, FINISH_CONNECTION_TIMEOUT
    );
  }
});
