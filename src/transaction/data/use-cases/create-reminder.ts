import { Reminder } from "@transaction/domain"
import { ReminderRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/data"

export class CreateReminder implements UseCase<Reminder> {
  constructor(private transaction: Reminder, private reminderRepository: ReminderRepository) {}

  async execute(): Promise<Reminder> {
    const result = await this.reminderRepository.create(this.transaction)
    if (!result) throw new UnexpectedError()
    return result
  }
}
