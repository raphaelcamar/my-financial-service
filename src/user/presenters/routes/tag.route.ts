import { GetWalletFromHeaders, VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TagController } from "@tag/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TagController()
const getWalletFromHeaders = new GetWalletFromHeaders()

export const TagRoutes = (app: App) => {
  app.post("/v2/tag", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.create)
}
