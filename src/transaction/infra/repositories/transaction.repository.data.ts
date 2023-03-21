import { UnexpectedError } from "@core/generic/domain/errors"
import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { Transaction as TransactionSchema } from "@transaction/infra/db/schemas"

export class TransactionRepositoryData implements TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)

    const result: any = await transactionSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return result as Transaction
  }

  async getLastTransaction(userId: string): Promise<Transaction[]> {
    const lastTransaction: any = await TransactionSchema.find({
      userId,
    })
      .sort({ $natural: -1 })
      .limit(1)
      .catch(() => {
        throw new UnexpectedError()
      })

    return lastTransaction as Transaction[]
  }

  async getTransactions(userId: string, query: object): Promise<Transaction[]> {
    const findBy = query ? { userId, billedAt: query } : { userId }

    const transactions: any = await TransactionSchema.find(findBy)
      .lean()
      .sort({ $natural: -1 })
      .catch(() => {
        throw new UnexpectedError()
      })

    return transactions as Transaction[]
  }

  async deleteTransaction(userId: string, transactionId: string): Promise<number> {
    const deletedTransaction: any = await TransactionSchema.deleteOne({
      userId,
      _id: transactionId,
    }).catch(() => {
      throw new UnexpectedError()
    })

    return deletedTransaction?.deletedCount as number
  }

  async updateTransaction(transaction: Transaction): Promise<void> {
    await TransactionSchema.updateOne(
      { userId: transaction?.userId, _id: transaction?._id },
      transaction
    ).catch(() => {
      throw new UnexpectedError()
    })
  }

  async getSpents(userId: string, query: object, justValue?: boolean): Promise<Transaction[]> {
    const findBy = query ? { userId, billedAt: query } : { userId }
    const fields = justValue ? { value: 1, _id: 0 } : null

    const transactions: any = await TransactionSchema.find(
      {
        ...findBy,
        type: {
          $eq: "SPENT",
        },
      },
      fields
    )
      .lean()
      .sort({ $natural: -1 })
      .catch(() => {
        throw new UnexpectedError()
      })

    return transactions as Transaction[]
  }
}
