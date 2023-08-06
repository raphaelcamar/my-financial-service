import { MonthlyRecurrence } from "@user/domain/entities"

export type MonthlyRecurrenceProtocol = {
  create: (monthlyRecurrence: MonthlyRecurrence, userId: string, walletId: string) => Promise<MonthlyRecurrence>
  getBy: (query: object) => Promise<MonthlyRecurrence[]>
}
