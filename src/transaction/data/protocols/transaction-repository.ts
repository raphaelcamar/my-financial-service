import { Transaction } from "@transaction/domain/entities"

export type TransactionRepository = {
  create: (transaction: Transaction.Data) => Promise<Transaction>
  getTransactions: (userId: string, query: object) => Promise<Transaction[]>
  getLastTransaction: (userId: string) => Promise<Transaction[]>
}
