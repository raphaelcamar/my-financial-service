import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { Request, Response } from "@main/handlers"
import { CloseMonth } from "@user/data/use-cases/monthly-closing"
import { MonthlyClosingRepositoryData, TransactionRepositoryData } from "@user/infra/repositories"

export class MonthlyClosingController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req?.userId
    const walletId = req?.walletId
    const { monthToClose, year } = req.body || null

    // TODO validar se existe a walletId, e o user
    if (monthToClose) {
      try {
        const transactionRepositoryData = new TransactionRepositoryData()
        const monthlyClosingRepository = new MonthlyClosingRepositoryData()

        const monthClose = new CloseMonth(userId, walletId, transactionRepositoryData, monthlyClosingRepository, Number(monthToClose), year)
        const closedMonth = await monthClose.execute()

        res.json(closedMonth).status(SuccessStatus.NO_CONTENT)
      } catch (error) {
        const httpException = new HttpExceptionHandler(error)
        httpException.execute()

        res.status(httpException.status).json({ message: httpException.message, details: httpException.body.details })
      }
    } else {
      res.status(ErrorStatus.BAD_REQUEST).json("Missing month at query")
    }
  }
}
