import { UserController } from "@user/presenters/controllers"
import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"

const userController = new UserController()
const middlewareToken = new VerifyAccessTokenMiddleware()

export const UserRoutes = (app: App) => {
  app.post("/user/login", (req, res) => userController.login(req, res))
  app.post("/user/create", (req, res) => userController.create(req, res))
  app.get("/user/password-recover", userController.passwordRecover)
  app.post("/user/verify", middlewareToken.verify, (req, res) =>
    userController.verifyAccessToken(req, res)
  )
}
