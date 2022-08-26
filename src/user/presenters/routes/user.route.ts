import { UserController } from "@user/presenters/controllers"
import { VerifyAccessTokenMiddleware, HandleFileRequest } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"

const userController = new UserController()
const middlewareToken = new VerifyAccessTokenMiddleware()
const upload = new HandleFileRequest()

export const UserRoutes = (app: App) => {
  app.post("/user/login", userController.login)
  app.post("/user/create", userController.create)
  app.post("/user/password-recover", userController.passwordRecover)
  app.post("/user/verify-code", userController.verifyCodePasswordRecover)
  app.put("/user/update", userController.update)
  app.post("/user/verify", middlewareToken.verify, userController.verifyAccessToken)
  app.post(
    "/user/updatePicture",
    middlewareToken.verify,
    upload.multer.single("file"),
    userController.updatePicture
  )
}
