import { UseCase } from "@core/generic/data/protocols"
import { HistoryRepository } from "@history/data/protocols"
import { History } from "@history/domain/entities"

export class CreateHistory<T> implements UseCase<void> {
  constructor(private historyRepository: HistoryRepository, private history: History.Data<T>) {}

  async execute(): Promise<void> {
    this.historyRepository.createHistory<T>(this.history)
  }
}
