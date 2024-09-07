import { UseCase } from "@core/generic/data/protocols"
import { MonthlyRecurrenceProtocol } from "@user/data/protocols"
import { AverageRecurrencesReturnType } from "@user/infra/repositories"

type ReturnType = AverageRecurrencesReturnType & {
  mostUsedTag: {
    title: string
    percentage: number
  }
}

export class GetMonthlyRecurrenceIndicators implements UseCase<ReturnType> {
  constructor(private userId: string, private walletId: string, private monthlyRecurrenceRepository: MonthlyRecurrenceProtocol) {}

  async execute(): Promise<ReturnType> {
    const mostUsedTag = await this.monthlyRecurrenceRepository.getMonthlyRecurrenceMostUsedTag(this.userId, this.walletId)
    const averageRecurrences = await this.monthlyRecurrenceRepository.getAverageRecurrences(this.userId, this.walletId)

    return {
      ...averageRecurrences,
      mostUsedTag: {
        percentage: this.getPercentage(mostUsedTag.tagCount, mostUsedTag.totalCount),
        title: mostUsedTag.tag.title,
      },
    }
  }

  getPercentage(tagCount: number, totalCount: number): number {
    const splitted = tagCount / totalCount
    const convertToNumber = Number((splitted * 100).toFixed(2))

    if (Number.isNaN(convertToNumber)) return 0

    return convertToNumber
  }
}
