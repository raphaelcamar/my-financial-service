import mongoose, { Mongoose } from 'mongoose';
const url = 'mongodb://localhost:27017/FinancialControl';

export class MongoConnection {

  private mongoClient: any = null;

  constructor(){
    if(!this.mongoClient){
      console.log('Creating instance')
      this.createConnection();
    }else{
      console.log('get instance')
      return this.mongoClient;
    }
  }

  async createConnection(){
    this.mongoClient = await mongoose.createConnection(url)
  }
}
