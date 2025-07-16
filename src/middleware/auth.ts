// src/middleware/auth.ts
import { Context, Next } from 'hono';
import { JWTUtil } from '../utils/jwt';
import { UserModel } from '../models/user';

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  const token = JWTUtil.extractToken(authHeader);

  if (!token) {
    return c.json({ error: '토큰이 필요합니다' }, 401);
  }

  const payload = await JWTUtil.verifyToken(token);
  
  if (!payload || !payload.userId) {
    return c.json({ error: '유효하지 않은 토큰입니다' }, 401);
  }

  const user = await UserModel.findById(payload.userId as string);
  
  if (!user) {
    return c.json({ error: '사용자를 찾을 수 없습니다' }, 401);
  }

  c.set('user', user);
  c.set('userId', payload.userId as string);

  await next();
};