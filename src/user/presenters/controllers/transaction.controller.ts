import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { ValidationError } from "@user/domain/errors"
import {
  CreateTransaction,
  GetTransactionIndicators,
  GetTransactions,
} from "@user/data/use-cases/transaction"
import { Transaction } from "@user/domain/entities"
import { TransactionRepositoryData } from "@user/infra/repositories"
import { TransactionValidation } from "@user/presenters/validation"
import { MissingParamError } from "@core/generic/domain/errors"

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
        return
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

  async getTransactionIndicators(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    let query: any = req?.query

    if (query) {
      query = Number(query.month)
    } else {
      throw new MissingParamError("Missing month")
    }

    const transactionRepositoryData = new TransactionRepositoryData()

    try {
      const useCase = new GetTransactionIndicators(
        userId,
        walletId,
        query,
        transactionRepositoryData
      )

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
