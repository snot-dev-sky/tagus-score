import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth';
import { ErrorCodes } from '../constants/errorCodes';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : undefined;

  if (!token) {
    return res
      .status(401)
      .json({ error: 'No token provided', errorCode: ErrorCodes.Auth.NO_TOKEN });
  }

  const payload = AuthService.verifyToken(token);

  if (!payload) {
    return res
      .status(401)
      .json({ error: 'Invalid token', errorCode: ErrorCodes.Auth.INVALID_TOKEN });
  }

  req.user = { id: payload.id, email: payload.email };
  next();
}
