import express from 'express';
import { buildApp } from './utils/app';
import router from './routers/root';

const app = buildApp(express(), [router]);

export default app;
