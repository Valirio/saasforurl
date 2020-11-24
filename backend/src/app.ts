import express from 'express';
import linksRouter from './routes/routs';

const app = express();

app.use(express.json());
app.use(linksRouter);

export default app;


