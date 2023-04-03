type GetDifferenceFromMonthsProps = {
  entrance: {
    difference: number
    percentage: number
  }
  spent: {
    difference: number
    percentage: number
  }
}

type GetDifferenceFromMonthsBody = {
  spent: number
  entrance: number
}

export class GetDifferenceFromMonths {
  constructor(private currentMonth: GetDifferenceFromMonthsBody, private previousMonth: GetDifferenceFromMonthsBody) {}

  execute(): GetDifferenceFromMonthsProps {
    const entranceDifference = this.getDifferenceValue(this.currentMonth.entrance, this.previousMonth.entrance)
    const spentDifference = this.getDifferenceValue(this.currentMonth.spent, this.previousMonth.spent)

    const entrancePercentage = this.getDifferencePercentage(this.currentMonth.entrance, this.previousMonth.entrance)
    const spentPercentage = this.getDifferencePercentage(this.currentMonth.spent, this.previousMonth.spent)

    return {
      entrance: {
        difference: entranceDifference,
        percentage: entrancePercentage,
      },
      spent: {
        difference: spentDifference,
        percentage: spentPercentage,
      },
    }
  }

  private getDifferenceValue(currentMonth: number, previousMonth: number): number {
    return currentMonth - previousMonth
  }

  private getDifferencePercentage(currentMonth: number, previousMonth: number): number {
    const subtractValues = previousMonth - currentMonth

    const divide = subtractValues / previousMonth

    const percentage = divide * 100

    return percentage
  }
}
