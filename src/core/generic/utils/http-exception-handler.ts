import { ErrorStatus } from "@core/generic/domain/entities"

type HttpExceptionBodyProps = {
  details: any[]
}

export class HttpExceptionHandler {
  status: number = 0

  message: string = ""

  body: HttpExceptionBodyProps = { details: [] }

  constructor(private err: any) {
    this.status = err?.status
    this.message = err?.message
    this.body.details = err?.body
    console.error({ status: err?.status, message: err?.message })
  }

  execute() {
    if (!this.err?.status) {
      this.status = ErrorStatus.INTERNAL
    }

    if (!this.err?.message) {
      this.message = "Um erro interno aconteceu. Tente novamente mais tarde."
    }

    if (!this.err?.body) {
      this.body = { details: [] }
    }
  }
}
