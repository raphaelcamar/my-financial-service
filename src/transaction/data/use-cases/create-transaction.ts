import { Transaction } from "@transaction/domain"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/data/protocols"
import { UnexpectedError } from "@core/data"
import { endOfMonth, startOfMonth } from "date-fns"

export class CreateTransaction implements UseCase<Transaction> {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionRepository
  ) {}

  // TODO separar em pelo menos três funções, com cada função com a sua responsabilidade
  async execute(): Promise<Transaction> {
    const start = startOfMonth(new Date())
    const end = endOfMonth(new Date())
    const isEntrance = this.transaction.type === "ENTRANCE"

    const [lastTransaction] = await this.transactionRepository.getTransactionsByDate(start, end)
    const amount = lastTransaction?.amount || 0

    const transactionAmount = {
      ...this.transaction,
      amount: isEntrance
        ? Number(amount || 0) + this.transaction.value
        : Number(amount || 0) + Number(`-${this.transaction.value}`),
    }

    const result = await this.transactionRepository.create(transactionAmount)

    if (!result) throw new UnexpectedError()

    delete result.userId

    return result
  }
}
