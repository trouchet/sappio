import favicon from "serve-favicon";
import express from "express";

const favicon_middleware = favicon(process.cwd() + "/src/public/favicon.ico");

const preparation_middlewares = [
  favicon_middleware,
  express.urlencoded({ extended: false }),
  express.json(),
  express.static(process.cwd() + "/src/public"),
];

export default preparation_middlewares;
