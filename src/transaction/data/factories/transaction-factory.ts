import { UseCase } from "@core/data/protocols"
import { Reminder, Transaction } from "@transaction/domain"
import { compareDesc } from "date-fns"
import { CreateReminder, CreateTransaction } from "@transaction/data/use-cases"
import { ReminderRepository, TransactionRepository } from "@transaction/data/protocols"

export class TransactionFactory {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionRepository,
    private reminderRepository: ReminderRepository
  ) {}

  execute(): UseCase<Reminder | Transaction> {
    const value = compareDesc(this.transaction.billedAt, new Date())

    return value === -1
      ? new CreateReminder({ ...this.transaction, isCancelled: false }, this.reminderRepository)
      : new CreateTransaction(this.transaction, this.transactionRepository)
  }
}
