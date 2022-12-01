import favicon from "serve-favicon";
import express from "express";

const favicon_MW = favicon(
    process.cwd() + "/" + "src" + "/" + "public" + "/" + "favicon.ico"
  )

export const preparation_MWs = [
  favicon_MW, 
  express.urlencoded({ extended: false }),
  express.json(),
  express.static(
    process.cwd() + "/src/public"
  )
];
