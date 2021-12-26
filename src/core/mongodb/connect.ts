import mongoose from 'mongoose';

const url = 'mongodb://financial-mongo:27017/FinancialControl';

export class MongoConnection {
  private mongoClient: any = null;

  async createConnection() {
    if (!this.mongoClient) {
      console.log('Creating instance');
      this.mongoClient = await mongoose.connect(url);
      return this.mongoClient;
    }
    console.log('get instance');
    return this.mongoClient;
  }
}
