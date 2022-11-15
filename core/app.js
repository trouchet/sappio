import express from "express";
import { buildApp } from '../utils/app.js';
import { router } from './routes/root.js';

let app = {};
export default app = buildApp(express(), [ router ]);
