import { UnexpectedError } from "@core/generic/domain/errors"
import { MonthlyClosingProtocol } from "@user/data/protocols"
import { MonthlyClosing } from "@user/domain/entities"
import { MonthlyClosing as MonthlyClosingSchema } from "@user/infra/db/schemas"

export class MonthlyClosingRepositoryData implements MonthlyClosingProtocol {
  async closeMonth(monthlyClosing: MonthlyClosing): Promise<MonthlyClosing> {
    const monthlyClosingSchema = new MonthlyClosingSchema(monthlyClosing)

    const closedMonth: any = await monthlyClosingSchema.save().catch(err => {
      throw new UnexpectedError(err)
    })

    return closedMonth as MonthlyClosing
  }

  async getMonthlyClosing(month: number, year: number, userId: string, walletId: string): Promise<MonthlyClosing> {
    const result: any = await MonthlyClosingSchema.findOne({ userId, walletId, month, year }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as MonthlyClosing
  }
}
