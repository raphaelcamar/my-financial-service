import { MonthlyClosing } from "@user/domain/entities"

export type MonthlyClosingProtocol = {
  closeMonth: (monthlyClosing: MonthlyClosing) => Promise<MonthlyClosing>
  getMonthlyClosing: (month: number, year: number, userId: string, walletId: string) => Promise<MonthlyClosing>
}
