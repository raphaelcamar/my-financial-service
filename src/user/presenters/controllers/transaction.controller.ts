import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { ValidationError } from "@user/domain/errors"
import { CreateTransaction, GetTransactionIndicators, GetTransactions, UpdateTransaction } from "@user/data/use-cases/transaction"
import { Transaction } from "@user/domain/entities"
import { MonthlyClosingRepositoryData, TransactionRepositoryData, WalletRepositoryData } from "@user/infra/repositories"
import { TransactionValidation } from "@user/presenters/validation"
import { MissingParamError } from "@core/generic/domain/errors"
import { GetMonthlyClosing } from "@user/data/use-cases/monthly-closing"

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
        return
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
    let month: any = req?.query?.month
    let year: any = req?.query?.year

    if (month) {
      month = Number(month)
    } else {
      throw new MissingParamError("Missing month")
    }

    if (year) {
      year = Number(year)
    } else {
      throw new MissingParamError("Missing month")
    }

    const transactionRepositoryData = new TransactionRepositoryData()
    const monthlyClosingRepository = new MonthlyClosingRepositoryData()

    try {
      const monthToSearch = month <= 1 ? 12 : month - 1
      const yearToSearch = month <= 1 ? year - 1 : year

      const monthlyClosingUseCase = new GetMonthlyClosing(userId, walletId, monthlyClosingRepository, monthToSearch, yearToSearch)
      const previousClosing = await monthlyClosingUseCase.execute()
      const useCase = new GetTransactionIndicators(userId, walletId, month, transactionRepositoryData, previousClosing)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async updateTransaction(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const transaction = new Transaction({ ...req.body, userId, walletId })

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

        res
          .status(httpException.status)
          .json({ message: httpException.message, stack: error?.stackTrace || [], details: httpException?.body?.details })
      }
    }
  }
}
