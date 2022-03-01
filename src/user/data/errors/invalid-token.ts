export class InvalidToken extends Error {
  constructor() {
    super("Token expirado. Faça o login novamente")
  }
}
