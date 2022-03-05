import { Express } from "express"
import { VerifyAccessTokenMiddleware } from "@core/presenters/middlewares"
import { TransactionController } from "@transaction/presenters"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()

const routes = (app: Express) => {
  app.post("/transaction", middlewareToken.verify, transactionController.create)
}

export default routes
