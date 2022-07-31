import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { UnexpectedError } from "@core/generic/domain/errors"
import { formatISO, parse } from "date-fns"
import { InvalidUserIdError } from "@transaction/domain/errors"
import ptBR from "date-fns/locale/pt-BR"

export class GetTransactions implements UseCase<Transaction[]> {
  constructor(
    private userId: string,
    private transactionRepository: TransactionRepository,
    private filters: Transaction.Filter
  ) {}

  async execute(): Promise<Transaction[]> {
    if (!this.userId) throw new InvalidUserIdError()

    const query = this.getFilters(this.filters)

    const transactions = await this.transactionRepository.getTransactions(this.userId, query)

    if (!transactions) throw new UnexpectedError()

    return transactions
  }

  getFilters = (filters: Transaction.Filter): object => {
    if (!filters?.start && !filters?.limit) return null

    const start = formatISO(parse(filters?.start, "dd/MM/yyyy", new Date()))
    const limit = formatISO(parse(filters?.limit, "dd/MM/yyyy", new Date()))

    const query = {
      $lte: limit,
      $gte: start,
    }

    return query
  }
}
