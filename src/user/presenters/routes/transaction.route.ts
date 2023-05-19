import { GetWalletFromHeaders, VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { App } from "@main/handlers"
import { TransactionController } from "@user/presenters/controllers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()
const getWalletFromHeaders = new GetWalletFromHeaders()

export const TransactionV2Routes = (app: App) => {
  app.post("/v2/transaction", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.create)
  app.put("/v2/transaction", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.updateTransaction)
  app.get("/v2/transaction", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.getTransactions)
  app.get("/v2/transaction/indicators", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.getTransactionIndicators)
  app.delete("/v2/transaction/:id", middlewareToken.verify, getWalletFromHeaders.apply, transactionController.deleteTransaction)
}
