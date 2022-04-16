import { UnexpectedError } from "@core/domain/errors"
import { TransactionRepository } from "@transaction/data"
import { Transaction } from "@transaction/domain/entities"
import { Transaction as TransactionSchema } from "@transaction/infra/db/schemas"

export class TransactionRepositoryData implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)

    const result = await transactionSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async getTransactionsByDate(start: Date, end: Date, limit: number): Promise<Transaction[]> {
    const lastTransaction: Transaction[] = await TransactionSchema.find({
      billedAt: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ $natural: -1 })
      .limit(limit || 1)
      .catch(() => {
        throw new UnexpectedError()
      })

    return lastTransaction
  }

  async getTransactions(userId: string, start: Date, end: Date): Promise<Transaction[]> {
    const transactions: Transaction[] = await TransactionSchema.find({
      userId,
      billedAt: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ $natural: -1 })
      .catch(() => {
        throw new UnexpectedError()
      })

    return transactions
  }
}
