import { TransactionProtocol } from "@user/data/protocols"

export class VerifyIfHasPendingTransactions {
  constructor(private month: number, private transactionRepository: TransactionProtocol) {}

  async execute() {
    const pendingTransactions = await this.transactionRepository.getPendingTransactionsGroupedByUser(this.getFilter())
    return pendingTransactions
  }

  getFilter() {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), this.month - 1, 1)
    const lastDay = new Date(date.getFullYear(), this.month, 0)

    return {
      $lte: lastDay,
      $gte: firstDay,
    }
  }
}
