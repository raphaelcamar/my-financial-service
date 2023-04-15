import { differenceInDays, lastDayOfMonth } from "date-fns"

type LastDayOfMonthProps = "IS_LAST_DAY" | "IS_10_DAYS" | false

export class VerifyIfCanClose {
  constructor(private month: number) {}

  execute(): LastDayOfMonthProps {
    const isLastDay = this.isLastDayOfMonth()

    return isLastDay
  }

  isLastDayOfMonth(): LastDayOfMonthProps {
    const date = new Date(2023, this.month, 30)
    const lastDay = lastDayOfMonth(date)
    const difference = differenceInDays(lastDay, date)

    if (difference <= 0) {
      return "IS_LAST_DAY"
    }

    if (difference <= 10) {
      return "IS_10_DAYS"
    }

    return false
  }
}
