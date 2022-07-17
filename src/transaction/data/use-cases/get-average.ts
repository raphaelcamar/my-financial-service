import { UseCase } from "@core/generic/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { parse } from "date-fns"

export class GetAverage implements UseCase<number> {
  constructor(
    private userId: string,
    private transactionRepository: TransactionRepository,
    private filter: Transaction.Filter
  ) {}

  async execute(): Promise<number> {
    const query = this.getFilters(this.filter)

    const transactions = await this.transactionRepository.getSpents(this.userId, query, true)

    const total = this.getAverage(transactions)

    return total
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

  getAverage(transactions: Transaction.Data[] | null): number {
    if (transactions?.length <= 0) return 0

    const values = transactions.map(transaction => transaction?.value)
    const divideBy = transactions?.length
    const sumValues = values?.reduce((prev, curr) => prev + curr)

    return sumValues / divideBy
  }
}
