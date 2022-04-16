/* eslint-disable no-unused-vars */
import { TransactionBuilder } from "@transaction/builders"
import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"

export class TransactionRepositorySpy implements TransactionRepository {
  public data: Transaction[] = []

  async create(transaction: Transaction): Promise<Transaction> {
    this.data.push({
      ...transaction,
      createdAt: new Date(),
      _id: "1234",
      updatedAt: new Date(),
    })
    return { ...transaction, createdAt: new Date(), _id: "1234", updatedAt: new Date() }
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    return new TransactionBuilder().array(5)
  }

  async getTransactionsByDate(start: Date, end: Date, limit?: number): Promise<Transaction[]> {
    return this.data
  }
}
