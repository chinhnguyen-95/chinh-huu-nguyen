// @ts-ignore
import express from 'express';
import resourceRoutes from './routes/resource.routes';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use('/resources', resourceRoutes);

export default app;
