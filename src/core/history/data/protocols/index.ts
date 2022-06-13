import { History } from "@core/history/domain/entities"

export interface HistoryRepository {
  createHistory: <T>(history: History<T>) => Promise<void>
}
