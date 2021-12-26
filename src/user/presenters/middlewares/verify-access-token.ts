import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_TOKEN = 'SHA256:B6XlIhfqGIAcTKLVgydOIkLCUnTQxKHDuASWA65UTFU rapha@DESKTOP-8PNJN6R';

export class VerifyAccessTokenMiddleware {
  verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '') || '';
    Jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(402).json({ message: 'Token expired!' });
      }
      req.userId = decoded?.id;
      next();
    });
  }
}
