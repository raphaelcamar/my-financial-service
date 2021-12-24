import express, { urlencoded, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import SubscribeRoute from '@user/infra/routes';
import { MongoConnection } from './core/mongodb/connect';

const app = express();
dotenv.config();
const port = 3000;

const mongo = new MongoConnection();
mongo.createConnection();

app.use(json({ }));
app.use(urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));

app.listen(port, () => console.log(`Server is Running at http://localhost:${port}/`));

SubscribeRoute(app);
