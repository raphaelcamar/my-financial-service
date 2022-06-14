import { UnexpectedError } from "@core/generic/domain/errors"
import { HistoryRepository } from "@core/history/data/protocols/index"
import { History } from "@core/history/domain/entities"
import { History as HistorySchema } from "@core/history/infra/db/schemas"

export class HistoryRepositoryData<T> implements HistoryRepository {
  async createHistory(history: History<T>): Promise<void> {
    const historySchema = new HistorySchema(history)

    await historySchema.save().catch(() => {
      throw new UnexpectedError()
    })
  }
}
