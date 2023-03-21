import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TransactionController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()

export const TransactionV2Routes = (app: App) => {
  app.post("/transaction/v2", middlewareToken.verify, transactionController.create)
  app.get("/transaction/v2", middlewareToken.verify, transactionController.getTransactions)
}
