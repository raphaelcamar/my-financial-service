import { UseCase } from "@core/generic/data/protocols"
import { MonthlyClosingProtocol, TransactionProtocol } from "@user/data/protocols"
import { MonthlyClosing, Transaction } from "@user/domain/entities"
import { HasPendingTransactionsError } from "@user/domain/errors"
import { addDays } from "date-fns"

export class CloseMonth implements UseCase<MonthlyClosing> {
  constructor(
    private userId: string,
    private walletId: string,
    private transationRepository: TransactionProtocol,
    private monthlyClosingRepository: MonthlyClosingProtocol,
    private monthToClose: number
  ) {}

  async execute(): Promise<MonthlyClosing> {
    const { entrance, spent } = await this.attachAllTransactionsEntrances()

    this.verifyIfHasPendingTransactions(entrance.transactions, spent.transactions)
    const getTransactionsIds = [
      ...entrance.transactions.map(transaction => transaction._id),
      ...spent.transactions.map(transaction => transaction._id),
    ]

    const objToSend = new MonthlyClosing({
      userId: this.userId,
      walletId: this.walletId,
      month: this.monthToClose,
      year: new Date().getFullYear(),
      transactions: getTransactionsIds,
    })

    const closedMonth = await this.monthlyClosingRepository.closeMonth(objToSend)

    return closedMonth
  }

  private getQuery() {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), Number(this.monthToClose) - 1, 1)
    const lastDay = new Date(date.getFullYear(), Number(this.monthToClose), 0)

    const query = {
      $lte: addDays(lastDay, 1),
      $gte: firstDay,
    }

    return query
  }

  private verifyIfHasPendingTransactions(entrance: Transaction[], spent: Transaction[]) {
    const pendingEntranceTransactions = entrance?.filter(transaction => transaction.status === "PENDING")
    if (pendingEntranceTransactions.length > 0) {
      const ids = pendingEntranceTransactions.map(transaction => transaction._id)
      throw new HasPendingTransactionsError(ids)
    }

    const pendingSpentTransactions = spent?.filter(transaction => transaction.status === "PENDING")
    if (pendingSpentTransactions.length > 0) {
      const ids = pendingSpentTransactions.map(transaction => transaction._id)
      throw new HasPendingTransactionsError(ids)
    }
  }

  private async attachAllTransactionsEntrances() {
    const { entrance, spent } = await this.transationRepository.getTransactionsSplittedByType(this.userId, this.walletId, this.getQuery())

    return {
      entrance: entrance?.transactions ? entrance : null,
      spent: spent?.transactions ? spent : null,
    }
  }
}
