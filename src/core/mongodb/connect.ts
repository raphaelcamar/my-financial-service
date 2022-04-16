/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import mongoose from "mongoose"

export class MongoDbConnection {
  constructor(private uri: string) {}

  connect(): void {
    try {
      mongoose.connect(`mongodb+srv://${this.uri}/my-financial?retryWrites=true&w=majority`, () =>
        console.log("Connected!")
      )
    } catch (err) {
      console.error(err)
      console.log("Could not connect into the database. Try again")
    }

    mongoose.connection.on("error", err => {
      console.log(err)
    })
  }

  disconnect(): void {
    mongoose.disconnect()
  }
}
