import { UseCase } from "@core/generic/data/protocols"
import { MonthlyClosingProtocol } from "@user/data/protocols"
import { MonthlyClosing } from "@user/domain/entities"

export class GetMonthlyClosing implements UseCase<MonthlyClosing> {
  constructor(
    private userId: string,
    private walletId: string,
    private monthlyClosingRepository: MonthlyClosingProtocol,
    private monthToSearch: number,
    private year: number
  ) {}

  async execute(): Promise<MonthlyClosing> {
    const result = await this.monthlyClosingRepository.getMonthlyClosing(this.monthToSearch, this.year, this.userId, this.walletId)
    return result
  }
}
