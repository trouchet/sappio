import express from "express";

import { env } from "../config/dotenv.js";

const apps = [];
const NUM_APPS = process.env.NUM_APPS || 1;

for (let i = 0; i < NUM_APPS; i++) {
  apps.push(express());
}

export default apps;


