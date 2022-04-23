import { Express } from "express"
import { VerifyAccessTokenMiddleware } from "@core/presenters/middlewares"
import { MonthyCloseController } from "@transaction/presenters/controllers/monthly-close.controller"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new MonthyCloseController()

export const MonthlyCloseRoutes = (app: Express) => {
  app.post("/monthly-close", middlewareToken.verify, transactionController.create)
}
