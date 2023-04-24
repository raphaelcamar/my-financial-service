import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { MonthlyClosingDoesntExist, ValidationError } from "@user/domain/errors"
import { CreateTransaction, GetTransactionIndicators, GetTransactions, UpdateTransaction, DeleteTransaction } from "@user/data/use-cases/transaction"
import { Transaction } from "@user/domain/entities"
import { MonthlyClosingRepositoryData, TransactionRepositoryData, WalletRepositoryData } from "@user/infra/repositories"
import { TransactionValidation } from "@user/presenters/validation"
import { MissingParamError } from "@core/generic/domain/errors"
import { GetMonthlyClosing } from "@user/data/use-cases/monthly-closing"
import { SocketSingletonRepository } from "@user/infra/singletons"
import { GetWalletById } from "@user/data/use-cases/wallet"

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

    try {
      if (!month) throw new MissingParamError("Missing month")
      month = Number(month)

      if (!year) throw new MissingParamError("Missing year")
      year = Number(year)

      const transactionRepositoryData = new TransactionRepositoryData()
      const monthlyClosingRepository = new MonthlyClosingRepositoryData()

      const monthToSearch = month <= 1 ? 12 : month - 1
      const yearToSearch = month <= 1 ? year - 1 : year

      const monthlyClosingUseCase = new GetMonthlyClosing(userId, walletId, monthlyClosingRepository, monthToSearch, yearToSearch)
      const previousClosing = await monthlyClosingUseCase.execute()

      // if (!previousClosing) throw new MonthlyClosingDoesntExist()

      const useCase = new GetTransactionIndicators(userId, walletId, month, transactionRepositoryData, previousClosing)
      const result = await useCase.execute()

      res.json({ ...result, month, year }).status(SuccessStatus.SUCCESS)
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
      const walletRepositoryData = new WalletRepositoryData()

      const useCase = new UpdateTransaction(transaction, transactionRepositoryData, transactionValidation)
      const getWalletValue = new GetWalletById(walletRepositoryData, walletId)
      const wallet = await getWalletValue.execute()

      const { io } = SocketSingletonRepository.getInstance()
      io.to(walletId).emit("update-wallet-value", { value: wallet.value })

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

  async deleteTransaction(req: Request, res: Response) {
    try {
      const userId = req?.userId
      const walletId = req?.walletId
      const transactionId = req?.params.id

      const transactionRepositoryData = new TransactionRepositoryData()
      const walletRepositoryData = new WalletRepositoryData()
      const useCase = new DeleteTransaction(transactionRepositoryData, userId, transactionId, walletId)

      const deletedTransaction = await useCase.execute()

      const getWalletValue = new GetWalletById(walletRepositoryData, walletId)
      const wallet = await getWalletValue.execute()

      const { io } = SocketSingletonRepository.getInstance()
      io.to(walletId).emit("update-wallet-value", { value: wallet.value })

      res.json(deletedTransaction).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, stack: error?.stackTrace || [], details: httpException?.body?.details })
    }
  }
}
