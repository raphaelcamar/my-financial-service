import { UnexpectedError } from "@core/generic/domain/errors"
import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { Transaction as TransactionSchema } from "@transaction/infra/db/schemas"
import { endOfMonth, startOfMonth } from "date-fns"

export class TransactionRepositoryData implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)

    const result = await transactionSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async getLastTransaction(userId: string): Promise<Transaction[]> {
    const lastTransaction: Transaction[] = await TransactionSchema.find({
      userId,
    })
      .sort({ $natural: -1 })
      .limit(1)
      .catch(() => {
        throw new UnexpectedError()
      })

    return lastTransaction
  }

  async getTransactions(userId: string, query: object): Promise<Transaction[]> {
    const transactions: Transaction[] = await TransactionSchema.find({
      userId,
      billedAt: query,
    })
      .sort({ $natural: -1 })
      .catch(() => {
        throw new UnexpectedError()
      })

    return transactions
  }
}
