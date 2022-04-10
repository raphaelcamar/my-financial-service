import { MonthlyClose, Transaction } from "@transaction/domain"

export interface MontlyCloseRepository {
  getMonthlyCloses?: (userId: string) => Promise<MonthlyClose[]>
  createMonthlyClose: (userid: string, monthlyClose: MonthlyClose) => Promise<void>
}
