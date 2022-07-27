import { UseCase } from "@core/generic/data/protocols"
import { Recurrence } from "src/recurrence/domain"
import { RecurrenceRepository } from "../protocols/recurrence-repository"

export class CreateRecurrence implements UseCase<Recurrence.Data> {
  constructor(
    private recurrenceRepository: RecurrenceRepository,
    private recurrence: Recurrence.Data
  ) {}

  async execute(): Promise<Recurrence> {
    const instanceRecurrence = new Recurrence(this.recurrence)
    const createdRecurrence = await this.recurrenceRepository.create(instanceRecurrence)

    return createdRecurrence
  }
}
