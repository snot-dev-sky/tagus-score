import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { User, AuthPayload } from '../types';

const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION = '30d';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateToken(user: User): string {
    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: TOKEN_EXPIRATION,
    });
  }

  static verifyToken(token: string): AuthPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    } catch {
      return null;
    }
  }
}
