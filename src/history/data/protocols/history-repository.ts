import { History } from "@history/domain/entities"

export interface HistoryRepository {
  createHistory: <T>(history: History.Data<T>) => Promise<void>
}
