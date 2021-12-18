import express, { urlencoded, json } from 'express';
import mongoose from 'mongoose';
import { MongoConnection } from './core/mongodb/connect';
import cors from 'cors';

const app = express();
const port = 3000;

new MongoConnection();

app.use(json({ }));
app.use(urlencoded({ extended: true, }));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}))

app.listen(port, () => console.log(`Server is Running at http://localhost:${port}/`));