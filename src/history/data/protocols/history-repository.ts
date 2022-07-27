import { History } from "@history/domain/entities"

export interface HistoryRepository {
  createHistory: <T, K>(history: History<T | null, K>) => Promise<void>
}
