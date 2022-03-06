export class ValidationError extends Error {
  public status = 400

  public stackTrace: any[]

  constructor(message: string, stack: any[]) {
    super(message)
    this.stackTrace = stack
  }
}
