import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { WalletController } from "../controllers"

const walletController = new WalletController()
const middlewareToken = new VerifyAccessTokenMiddleware()

export const WalletRoutes = (app: App) => {
  app.post("/wallet/create", middlewareToken.verify, walletController.create)
  app.get("/wallet", middlewareToken.verify, walletController.get)
  app.post("/wallet/change", middlewareToken.verify, walletController.change)
}
