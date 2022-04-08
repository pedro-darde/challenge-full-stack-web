import express from 'express'
import { router } from './routes';
import cors from 'cors'
const app = express();

app.use(router)
app.use(express.json())