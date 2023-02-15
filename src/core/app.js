import express from 'express';
import { buildApp } from './utils/app.js';
import router from './routers/root.js';

const app = buildApp(express(), [router]);

export default app;
