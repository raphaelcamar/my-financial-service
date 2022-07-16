import { UseCase } from "@core/generic/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { parse } from "date-fns"

export class GetTotal implements UseCase<number> {
  constructor(private userId: string, private transactionRepository: TransactionRepository) {}

  async execute(): Promise<number> {
    const transactions = await this.transactionRepository.getTransactions(this.userId)

    const total = this.getTotal(transactions)

    return total
  }

  getTotal(transactions: Transaction.Data[] | null): number {
    if (transactions?.length <= 0) return 0

    const values = transactions.map(transaction => transaction?.value)
    const sumValues = values?.reduce((prev, curr) => prev + curr)

    return sumValues
  }
}
