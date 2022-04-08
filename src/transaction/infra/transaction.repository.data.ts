import { Transaction } from "@transaction/domain"
import { Transaction as TransactionSchema } from "@transaction/infra/db/schemas"

export class TransactionRepositoryData {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)
    const result = await transactionSchema.save()
    return result
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    const transactions: Transaction[] = await TransactionSchema.find({ userId }).lean()

    return transactions
  }
}
