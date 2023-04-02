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
}
