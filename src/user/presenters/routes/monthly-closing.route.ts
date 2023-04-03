import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { MonthlyClosingController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const monthlyClosingController = new MonthlyClosingController()

export const MonthlyClosingRoutes = (app: App) => {
  app.post("/v2/monthly-closing", middlewareToken.verify, monthlyClosingController.create)
}
