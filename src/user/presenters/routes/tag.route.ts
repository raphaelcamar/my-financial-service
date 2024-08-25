import { GetWalletFromHeaders, VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TagController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const tagController = new TagController()
const getWalletFromHeaders = new GetWalletFromHeaders()

export const TagRoutes = (app: App) => {
  app.post("/v2/tag", middlewareToken.verify, getWalletFromHeaders.apply, tagController.create)
  app.get("/v2/tag", middlewareToken.verify, getWalletFromHeaders.apply, tagController.get)
  app.get("/v2/allTags", middlewareToken.verify, getWalletFromHeaders.apply, tagController.getAll)
  app.put("/v2/tag", middlewareToken.verify, getWalletFromHeaders.apply, tagController.update)
}
