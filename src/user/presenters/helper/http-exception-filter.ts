import { CredentialsError, EmailAlreadyExistsError, NotFoundUserError } from "@user/domain/errors"

export class HttpExceptionFilter {
  private typeException

  private status: number = 0

  constructor(typeException: any) {
    this.typeException = typeException
  }

  getStatusResponse() {
    if (this.typeException instanceof CredentialsError) this.status = 402
    if (this.typeException instanceof EmailAlreadyExistsError) this.status = 320
    if (this.typeException instanceof NotFoundUserError) this.status = 500
    return this.status
  }
}
