import { CreateTransaction } from "@transaction/data/use-cases/create-transaction"
import { Transaction } from "@transaction/domain"
import { TransactionRepositoryData } from "@transaction/infra"
import { Request, Response } from "express"
import { TransactionValidation } from "./validation"

export class TransactionController {
  async create(req: Request, res: Response): Promise<void> {
    const transaction: Transaction = req.body
    try {
      const transactionValidation = new TransactionValidation(transaction)
      transactionValidation.validate()
      const transactionRepositoryData = new TransactionRepositoryData()
      const useCase = new CreateTransaction(transaction, transactionRepositoryData)
      const result = await useCase.execute()
      res.json(result).status(200)
    } catch (err) {
      res.json(err).status(err.status)
    }
  }
}
