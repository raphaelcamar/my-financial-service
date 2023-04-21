import { ErrorStatus } from "@core/generic/domain/entities"

export class MonthlyClosingDoesntExist extends Error {
  status = ErrorStatus.FORBIDDEN

  constructor() {
    super("Não foi possível encontrar o fechamento mensal do mês passado.")
    this.name = "MonthlyClosingDoesntExist"
  }
}
