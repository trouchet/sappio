import favicon from "serve-favicon";
import bodyParser from "body-parser";
import express from "express";

const favicon_MW = favicon(
    process.cwd() + "/" + "src" + "/" + "public" + "/" + "favicon.ico"
  )

export const preparation_MWs = [
  favicon_MW, 
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  express.static(
    process.cwd() + "/src/public"
  )
];
