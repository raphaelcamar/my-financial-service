import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { ValidationError } from "@user/domain/errors"
import { CreateTransaction, GetTransactions } from "@user/data/use-cases/transaction"
import { Transaction } from "@user/domain/entities"
import { TransactionRepositoryData } from "@user/infra/repositories"
import { TransactionValidation } from "@user/presenters/validation"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const transaction = new Transaction({ ...req.body, userId, walletId })

    try {
      const transactionValidation = new TransactionValidation(transaction)
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new CreateTransaction(
        transaction,
        transactionRepositoryData,
        transactionValidation
      )

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error?.status).json(error?.stackTrace)
      }

      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res
        .status(httpException.status)
        .json({ message: httpException.message, stack: error?.stackTrace || [] })
    }
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const filters: Transaction.Filter = req.query

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new GetTransactions(userId, transactionRepositoryData, filters, walletId)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
