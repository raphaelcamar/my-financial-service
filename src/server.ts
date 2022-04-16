/* eslint-disable no-console */
import { MongoDbConnection } from "@core/mongodb/connect"
import express, { urlencoded, json } from "express"
import cors from "cors"
import { config } from "dotenv"
import UserRoute from "@user/presenters/routes"
import TransactionRoute from "@transaction/presenters/routes"

Promise.resolve(config()).then(() => {
  const app = express()
  const port = 4000

  app.use(json({}))
  app.use(urlencoded({ extended: true }))
  app.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
    })
  )

  app.listen(port, () => console.log(`Server is Running at http://localhost:${port}/`))

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello Docker!" })
  })

  const connection = new MongoDbConnection(process.env.MONGO_DB_URI)

  connection.connect()

  process.on("SIGINT", () => {
    connection.disconnect()
    console.log("connection closed")
    process.exit(0)
  })

  UserRoute(app)
  TransactionRoute(app)
})
