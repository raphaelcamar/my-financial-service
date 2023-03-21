import { Transaction } from "@user/domain/entities"

export type TransactionProtocol = {
  create: (transaction: Transaction.Data) => Promise<Transaction>
  getTransactions: (userId: string, walletId: string, query?: object) => Promise<Transaction[]>
}
