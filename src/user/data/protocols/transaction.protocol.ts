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

export type GetPendingTransactionsGroupedByUserProps = {
  userId: string
  transactions: Transaction
}

export type TransactionProtocol = {
  create: (transaction: Transaction.Data) => Promise<Transaction>
  getTransactions: (userId: string, walletId: string, query?: object) => Promise<Transaction[]>
  getTransactionIndicators: (userId: string, walletId: string, query: object) => Promise<Transaction.Indicator>
  getTransactionsSplittedByType: (userId: string, walletId: string, query?: object) => Promise<TransactionsSplittedByTypeProps>
  updateTransaction: (transaction: Transaction.Data) => Promise<void>
  deleteTransaction: (transactionId: string, userId: string, walletId: string) => Promise<Transaction>
  getPendingTransactionsGroupedByUser: (filter: object) => Promise<GetPendingTransactionsGroupedByUserProps[]>
}
