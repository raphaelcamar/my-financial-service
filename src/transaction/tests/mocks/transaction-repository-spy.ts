/* eslint-disable no-unused-vars */
import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"

export class TransactionRepositorySpy implements TransactionRepository {
  private transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction = new Transaction({
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    this.transactions.push(createdTransaction)

    return createdTransaction
  }

  async getTransactions(userId: string, query: object): Promise<Transaction[]> {
    const transactions = this.transactions.filter(transaction => transaction.userId === userId)

    return transactions
  }

  async getLastTransaction(userId: string): Promise<Transaction[]> {
    return this.transactions
  }

  async deleteTransaction(transactionId: string): Promise<number> {
    const founded = this.transactions.filter(transaction => transaction._id !== transactionId)

    if (!founded) return 0
    return 1
  }

  updateTransaction: (transaction: Transaction.Data) => Promise<void>

  getStatistics: (userId: string, query: object) => Promise<Transaction[]>
}
