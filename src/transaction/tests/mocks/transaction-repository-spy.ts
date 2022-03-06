import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain"

export class TransactionRepositorySpy implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    return { ...transaction, createdAt: new Date(), _id: "1234", updatedAt: new Date() }
  }
}
