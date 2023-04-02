import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TransactionController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()

export const TransactionV2Routes = (app: App) => {
  app.post("/v2/transaction", middlewareToken.verify, transactionController.create)
  app.get("/v2/transaction", middlewareToken.verify, transactionController.getTransactions)
  app.get("/v2/transaction/indicators", middlewareToken.verify, transactionController.getTransactionIndicators)
  app.post("/v2/close-month", middlewareToken.verify, transactionController.closeMonth)
}
