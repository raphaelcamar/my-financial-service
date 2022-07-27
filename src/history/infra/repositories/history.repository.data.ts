import { UnexpectedError } from "@core/generic/domain/errors"
import { HistoryRepository } from "@history/data/protocols/index"
import { History } from "@history/domain/entities"
import { History as HistorySchema } from "@history/infra/db/schemas"

export class HistoryRepositoryData implements HistoryRepository {
  async createHistory<T, K>(history: History<T, K>): Promise<void> {
    const historySchema = new HistorySchema(history)
    await historySchema.save().catch(() => {
      throw new UnexpectedError()
    })
  }
}
