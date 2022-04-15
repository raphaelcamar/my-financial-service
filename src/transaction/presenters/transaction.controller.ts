import { ValidationError } from "@transaction/data"
import { TransactionFactory } from "@transaction/data/factories"
import { GetTransactions } from "@transaction/data/use-cases"
import { Transaction } from "@transaction/domain"
import { ReminderRepositoryData, TransactionRepositoryData } from "@transaction/infra"
import { Request, Response } from "express"
import { TransactionValidation } from "./validation"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const transaction: Transaction = {
      ...req.body,
      userId,
    }

    try {
      // TODO pass transactionValidation to the useCase. make validation there
      const transactionValidation = new TransactionValidation(transaction)
      const error = transactionValidation.validate()
      if (error) {
        throw new ValidationError(error.error, error.stack)
      }

      const transactionRepositoryData = new TransactionRepositoryData()
      const reminderRepositoryData = new ReminderRepositoryData()
      const getTransactionUseCase = new GetTransactions(userId, transactionRepositoryData)

      const factory = new TransactionFactory(
        transaction,
        transactionRepositoryData,
        reminderRepositoryData
      )

      const useCase = factory.execute()

      await useCase.execute()

      const result = await getTransactionUseCase.execute()

      res.json(result).status(200)
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(err.status).json({ message: err.message, stack: err.stackTrace })
        return
      }
      res
        .status(err?.status || 500)
        .json({ message: err?.message || "Algo aconteceu. Tente novamente mais tarde" })
    }
  }

  async getTransactions(req: Request, res: Response): Promise<void> {
    const userId = req?.userId

    try {
      const transactionRepositoryData = new TransactionRepositoryData()

      const useCase = new GetTransactions(userId, transactionRepositoryData)

      const result = await useCase.execute()

      res.json(result).status(200)
    } catch (error) {
      res
        .status(error?.status || 500)
        .json({ message: error?.message || "Algo aconteceu. Tente novamente mais tarde" })
    }
  }
}
