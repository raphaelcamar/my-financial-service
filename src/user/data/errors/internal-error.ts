export class InternalError extends Error {
  constructor() {
    super('Um erro interno Aconteceu. Tente novamente mais tarde');
    this.name = 'InternalError';
  }
}
