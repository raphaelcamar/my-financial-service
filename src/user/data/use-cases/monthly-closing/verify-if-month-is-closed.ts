import { MonthlyClosingProtocol } from "@user/data/protocols"
import { UseCase } from "@core/generic/data/protocols"

export class VerifyIfMonthIsClosed implements UseCase<boolean> {
  constructor(
    private monthlyCloseRepository: MonthlyClosingProtocol,
    private month: number,
    private year: number,
    private userId: string,
    private walletId: string
  ) {}

  async execute(): Promise<boolean> {
    const result = await this.monthlyCloseRepository.getMonthlyClosing(this.month, this.year, this.userId, this.walletId)

    return !!result
  }
}
