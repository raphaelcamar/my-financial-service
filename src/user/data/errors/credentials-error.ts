export class CredentialsError extends Error {
  constructor() {
    super("Login ou senha estão incorretos. Tente novamente")
  }
}
