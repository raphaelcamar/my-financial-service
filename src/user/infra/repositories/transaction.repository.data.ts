import { UnexpectedError } from "@core/generic/domain/errors"
import { Transaction as TransactionSchema } from "@user/infra/db/schemas"
import { TransactionProtocol } from "@user/data/protocols/transaction.protocol"
import { Transaction } from "@user/domain/entities"

export class TransactionRepositoryData implements TransactionProtocol {
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

  async getTransactions(userId: string, walletId: string, query: object): Promise<Transaction[]> {
    const findBy = query ? { userId, billedAt: query, walletId } : { userId, walletId }

    const transactions: any = await TransactionSchema.find(findBy)
      .lean()
      .sort({ $natural: -1 })
      .catch(() => {
        throw new UnexpectedError()
      })

    return transactions as Transaction[]
  }
}
