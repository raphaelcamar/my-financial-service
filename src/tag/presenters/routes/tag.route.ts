import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TagController } from "../controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const controller = new TagController()

export const TagRoutes = (app: App) => {
  app.post("/tag", middlewareToken.verify, controller.create)
}
