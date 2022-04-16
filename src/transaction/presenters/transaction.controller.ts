import { ErrorStatus, SuccessStatus } from "@core/domain/entities"
import { GetTransactions, CreateTransaction } from "@transaction/data/use-cases"
import { Transaction } from "@transaction/domain/entities"
import { ValidationError } from "@transaction/domain/errors"
import { TransactionRepositoryData } from "@transaction/infra/repositories"
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
      const transactionRepositoryData = new TransactionRepositoryData()
      const getTransactionUseCase = new GetTransactions(userId, transactionRepositoryData)
      const useCase = new CreateTransaction(
        transaction,
        transactionRepositoryData,
        transactionValidation
      )

      await useCase.execute()

      const result = await getTransactionUseCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(err.status).json({ message: err.message, stack: err.stackTrace })
        return
      }
      res
        .status(err?.status || ErrorStatus.INTERNAL)
        .json({ message: err?.message || "Algo aconteceu. Tente novamente mais tarde" })
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
      res
        .status(error?.status || ErrorStatus.INTERNAL)
        .json({ message: error?.message || "Algo aconteceu. Tente novamente mais tarde" })
    }
  }
}
