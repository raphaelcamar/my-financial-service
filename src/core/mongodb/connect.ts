/* eslint-disable no-console */
import mongoose from "mongoose"

export const connect = (uri: string) => {
  try {
    mongoose.connect(`mongodb+srv://${uri}/my-financial?retryWrites=true&w=majority`, () =>
      console.log("Connected!")
    )
  } catch (err) {
    console.error(err)
    console.log("Could not connect into the database. Try again")
  }
}
