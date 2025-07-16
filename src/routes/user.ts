// src/routes/user.ts
import { Hono } from 'hono';
import { UserModel } from '../models/user';
import { HashUtil } from '../utils/hash';
import { authMiddleware } from '../middleware/auth';

const users = new Hono();

users.get('/profile', authMiddleware, async (c) => {
 try {
   const user = c.get('user');
   
   return c.json({
     user: {
       id: user.id,
       email: user.email,
       name: user.name,
       createdAt: user.createdAt
     }
   });
 } catch (error) {
   return c.json({ error: '프로필 조회 실패' }, 500);
 }
});

users.put('/profile', authMiddleware, async (c) => {
 try {
   const userId = c.get('userId');
   const { name, password } = await c.req.json();

   const updateData: any = {};
   
   if (name) {
     updateData.name = name;
   }
   
   if (password) {
     updateData.password = await HashUtil.hashPassword(password);
   }

   const updatedUser = await UserModel.updateById(userId, updateData);

   return c.json({
     message: '프로필 수정 성공',
     user: {
       id: updatedUser.id,
       email: updatedUser.email,
       name: updatedUser.name,
       updatedAt: updatedUser.updatedAt
     }
   });

 } catch (error) {
   return c.json({ error: '프로필 수정 실패' }, 500);
 }
});

users.delete('/profile', authMiddleware, async (c) => {
 try {
   const userId = c.get('userId');
   
   await UserModel.deleteById(userId);
   
   return c.json({ message: '회원 탈퇴 성공' });
 } catch (error) {
   return c.json({ error: '회원 탈퇴 실패' }, 500);
 }
});

export default users;