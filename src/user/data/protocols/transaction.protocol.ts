import { Transaction } from "@user/domain/entities"

export type TransactionsSplittedByTypeProps = {
  spent: {
    transactions: Transaction[]
    total: number
  }
  entrance: {
    transactions: Transaction[]
    total: number
  }
}

export type TransactionProtocol = {
  create: (transaction: Transaction.Data) => Promise<Transaction>
  getTransactions: (userId: string, walletId: string, query?: object) => Promise<Transaction[]>
  getTransactionIndicators: (userId: string, walletId: string, query: object) => Promise<Transaction.Indicator>
  getTransactionsSplittedByType: (userId: string, walletId: string, query?: object) => Promise<TransactionsSplittedByTypeProps>
}
