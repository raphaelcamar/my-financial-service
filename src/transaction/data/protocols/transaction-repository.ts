import { Transaction } from "@transaction/domain/entities"

export type TransactionRepository = {
  create: (transaction: Transaction.Data) => Promise<Transaction>
  getTransactions: (userId: string, start: Date, end: Date) => Promise<Transaction[]>
  getTransactionsByDate: (
    userId: string,
    start: Date,
    end: Date,
    limit?: number
  ) => Promise<Transaction[]>
}
