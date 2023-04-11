import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TransactionController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()

export const TransactionV2Routes = (app: App) => {
  app.post("/v2/transaction", middlewareToken.verify, transactionController.create)
  app.get("/v2/transaction/:walletId", middlewareToken.verify, transactionController.getTransactions)
  app.get("/v2/transaction/:walletId/indicators", middlewareToken.verify, transactionController.getTransactionIndicators)
  app.delete("/v2/transaction/:walletId/:id", middlewareToken.verify, transactionController.deleteTransaction)
}
