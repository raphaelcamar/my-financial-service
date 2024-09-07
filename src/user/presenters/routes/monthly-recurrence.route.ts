import { GetWalletFromHeaders, VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { MonthlyRecurrenceController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const monthlyRecurrenceController = new MonthlyRecurrenceController()
const getWalletFromHeaders = new GetWalletFromHeaders()

export const MonthlyRecurrenceRoutes = (app: App) => {
  app.post("/v2/monthly-recurrence/create", middlewareToken.verify, getWalletFromHeaders.apply, monthlyRecurrenceController.create)
  app.get("/v2/monthly-recurrence", middlewareToken.verify, getWalletFromHeaders.apply, monthlyRecurrenceController.get)
  app.get(
    "/v2/monthly-recurrence/indicators",
    middlewareToken.verify,
    getWalletFromHeaders.apply,
    monthlyRecurrenceController.getMonthlyRecurrenceIndicators
  )
}
