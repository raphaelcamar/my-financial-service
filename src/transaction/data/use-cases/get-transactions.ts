import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/domain/errors"
import { endOfMonth, startOfMonth } from "date-fns"
import { InvalidUserIdError } from "@transaction/domain/errors"

export class GetTransactions implements UseCase<Transaction[]> {
  constructor(private userId: string, private transactionRepository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    const start = startOfMonth(new Date())
    const end = endOfMonth(new Date())

    if (!this.userId) throw new InvalidUserIdError()

    const result = await this.transactionRepository.getTransactions(this.userId, start, end)

    if (!result) throw new UnexpectedError()

    return result
  }
}
