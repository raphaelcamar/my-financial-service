import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TagController } from "@tag/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const controller = new TagController()

export const TagRoutes = (app: App) => {
  app.post("/tag", middlewareToken.verify, controller.create)
  app.patch(
    "/tag/type/:type(active|inactive)/:id",
    middlewareToken.verify,
    controller.activeOrInactiveTag
  )
  app.delete("/tag/:id", middlewareToken.verify, controller.delete)
  app.get("/tag/:type(active|inactive)", middlewareToken.verify, controller.get)
}
