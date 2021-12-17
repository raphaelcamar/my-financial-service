import mongoose from 'mongoose';
const url = 'mongodb://localhost:27017/FinancialControl';

export class MongoConnection {
  constructor(){
    this.createConnection();
  }

  createConnection(){
    mongoose.connect(url).then(() => {
      console.log('Mongodb Initialised')
    })
  }
}
