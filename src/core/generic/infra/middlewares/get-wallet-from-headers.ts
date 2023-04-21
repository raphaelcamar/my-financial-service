import { MissingParamError } from "@core/generic/domain/errors"
import { Next, Request, Response } from "@main/handlers"

export class GetWalletFromHeaders {
  apply(req: Request, res: Response, next: Next) {
    const walletId = req.headers["wallet-id"]
    if (!walletId) throw new MissingParamError("Missing walletId")

    req.walletId = walletId as string
    next()
  }
}
