import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { parse } from "date-fns"

export class GetMostSpent implements UseCase<Transaction.Data> {
  constructor(
    private userId: string,
    private transactionRepository: TransactionRepository,
    private filter: Transaction.Filter
  ) {}

  async execute() {
    const query = this.getFilters(this.filter)

    const transactions = await this.transactionRepository.getTransactions(this.userId, query)
    const mostSpentTransaction = this.getMostSpent(transactions)

    return mostSpentTransaction
  }

  private getFilters(filters: Transaction.Filter): object {
    if (!filters?.start && !filters?.limit) return null

    const start = parse(filters?.start, "dd/MM/yyyy", new Date())
    const limit = parse(filters?.limit, "dd/MM/yyyy", new Date())

    const query = {
      $gte: start,
      $lte: limit,
    }

    return query
  }

  // getTotal(values: Transaction.Data[] | null): number {
  //   if (!values) return 0

  //   const sumValues = values?.reduce((prev, curr) => prev.value + curr.value)

  //   console.log(sumValues)

  //   return null
  // }

  // separateValueFromObject(transactions: Transaction.Data[]): number[] {
  //   const arr = []

  //   if (transactions?.length <= 0) return null

  //   transactions.forEach(transaction => {
  //     arr.push(transaction.value)
  //   })

  //   return arr
  // }

  getMostSpent(values: Transaction.Data[]): Transaction.Data {
    if (values?.length <= 0) return null

    const spents = values.filter(transaction => transaction.type !== "ENTRANCE")
    const mostSpent = spents.reduce((prev, curr) => (prev.value > curr.value ? prev : curr))

    return mostSpent
  }
}
