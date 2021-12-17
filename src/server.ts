import express, { urlencoded, json } from 'express';
import mongoose from 'mongoose';
import { MongoConnection } from './core/mongodb/connect';

const app = express();
const port = 3000;

const corsOptions = {
  origin: '',
};

app.use(json({ limit: '2mb' })); // TODO ver isso
app.use(urlencoded({ extended: true, limit: '2mb' })); // TODO ver isso

app.listen(port, () => console.log(`Server is Running at http://localhost:${port}/`));
app.get('/', (req, res) => res.json({ message: 'hello' }));

new MongoConnection();


