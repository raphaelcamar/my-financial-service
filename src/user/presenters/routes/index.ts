import { Express } from "express"
import { UserController } from "@user/presenters/user.controller"
import { VerifyAccessTokenMiddleware } from "@core/presenters/middlewares"

const userController = new UserController()
const middlewareToken = new VerifyAccessTokenMiddleware()

const routes = (app: Express) => {
  app.post("/user/login", userController.login)
  app.post("/user/create", userController.create)
  app.put("/user/update", middlewareToken.verify, userController.update)
}

export default routes
