import { Reminder } from "@transaction/domain"
import { Reminder as ReminderSchema } from "@transaction/infra/db/schemas"

export class ReminderRepositoryData {
  async create(reminder: Reminder) {
    const reminderSchema = new ReminderSchema(reminder)
    const result = await reminderSchema.save()
    return result
  }
}
