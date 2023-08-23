import { MonthlyRecurrenceProtocol } from "@user/data/protocols"
import { MonthlyRecurrence } from "@user/domain/entities"
import { UnexpectedError } from "@core/generic/domain/errors"
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
}
