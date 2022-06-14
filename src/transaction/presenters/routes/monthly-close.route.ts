import { App } from "@main/handlers"
import { VerifyAccessTokenMiddleware } from "@core/generic/presenters/middlewares"
import { MonthyCloseController } from "@transaction/presenters/controllers/monthly-close.controller"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new MonthyCloseController()

export const MonthlyCloseRoutes = (app: App) => {
  app.post("/monthly-close", middlewareToken.verify, transactionController.create)
}
