import { VerifyAccessTokenMiddleware } from "@core/generic/infra/middlewares"
import { TransactionController } from "@transaction/presenters/controllers"
import { App } from "@main/handlers"

const middlewareToken = new VerifyAccessTokenMiddleware()
const transactionController = new TransactionController()

export const TransactionRoutes = (app: App) => {
  app.post("/transaction", middlewareToken.verify, transactionController.create)
  app.get("/transaction", middlewareToken.verify, transactionController.getTransactions)
  app.delete("/transaction/:id", middlewareToken.verify, transactionController.deleteTransaction)
  app.put("/transaction/update", middlewareToken.verify, transactionController.updateTransaction)
  app.get("/transaction/statistics", middlewareToken.verify, transactionController.getStatistics)
}
