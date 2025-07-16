// src/utils/hash.ts
import { createHash, randomBytes, timingSafeEqual } from 'crypto';

export class HashUtil {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = createHash('sha256')
      .update(password + salt)
      .digest('hex');
    
    return `${salt}:${hash}`;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, hash] = hashedPassword.split(':');
    
    const newHash = createHash('sha256')
      .update(password + salt)
      .digest('hex');
    
    return timingSafeEqual(Buffer.from(hash), Buffer.from(newHash));
  }
}