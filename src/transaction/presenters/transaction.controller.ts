import { ValidationError } from "@transaction/data"
import { TransactionFactory } from "@transaction/data/factories"
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
      const transactionValidation = new TransactionValidation(transaction)
      const error = transactionValidation.validate()
      if (error) {
        throw new ValidationError(error.error, error.stack)
      }

      const transactionRepositoryData = new TransactionRepositoryData()
      const reminderRepositoryData = new ReminderRepositoryData()

      const factory = new TransactionFactory(
        transaction,
        transactionRepositoryData,
        reminderRepositoryData
      )

      const useCase = factory.execute()

      const result = await useCase.execute()

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
}
