import { ErrorStatus } from "@core/generic/domain/entities"

export class TagNotFoundError extends Error {
  status = ErrorStatus.BAD_REQUEST

  constructor() {
    super("Tag não encontrada. Tente novamente mais tarde.")
    this.name = "TagNotFoundError"
  }
}
