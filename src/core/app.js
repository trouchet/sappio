import express from "express";
import { buildApp } from "../utils/app.js";
import { router } from "./routes/root.js";
import { log } from "../utils/logger.js";

export let app = buildApp(express(), [router]);

export let startServer = (port) => {
  app.listen(port, (err) => {
    err
      ? log("error", `Failed to listen on PORT ${port}`)
      : log("info", `Application server listening on PORT ${port}`);

    process.send("ready");
  });
};

process.on("message", (msg) => {
  if (msg == "shutdown") {
    log("info", "Closing all connections...");

    setTimeout(function () {
      log("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});
