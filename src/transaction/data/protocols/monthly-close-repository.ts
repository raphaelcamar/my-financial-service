import { MonthlyClose } from "@transaction/domain/entities"

export type MonthlyCloseRepository = {
  create: (monthlyClose: MonthlyClose) => Promise<MonthlyClose>
}
