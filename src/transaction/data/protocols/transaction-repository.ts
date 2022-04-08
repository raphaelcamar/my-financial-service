/* eslint-disable no-unused-vars */
import { Transaction } from "@transaction/domain"

export type TransactionRepository = {
  create: (transaction: Transaction) => Promise<Transaction>
  getTransactions: (userId: string) => Promise<Transaction[]>
}
