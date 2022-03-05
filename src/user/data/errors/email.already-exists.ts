export class EmailAlreadyExistsError extends Error {
  public status = 406

  constructor() {
    super("Este e-mail já está cadastrado.")
  }
}
