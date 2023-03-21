import { User } from "@user/infra/db/schemas"
import Jwt from "jsonwebtoken"
import { Request, Response, Next } from "@main/handlers/request"
import { ErrorStatus } from "@core/generic/domain/entities"
import { UnexpectedError } from "@core/generic/domain/errors"

export class VerifyAccessTokenMiddleware {
  async verify(req: Request, res: Response, next: Next) {
    const jwt_token = String(process.env.JWT_SECRET_TOKEN)
    const token = req.headers.authorization?.replace("Bearer ", "") || ""

    const user = await User.findOne({ token }).catch(() => {
      throw new UnexpectedError()
    })

    Jwt.verify(token, jwt_token, (err, decoded) => {
      if (err || !user) {
        res.status(ErrorStatus.UNAUTHORIZED).json({
          message: "Sessão expirada!",
          status: ErrorStatus.UNAUTHORIZED,
          tokenExpired: true,
        })
      } else {
        req.userId = decoded?.id
        req.walletId = req.body.walletId
        next()
      }
    })
  }
}
