/* eslint-disable no-unused-vars */
import { Reminder } from "@transaction/domain"

export type ReminderRepository = {
  create: (reminder: Reminder) => Promise<Reminder>
}
