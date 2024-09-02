import { Transaction } from "@user/domain/entities"
import { TransactionProtocol } from "@user/data/protocols"
import { Pagination, UseCase } from "@core/generic/data/protocols"
import { UnexpectedError } from "@core/generic/domain/errors"
import { addDays, parse } from "date-fns"
import { InvalidUserIdError } from "@user/domain/errors"

export class GetTransactions implements UseCase<Pagination<Transaction[], "transactions">> {
  constructor(
    private userId: string,
    private transactionRepository: TransactionProtocol,
    private filters: Transaction.Filter,
    private walletId: string
  ) {}

  async execute() {
    if (!this.userId) throw new InvalidUserIdError()

    const query = this.getFilters(this.filters)

    const transactions = await this.transactionRepository.getTransactions(this.userId, this.walletId, query, this.filters.page)

    if (!transactions) throw new UnexpectedError()

    return transactions
  }

  getFilters = (filters: Transaction.Filter): object => {
    if (!filters?.start && !filters?.limit) return null

    const start = parse(filters?.start, "dd/MM/yyyy", new Date())
    const limit = parse(filters?.limit, "dd/MM/yyyy", new Date())

    const query = {
      $lte: addDays(limit, 1),
      $gte: start,
    }

    return query
  }
}
