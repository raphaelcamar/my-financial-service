import { Transaction } from "@transaction/domain"

export type TransactionRepository = {
  create: (transaction: Transaction) => Promise<Transaction>
  getTransactions: (userId: string, start: Date, end: Date) => Promise<Transaction[]>
  getTransactionsByDate: (start: Date, end: Date, limit?: number) => Promise<Transaction[]>
}
