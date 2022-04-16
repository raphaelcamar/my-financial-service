import { UnexpectedError } from "@core/domain/errors"
import { ReminderRepository } from "@transaction/data/protocols"
import { Reminder, Transaction } from "@transaction/domain/entities"
import { Reminder as ReminderSchema } from "@transaction/infra/db/schemas"

export class ReminderRepositoryData implements ReminderRepository {
  async create(reminder: Reminder): Promise<Transaction> {
    const reminderSchema = new ReminderSchema(reminder)
    const result: Transaction = await reminderSchema.save().catch(() => {
      throw new UnexpectedError()
    })
    return result
  }
}
