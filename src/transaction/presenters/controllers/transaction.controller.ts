import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import {
  GetTransactions,
  CreateTransaction,
  DeleteTransaction,
  UpdateTransaction,
  GetMostSpent,
  GetTotalFilter,
  GetTotal,
  GetAverage,
} from "@transaction/data/use-cases"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepositoryData } from "@transaction/infra/repositories"
import { Request, Response } from "@main/handlers"
import { TransactionValidation } from "@transaction/presenters/validation"
import { ValidationError, WrongParamError } from "@transaction/domain/errors"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const transaction = new Transaction({ ...req.body, userId, walletId })

    try {
      const transactionValidation = new TransactionValidation(transaction)
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new CreateTransaction(transaction, transactionRepositoryData, transactionValidation)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error?.status).json(error?.stackTrace)
      }

      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, stack: error?.stackTrace || [] })
    }
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const filters: Transaction.Filter = req.query

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new GetTransactions(userId, transactionRepositoryData, filters)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async deleteTransaction(req: Request, res: Response): Promise<void> {
    const userId = req?.userId

    const { params } = req

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new DeleteTransaction(transactionRepositoryData, userId, params?.id)

      await useCase.execute()

      res.status(SuccessStatus.NO_CONTENT).send()
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async updateTransaction(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const transaction = new Transaction({ ...req.body, userId })

    try {
      const transactionValidation = new TransactionValidation(transaction)
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new UpdateTransaction(transaction, transactionRepositoryData, transactionValidation)

      await useCase.execute()

      res.json(transaction).status(SuccessStatus.SUCCESS)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error?.status).json(error?.stackTrace)
      } else {
        const httpException = new HttpExceptionHandler(error)

        httpException.execute()

        res.status(httpException.status).json({ message: httpException.message, stack: error?.stackTrace || [] })
      }
    }
  }

  async getStatistics(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const filter: Transaction.Filter = req?.query

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const mostSpent = await new GetMostSpent(userId, transactionRepositoryData, filter).execute()
      const totalFilter = await new GetTotalFilter(userId, transactionRepositoryData, filter).execute()
      const total = await new GetTotal(userId, transactionRepositoryData).execute()
      const average = await new GetAverage(userId, transactionRepositoryData, filter).execute()

      const statistics = {
        mostSpent,
        totalFilter,
        total,
        average,
      }
      res.status(SuccessStatus.SUCCESS).json({ statistics, filter })
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
