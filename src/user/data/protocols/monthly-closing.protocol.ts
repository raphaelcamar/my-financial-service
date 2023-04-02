import { MonthlyClosing } from "@user/domain/entities"

export type MonthlyClosingProtocol = {
  closeMonth: (monthlyClosing: MonthlyClosing) => Promise<MonthlyClosing>
}
