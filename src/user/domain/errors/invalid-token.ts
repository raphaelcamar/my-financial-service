export class InvalidToken extends Error {
  public status = 401

  constructor() {
    super("Token expirado. Faça o login novamente")
  }
}
