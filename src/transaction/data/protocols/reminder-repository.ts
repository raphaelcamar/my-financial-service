/* eslint-disable no-unused-vars */
import { Reminder } from "@transaction/domain/entities"

export type ReminderRepository = {
  create: (reminder: Reminder) => Promise<Reminder>
}
