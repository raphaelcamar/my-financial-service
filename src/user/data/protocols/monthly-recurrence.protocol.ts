import { MonthlyRecurrence } from "@user/domain/entities"
import { AverageRecurrencesReturnType, MostUsedTagReturnType } from "@user/infra/repositories"

export type MonthlyRecurrenceProtocol = {
  create: (monthlyRecurrence: MonthlyRecurrence, userId: string, walletId: string) => Promise<MonthlyRecurrence>
  getBy: (query: object) => Promise<MonthlyRecurrence[]>
  updateBy: (userId: string, walletId: string, fieldsToUpdate: Partial<MonthlyRecurrence.Data>) => Promise<void>
  getMonthlyRecurrenceMostUsedTag: (userId: string, walletId: string) => Promise<MostUsedTagReturnType>
  getAverageRecurrences: (userId: string, walletId: string) => Promise<AverageRecurrencesReturnType>
}
