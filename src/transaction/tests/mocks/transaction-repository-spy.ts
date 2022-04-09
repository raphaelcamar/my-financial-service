import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain"

export class TransactionRepositorySpy implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    return { ...transaction, createdAt: new Date(), _id: "1234", updatedAt: new Date(), amount: 1 }
  }

  // TODO create mock for this guys
  async getTransactions(userId: string): Promise<Transaction[]> {
    return [
      {
        _id: "624f988a0ef98d1574d389a3",
        userId,
        billedAt: new Date(),
        anotation: "Teste",
        type: "ENTRANCE",
        value: 32.2,
        topic: "FOOD",
        createdAt: new Date(),
        updatedAt: new Date(),
        amount: 1,
      },
      {
        _id: "624f988a0ef98d1574d389a3",
        userId,
        billedAt: new Date(),
        anotation: "Teste",
        type: "ENTRANCE",
        value: 32.2,
        topic: "FOOD",
        createdAt: new Date(),
        updatedAt: new Date(),
        amount: 1,
      },
      {
        _id: "624f988a0ef98d1574d389a3",
        userId,
        billedAt: new Date(),
        anotation: "Teste",
        type: "ENTRANCE",
        value: 32.2,
        topic: "FOOD",
        createdAt: new Date(),
        updatedAt: new Date(),
        amount: 1,
      },
    ]
  }
}
