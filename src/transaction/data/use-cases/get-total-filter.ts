import { UseCase } from "@core/generic/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { parse } from "date-fns"

export class GetTotalFilter implements UseCase<number> {
  constructor(
    private userId: string,
    private transactionRepository: TransactionRepository,
    private filter: Transaction.Filter
  ) {}

  async execute(): Promise<number> {
    const query = this.getFilters(this.filter)

    const transactions = await this.transactionRepository.getSpents(this.userId, query)

    const total = this.getTotal(transactions)
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

  getTotal(transactions: Transaction.Data[] | null): number {
    if (transactions?.length <= 0) return 0

    const values = transactions.map(transaction => transaction?.value)
    const sumValues = values?.reduce((prev, curr) => prev + curr)

    return sumValues
  }
}
