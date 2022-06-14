import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/presenters/utils"
import { GetTransactions, CreateTransaction } from "@transaction/data/use-cases"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepositoryData } from "@transaction/infra/repositories"
import { Request, Response } from "@main/handlers"
import { TransactionValidation } from "@transaction/presenters/validation"
import { CreateHistory } from "@core/history/data/use-cases"
import { HistoryRepositoryData } from "@core/history/infra/repositories/history.repository.data"
import { History } from "@core/history/domain/entities"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const transaction = new Transaction({ ...req.body, userId })

    try {
      const transactionValidation = new TransactionValidation(transaction)
      const transactionRepositoryData = new TransactionRepositoryData()
      const getTransactionUseCase = new GetTransactions(userId, transactionRepositoryData)
      const useCase = new CreateTransaction(
        transaction,
        transactionRepositoryData,
        transactionValidation
      )

      const transactionCreated = await useCase.execute()

      const historyRepository = new HistoryRepositoryData<Transaction.Data>()
      const history = new History({
        context: "Transaction",
        occurrenceDate: new Date(),
        summary: "Transação criada em",
        userId: req?.userId,
        metadata: {
          transactionCreated,
        },
      })
      const historyUseCase = new CreateHistory<Transaction.Data>(historyRepository, history)

      await historyUseCase.execute()

      const result = await getTransactionUseCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res
        .status(httpException.status)
        .json({ message: httpException.message, stack: error?.stackTrace || [] })
    }
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    const userId = req?.userId

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new GetTransactions(userId, transactionRepositoryData)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
