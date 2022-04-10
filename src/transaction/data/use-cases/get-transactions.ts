import { Transaction } from "@transaction/domain"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/data"
import { endOfMonth, startOfMonth } from "date-fns"

export class GetTransactions implements UseCase<Transaction[]> {
  constructor(private userId: string, private transactionRepository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    const start = startOfMonth(new Date())
    const end = endOfMonth(new Date())

    const result = await this.transactionRepository.getTransactions(this.userId, start, end)

    if (!result) throw new UnexpectedError()

    return result
  }
}
