/* eslint-disable no-console */
import express from "express"
import { config } from "dotenv"
import { MongoDbConnection } from "@main/external-connections"
import { InitializeRoutes } from "@main/routes"
import { InitializeMiddlewares } from "@main/middlewares"
import { SchedulerController } from "@user/presenters/controllers"

Promise.resolve(config()).then(() => {
  const app = express()
  const port = Number(process.env.PORT) || 4000

  new InitializeMiddlewares(app, port).initialize()

  const local = process.env.RUN_MONGO_IN

  const uri = local === "local" ? process.env.MONGO_DB_LOCAL : process.env.MONGO_DB_URI

  const connection = new MongoDbConnection(uri)

  connection.connect()

  const route = new InitializeRoutes(app)
  route.initialize()

  const scheduler = new SchedulerController()
  scheduler.init()

  process.on("SIGINT", () => {
    connection.disconnect()
    console.log("connection closed")
    process.exit(0)
  })
})
