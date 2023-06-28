import { UnexpectedError } from "@core/generic/domain/errors"
import { Transaction as TransactionSchema } from "@user/infra/db/schemas"
import {
  GetPendingTransactionsGroupedByUserProps,
  TransactionProtocol,
  TransactionsSplittedByTypeProps,
} from "@user/data/protocols/transaction.protocol"
import { Transaction } from "@user/domain/entities"
import mongoose from "mongoose"
import { DeleteTransactionError } from "@user/domain/errors"

export class TransactionRepositoryData implements TransactionProtocol {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionSchema = new TransactionSchema(transaction)

    const result: any = await transactionSchema.save({ safe: true, checkKeys: true }).catch(() => {
      throw new UnexpectedError()
    })

    return new Transaction(result)
  }

  async getTransactionIndicators(userId: string, walletId: string, query: object): Promise<Transaction.Indicator> {
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

  async getTransactionsSplittedByType(userId: string, walletId: string, query: object): Promise<TransactionsSplittedByTypeProps> {
    const transactions: any = await TransactionSchema.aggregate([
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
          transactions: {
            $push: "$$ROOT",
          },
          total: {
            $sum: "$value",
          },
        },
      },
      {
        $group: {
          _id: "results",
          ENTRANCE: {
            $push: {
              $cond: [
                {
                  $eq: ["$_id", "ENTRANCE"],
                },
                {
                  transactions: "$transactions",
                  total: "$total",
                },
                "$$REMOVE",
              ],
            },
          },
          SPENT: {
            $push: {
              $cond: [
                {
                  $eq: ["$_id", "SPENT"],
                },
                {
                  transactions: "$transactions",
                  total: "$total",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          entrance: {
            $ifNull: [
              {
                $arrayElemAt: ["$ENTRANCE", 0],
              },
              {},
            ],
          },
          spent: {
            $ifNull: [
              {
                $arrayElemAt: ["$SPENT", 0],
              },
              {},
            ],
          },
        },
      },
    ])
    return transactions?.[0] as TransactionsSplittedByTypeProps
  }

  async updateTransaction(transaction: Transaction): Promise<void> {
    await TransactionSchema.updateOne({ userId: transaction?.userId, _id: transaction?._id, walletId: transaction.walletId }, transaction).catch(
      err => {
        throw new UnexpectedError(err)
      }
    )
  }

  async deleteTransaction(transactionId: string, userId: string, walletId: string): Promise<Transaction> {
    const findedTransactionToDelete = await TransactionSchema.findOne({ userId, walletId, _id: transactionId }).catch(err => {
      throw new UnexpectedError(err)
    })

    if (!findedTransactionToDelete) throw new DeleteTransactionError()

    const deletedTransaction = await findedTransactionToDelete.deleteOne()
    return deletedTransaction as Transaction
  }

  async getPendingTransactionsGroupedByUser(filter: object) {
    const result: any = await TransactionSchema.aggregate([
      {
        $match: {
          billedAt: filter,
        },
      },
      {
        $group: {
          _id: "$userId",
          transactions: {
            $push: {
              $cond: [
                {
                  $eq: ["$status", "PENDING"],
                },
                {
                  transaction: "$$ROOT",
                },
                "$$REMOVE",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          transactions: {
            $ifNull: [
              {
                $arrayElemAt: ["$transactions.transaction", 0],
              },
              null,
            ],
          },
        },
      },
    ]).catch(error => {
      throw new UnexpectedError(error)
    })
    return result as GetPendingTransactionsGroupedByUserProps[]
  }

  async getTransactionById(transactionId: string): Promise<Transaction> {
    const transaction: any = await TransactionSchema.findOne({ _id: transactionId })

    return transaction
  }
}
