import fs from "fs"

import mongoose from "mongoose"
import faker from "@faker-js/faker"
import { config } from "dotenv"
import { MongoDbConnection } from "../src/main/external-connections/mongodb/index"
import { Transaction } from "../src/user/infra/db/schemas/transaction"
import { TransactionBuilder } from "../src/user/builders/transaction.builder"
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const path = require("path")

async function populateTransaction() {
  const HOW_MANY_TRANSACTIONS = 50000

  const userId = new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c7")
  const walletId = new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c8")

  mongoose.connect(process.env.MONGO_DB_LOCAL!, async () => {
    console.log("Connected!")

    const array = []
    for (let ind = 0; ind < HOW_MANY_TRANSACTIONS; ind++) {
      const transaction = new Transaction({
        billedAt: new Date(),
        topic: faker.random.arrayElement(["FOOD", "TRANSPORT", "HEALTH", "OTHER"]),
        type: faker.random.arrayElement(["ENTRANCE", "SPENT"]),
        userId: new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c7"),
        walletId: new mongoose.Types.ObjectId("64c2aaab609073d24e09e1c8"),
        value: faker.datatype.number({ max: 10, min: 1 }),
        amount: faker.datatype.number({ max: 10, min: 1 }),
        anotation: faker.random.words(5),
        coin: faker.random.arrayElement(["USD", "BRL", "EUR", "ARS", "GBP", "JPY", "CNY", "AUD", "CAD", "CHF", "NZD"]),
        status: "apagar",
        paymentType: faker.random.arrayElement(["CREDIT", "DEBIT", "MONEY", "PIX", "TRANSFER", "CRYPTO", "BANK_SLIP", "OTHER"]),
      })

      transaction
        .save()
        .then(() => {
          console.log("Added item:", transaction.id)
          // array.push({ transactionId: transaction.id })

          // fs.promises.writeFile(path.join(__dirname, `../created-files.json`), JSON.stringify({ items: array }), () => {
          //   console.log(`Creating files`)
          // })
        })
        .catch(err => console.log(err))
    }
  })

  console.log({ userId })
  console.log({ walletId })
}

Promise.resolve(config()).then(() => {
  populateTransaction()
})
