// src/routes/auth.ts
import { Hono } from 'hono';
import { UserModel } from '../models/user';
import { HashUtil } from '../utils/hash';
import { JWTUtil } from '../utils/jwt';

const auth = new Hono();

auth.post('/register', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return c.json({ error: '이미 사용중인 이메일입니다' }, 400);
    }

    const hashedPassword = await HashUtil.hashPassword(password);

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name
    });

    const token = await JWTUtil.generateToken(user.id, user.email);

    return c.json({
      message: '회원가입 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    return c.json({ error: '회원가입 실패' }, 500);
  }
});

auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return c.json({ error: '이메일 또는 비밀번호가 틀렸습니다' }, 401);
    }

    const isValidPassword = await HashUtil.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return c.json({ error: '이메일 또는 비밀번호가 틀렸습니다' }, 401);
    }

    const token = await JWTUtil.generateToken(user.id, user.email);

    return c.json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    return c.json({ error: '로그인 실패' }, 500);
  }
});

export default auth;