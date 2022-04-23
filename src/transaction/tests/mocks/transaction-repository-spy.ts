/* eslint-disable no-unused-vars */
import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"

import { isSameMonth } from "date-fns"

export class TransactionRepositorySpy implements TransactionRepository {
  private transactions: Transaction[] = []

  async create(transaction: Transaction): Promise<Transaction> {
    const createdTransaction: Transaction = {
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.transactions.push(createdTransaction)

    return createdTransaction
  }

  async getTransactions(userId: string, start: Date, end: Date): Promise<Transaction[]> {
    const transactions = this.transactions.filter(transaction => transaction.userId === userId)

    const filteredDateTransactions = transactions.filter(transaction =>
      isSameMonth(start, transaction.billedAt)
    )

    return filteredDateTransactions
  }

  async getTransactionsByDate(
    userId: string,
    start: Date,
    end: Date,
    limit?: number
  ): Promise<Transaction[]> {
    return this.transactions
  }
}
