import { ReminderRepository } from "@transaction/data"
import { Reminder, Transaction } from "@transaction/domain"
import { Reminder as ReminderSchema } from "@transaction/infra/db/schemas"

export class ReminderRepositoryData implements ReminderRepository {
  async create(reminder: Reminder): Promise<Transaction> {
    const reminderSchema = new ReminderSchema(reminder)
    const result: Transaction = await reminderSchema.save()
    return result
  }
}
