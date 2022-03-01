import Jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export class VerifyAccessTokenMiddleware {
  verify(req: Request, res: Response, next: NextFunction) {
    const jwt_token = String(process.env.JWT_SECRET_TOKEN)
    const token = req.headers.authorization?.replace("Bearer ", "") || ""
    Jwt.verify(token, jwt_token, (err, decoded) => {
      if (err) {
        console.error(err)
        res.status(402).json({ message: "Token expired!" })
      }
      req.userId = decoded?.id
      next()
    })
  }
}
