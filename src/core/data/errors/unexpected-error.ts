export class UnexpectedError extends Error {
  status = 500

  constructor() {
    super("Um erro interno Aconteceu. Tente novamente mais tarde")
    this.name = "UnexpectedError"
  }
}
