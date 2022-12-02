import express from "express";
import { buildApp } from "./utils/app.js";
import { router } from "./routes/root.js";

const app = buildApp(express(), [router]);

export default app;
