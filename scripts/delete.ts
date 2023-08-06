import mongoose from "mongoose"
import { config } from "dotenv"
import { Transaction } from "../src/user/infra/db/schemas/transaction"

async function deleteAll() {
  const userId = new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c7")
  const walletId = new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c8")

  mongoose.connect(process.env.MONGO_DB_LOCAL!, async () => {
    console.log("Connected!")
    await Transaction.deleteMany({ userId, walletId }).then(items => {
      console.log("Deleted!!", items)
    })
  })
}

Promise.resolve(config()).then(() => {
  deleteAll()
})
