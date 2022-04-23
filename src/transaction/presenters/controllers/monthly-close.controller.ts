import { SuccessStatus } from "@core/domain/entities"
import { HttpExceptionHandler } from "@core/presenters/utils"
import { CreateMonthlyClose } from "@transaction/data/use-cases"
import {
  MonthlyCloseRepositoryData,
  TransactionRepositoryData,
} from "@transaction/infra/repositories"
import { Request, Response } from "express"

export class MonthyCloseController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const monthlyCloseRepository = new MonthlyCloseRepositoryData()
      const transactionRepository = new TransactionRepositoryData()

      const useCase = new CreateMonthlyClose(monthlyCloseRepository, userId, transactionRepository)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
