import express from 'express';
import { buildApp } from './utils/app';
import { router } from './routes/root';

const app = buildApp(express(), [router]);

export default app;
