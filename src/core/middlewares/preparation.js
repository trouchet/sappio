import favicon from 'serve-favicon';
import express from 'express';

const favicon_MW = favicon(
  process.cwd() + '/src/public/favicon.ico'
);

let preparation_middlewares = [];

preparation_middlewares = [
  favicon_MW,
  express.urlencoded({ extended: false }),
  express.json(),
  express.static(process.cwd() + '/src/public'),
]

export default preparation_middlewares;
