import { TransactionFactory } from "@transaction/data/factories"
import { Transaction } from "@transaction/domain"
import { ReminderRepositoryData, TransactionRepositoryData } from "@transaction/infra"
import { Request, Response } from "express"
import { TransactionValidation } from "./validation"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const transaction: Transaction = req.body
    try {
      const transactionValidation = new TransactionValidation(transaction)
      transactionValidation.validate()

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
      res.json(err).status(err.status)
    }
  }
}
