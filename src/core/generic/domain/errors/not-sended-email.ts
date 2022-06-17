import { ErrorStatus } from "../entities"

export class NotSendedEmailError extends Error {
  status = ErrorStatus.FORBIDDEN

  constructor() {
    super("E-mail não enviado. Algo aconteceu")
    this.name = "NotSendedEmailError"
  }
}
