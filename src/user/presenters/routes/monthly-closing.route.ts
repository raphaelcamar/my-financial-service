import { GetWalletFromHeaders, VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { MonthlyClosingController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const monthlyClosingController = new MonthlyClosingController()
const getWalletFromHeaders = new GetWalletFromHeaders()

export const MonthlyClosingRoutes = (app: App) => {
  app.post("/v2/monthly-closing", middlewareToken.verify, getWalletFromHeaders.apply, monthlyClosingController.create)
}
