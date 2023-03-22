import { UnexpectedError } from "@core/generic/domain/errors"
import { Transaction as TransactionSchema } from "@user/infra/db/schemas"
import { TransactionProtocol } from "@user/data/protocols/transaction.protocol"
import { Transaction } from "@user/domain/entities"
import mongoose from "mongoose"

export class TransactionRepositoryData implements TransactionProtocol {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)

    const result: any = await transactionSchema.save().catch(() => {
      throw new UnexpectedError()
    })

    return result as Transaction
  }

  async getTransactionIndicators(
    userId: string,
    walletId: string,
    query: object
  ): Promise<Transaction.Indicator> {
    const transactionIndicators: any = await TransactionSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          walletId: new mongoose.Types.ObjectId(walletId),
          billedAt: query,
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$value",
          },
        },
      },
      {
        $group: {
          _id: null,
          SPENT: {
            $sum: {
              $cond: [
                {
                  $eq: ["$_id", "SPENT"],
                },
                "$total",
                0,
              ],
            },
          },
          ENTRANCE: {
            $sum: {
              $cond: [
                {
                  $eq: ["$_id", "ENTRANCE"],
                },
                "$total",
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: null,
          spent: {
            value: "$SPENT",
            differentPercentage: null,
          },
          entrance: {
            value: "$ENTRANCE",
            differentPercentage: null,
          },
        },
      },
    ]).catch(err => {
      throw new UnexpectedError(err)
    })
    return transactionIndicators?.[0] as Transaction.Indicator
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
