export class NotFoundUserError extends Error {
  public status = 401

  constructor() {
    super("Usuário não encontrado.")
  }
}
