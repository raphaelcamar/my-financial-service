import { UseCase, ValidateFields } from "@core/generic/data/protocols"
import { MonthlyRecurrenceProtocol } from "@user/data/protocols"
import { MonthlyRecurrence } from "@user/domain/entities"
import { ValidationError } from "@user/domain/errors"

export class CreateMonthlyRecurrence implements UseCase<MonthlyRecurrence> {
  constructor(
    private monthlyRecurrence: MonthlyRecurrence,
    private monthlyRecurrenceRepository: MonthlyRecurrenceProtocol,
    private validation: ValidateFields,
    private userId: string,
    private walletId: string
  ) {}

  async execute(): Promise<MonthlyRecurrence> {
    const error = this.validation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    const result = await this.monthlyRecurrenceRepository.create(this.monthlyRecurrence, this.userId, this.walletId)

    return result
  }
}
