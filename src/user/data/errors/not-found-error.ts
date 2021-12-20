export class NotFoundUserError extends Error {
  constructor() {
    super('Usuário não encontrado.');
  }
}
