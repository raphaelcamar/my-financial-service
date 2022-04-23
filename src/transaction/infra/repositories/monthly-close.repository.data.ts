import { UnexpectedError } from "@core/domain/errors"
import { MonthlyCloseRepository } from "@transaction/data/protocols/monthly-close-repository"
import { MonthlyClose } from "@transaction/domain/entities"
import { MonthlyClose as MonthlyCloseSchema } from "@transaction/infra/db/schemas"

export class MonthlyCloseRepositoryData implements MonthlyCloseRepository {
  async create(monthlyClose: MonthlyClose): Promise<MonthlyClose> {
    const monthlyCloseSchema = new MonthlyCloseSchema(monthlyClose)

    const result = await monthlyCloseSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return result
  }
}
