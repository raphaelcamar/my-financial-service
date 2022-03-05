export class CredentialsError extends Error {
  public status = 401

  constructor() {
    super("Login ou senha estão incorretos. Tente novamente")
  }
}
