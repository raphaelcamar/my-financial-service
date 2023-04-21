import { ErrorStatus } from "@core/generic/domain/entities"
import { MissingParamError } from "@core/generic/domain/errors"
import { Next, Request, Response } from "@main/handlers"

export class GetWalletFromHeaders {
  apply(req: Request, res: Response, next: Next) {
    const walletId = req.headers["wallet-id"]

    if (!walletId || walletId === "undefined") {
      res.status(ErrorStatus.BAD_REQUEST).json({ message: "Não foi possível encontrar a carteira." })
    } else {
      req.walletId = walletId as string
      next()
    }
  }
}
