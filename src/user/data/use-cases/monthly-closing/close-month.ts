/* eslint-disable no-unsafe-optional-chaining */
import { UseCase } from "@core/generic/data/protocols"
import { MonthlyClosingProtocol, TransactionProtocol } from "@user/data/protocols"
import { MonthlyClosing, Transaction } from "@user/domain/entities"
import { HasPendingTransactionsError } from "@user/domain/errors"

export class CloseMonth implements UseCase<MonthlyClosing> {
  constructor(
    private userId: string,
    private walletId: string,
    private transationRepository: TransactionProtocol,
    private monthlyClosingRepository: MonthlyClosingProtocol,
    private monthToClose: number,
    private year: number
  ) {}

  async execute(): Promise<MonthlyClosing> {
    const { entrance, spent } = await this.attachAllTransactionsEntrances()
    if (entrance?.transactions && spent?.transactions) {
      this.verifyIfHasPendingTransactions(entrance?.transactions, spent?.transactions)
    }

    const getTransactionsIds = [
      ...(entrance?.transactions.map(transaction => transaction._id) || []),
      ...(spent?.transactions.map(transaction => transaction._id) || []),
    ]

    const balance = spent?.total + entrance?.total

    const monthlyClosing = new MonthlyClosing({
      userId: this.userId,
      walletId: this.walletId,
      month: this.monthToClose,
      aditionalInformation: `Fechamento do mês ${this.monthToClose}`,
      totalEntrance: entrance?.total || 0,
      totalSpents: spent?.total || 0,
      balance: Number.isNaN(balance) ? 0 : balance,
      year: this.year,
      transactions: getTransactionsIds,
    })

    const closedMonth = await this.monthlyClosingRepository.closeMonth(monthlyClosing)

    return closedMonth
  }

  private getQuery() {
    const firstDay = new Date(this.year, Number(this.monthToClose) - 1, 1)
    const lastDay = new Date(this.year, Number(this.monthToClose), 0)

    const query = {
      $lte: lastDay,
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
    const transactions = await this.transationRepository.getTransactionsSplittedByType(this.userId, this.walletId, this.getQuery())

    return {
      entrance: transactions?.entrance?.transactions ? transactions?.entrance : null,
      spent: transactions?.spent?.transactions ? transactions?.spent : null,
    }
  }
}
