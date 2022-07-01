import Jwt from "jsonwebtoken"
import { Request, Response, Next } from "@main/handlers/request"
import { ErrorStatus } from "@core/generic/domain/entities"

export class VerifyAccessTokenMiddleware {
  verify(req: Request, res: Response, next: Next) {
    const jwt_token = String(process.env.JWT_SECRET_TOKEN)
    const token = req.headers.authorization?.replace("Bearer ", "") || ""
    Jwt.verify(token, jwt_token, (err, decoded) => {
      if (err) {
        res.status(ErrorStatus.UNAUTHORIZED).json({
          message: "Sessão expirada!",
          status: ErrorStatus.UNAUTHORIZED,
          tokenExpired: true,
        })
      } else {
        req.userId = decoded?.id
        next()
      }
    })
  }
}
