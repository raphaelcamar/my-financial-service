/* eslint-disable no-use-before-define */
import { MonthlyRecurrenceProtocol } from "@user/data/protocols"
import { MonthlyRecurrence, Tag } from "@user/domain/entities"
import { UnexpectedError } from "@core/generic/domain/errors"
import mongoose from "mongoose"
import { MonthlyRecurrence as MonthlyRecurrenceSchema } from "../db/schemas"

export class MonthlyRecurrenceRepositoryData implements MonthlyRecurrenceProtocol {
  async create(monthlyRecurrence: MonthlyRecurrence, userId: string, walletId: string): Promise<MonthlyRecurrence> {
    const monthlyRecurrenceSchema = new MonthlyRecurrenceSchema({ ...monthlyRecurrence, walletId, userId })

    const monthlyRecurrenceCreated: any = await monthlyRecurrenceSchema.save({ safe: true, checkKeys: true }).catch(err => {
      throw new UnexpectedError(err)
    })

    return new MonthlyRecurrence(monthlyRecurrenceCreated)
  }

  async getBy(query: object): Promise<MonthlyRecurrence[]> {
    const monthlyRecurrences: any = await MonthlyRecurrenceSchema.find(query)
      .populate("tags")
      .catch(err => {
        throw new UnexpectedError(err)
      })

    if (monthlyRecurrences.length > 0) {
      return monthlyRecurrences.map(monthlyRecurrence => new MonthlyRecurrence(monthlyRecurrence))
    }

    return []
  }

  async updateBy(userId: string, walletId: string, fieldsToUpdate: object): Promise<void> {
    await MonthlyRecurrenceSchema.findOneAndUpdate({ userId, walletId }, { ...fieldsToUpdate }).catch(err => {
      throw new UnexpectedError(err)
    })
  }

  async getMonthlyRecurrenceMostUsedTag(userId: string, walletId: string): Promise<MostUsedTagReturnType> {
    const result: any = await MonthlyRecurrenceSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          walletId: new mongoose.Types.ObjectId(walletId),
        },
      },
      {
        $unwind: {
          path: "$tags",
        },
      },
      {
        $group: {
          _id: "$tags",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "Tag",
          localField: "_id",
          foreignField: "_id",
          as: "tag",
        },
      },
      {
        $unwind: {
          path: "$tag",
        },
      },
      {
        $group: {
          _id: null,
          totalCount: {
            $sum: "$count",
          },
          tag: {
            $first: "$tag",
          },
          tagCount: {
            $first: "$count",
          },
        },
      },
    ])

    const tagIndicator = result[0]

    return {
      tagCount: tagIndicator.tagCount,
      tag: new Tag(tagIndicator.tag),
      totalCount: tagIndicator.totalCount,
    }
  }

  async getAverageRecurrences(userId: string, walletId: string): Promise<AverageRecurrencesReturnType> {
    const result: any = await MonthlyRecurrenceSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          walletId: new mongoose.Types.ObjectId(walletId),
        },
      },
      {
        $group: {
          _id: null,
          mostSpent: {
            $max: {
              value: "$value",
              title: "$title",
            },
          },
          lessSpent: {
            $min: {
              value: "$value",
              title: "$title",
            },
          },
          totalSpent: {
            $sum: "$value",
          },
        },
      },
    ])

    const tagIndicator = result[0]

    return {
      ...tagIndicator,
    }
  }
}

export type MostUsedTagReturnType = {
  totalCount: number
  tag: Tag
  tagCount: number
}

export type AverageRecurrencesReturnType = {
  lessSpent: {
    title: string
    value: number
  }
  mostSpent: {
    title: string
    value: number
  }
  totalSpent: number
}
