import { UseCase } from "@core/generic/data/protocols"
import { MonthlyRecurrenceProtocol } from "@user/data/protocols"
import { MonthlyRecurrence } from "@user/domain/entities"

export class GetMonthlyRecurrences implements UseCase<MonthlyRecurrence[]> {
  constructor(
    private monthlyRecurrenceRepository: MonthlyRecurrenceProtocol,
    private userId: string,
    private walletId: string,
    private queryString: { tags: string; name: string }
  ) {}

  async execute(): Promise<MonthlyRecurrence[]> {
    const query = this.mountQuery(this.queryString)

    const result = await this.monthlyRecurrenceRepository.getBy({ userId: this.userId, wallet: this.walletId, ...query })

    return result
  }

  mountQuery(query: { tags: string; name: string }): object {
    const queryFilter = query.tags?.split(",")

    const mongoQuery: { title?: object; tags?: object } = {}

    if (query.name) {
      const reg = new RegExp(`${query.name}`)
      mongoQuery.title = {
        $regex: reg,
      }
    }

    if (query.tags) {
      mongoQuery.tags = {
        $in: queryFilter?.map(item => ({ _id: item })),
      }
    }

    return mongoQuery
  }
}
