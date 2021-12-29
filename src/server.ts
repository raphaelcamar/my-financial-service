import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import SubscribeRoute from '@user/infra/routes';
import { MongoConnection } from '@core/mongodb/connect';

const app = express();
const port = 4000;

config();
const mongo = new MongoConnection();
mongo.createConnection();

app.use(json({ }));
app.use(urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200,
}));

app.listen(port, () => console.log(`Server is Running at http://localhost:${port}/`));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Docker!' });
});

SubscribeRoute(app);
