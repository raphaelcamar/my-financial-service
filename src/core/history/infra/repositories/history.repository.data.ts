import { HistoryRepository } from "@core/history/data/protocols/index"
import { History } from "@core/history/domain/entities"

export class HistoryRepositoryData implements HistoryRepository {
  createHistory: <T>(history: History<T>) => Promise<void>
}
