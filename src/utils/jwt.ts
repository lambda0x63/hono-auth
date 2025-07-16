// src/utils/jwt.ts
import { sign, verify } from 'hono/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class JWTUtil {
  
  static async generateToken(userId: string, email: string): Promise<string> {
    return await sign({ userId, email }, JWT_SECRET);
  }

  static async verifyToken(token: string) {
    try {
      return await verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  static extractToken(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    return authHeader.substring(7);
  }
}