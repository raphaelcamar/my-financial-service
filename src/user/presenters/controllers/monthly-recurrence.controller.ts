import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { MonthlyRecurrence } from "@user/domain/entities"
import { CreateMonthlyRecurrence, GetMonthlyRecurrenceIndicators, GetMonthlyRecurrences } from "@user/data/use-cases/monthly-recurrence"
import { MonthlyRecurrenceRepositoryData } from "@user/infra/repositories"
import { SocketCommunicationType, SocketPayloadType, SuccessStatus } from "@core/generic/domain/entities"
import { SocketSingletonRepository } from "@user/infra/singletons"
import { MonthlyRecurrenceValidation } from "../validation"

export class MonthlyRecurrenceController {
  async create(req: Request, res: Response) {
    const userId = req?.userId
    const walletId = req?.walletId
    const monthlyRecurrenceBody = req.body

    try {
      const monthlyRecurrence = new MonthlyRecurrence({ ...monthlyRecurrenceBody, userId })
      const validation = new MonthlyRecurrenceValidation(monthlyRecurrence)
      const monthlyRecurrenceRepository = new MonthlyRecurrenceRepositoryData()

      const useCase = new CreateMonthlyRecurrence(monthlyRecurrence, monthlyRecurrenceRepository, validation, userId, walletId)
      const result = await useCase.execute()

      const { io } = SocketSingletonRepository.getInstance()
      io.to(walletId).emit(SocketCommunicationType.NOTIFICATION, { type: SocketPayloadType.CREATE_MONTHLY_RECURRENCE, payload: result })

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)
      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, details: httpException.body.details })
    }
  }

  async get(req: Request, res: Response) {
    const userId = req?.userId
    const walletId = req?.walletId
    const { query } = req

    try {
      const monthlyRecurrenceRepository = new MonthlyRecurrenceRepositoryData()
      const useCase = new GetMonthlyRecurrences(monthlyRecurrenceRepository, userId, walletId, query as { tags: string; name: string })
      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)
      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, details: httpException.body.details })
    }
  }

  async getMonthlyRecurrenceIndicators(req: Request, res: Response) {
    const userId = req?.userId
    const walletId = req?.walletId

    try {
      const monthlyRecurrenceRepository = new MonthlyRecurrenceRepositoryData()
      const useCase = new GetMonthlyRecurrenceIndicators(userId, walletId, monthlyRecurrenceRepository)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)
      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, details: httpException.body.details })
    }
  }
}
