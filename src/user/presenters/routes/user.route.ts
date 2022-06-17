import { UserController } from "@user/presenters/controllers"
import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"

const userController = new UserController()
const middlewareToken = new VerifyAccessTokenMiddleware()

export const UserRoutes = (app: App) => {
  app.post("/user/login", userController.login)
  app.post("/user/create", userController.create)
  app.post("/user/password-recover", userController.passwordRecover)
  app.post("/user/verify-code", userController.verifyCodePasswordRecover)
  app.post("/user/verify", middlewareToken.verify, userController.verifyAccessToken)
  app.put("/user/update", userController.update)
}
