// src/models/user.ts
import { PrismaClient, Prisma } from '@prisma/client';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  static async create(userData: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({
      data: userData
    });
  }

  static async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  static async updateById(id: string, userData: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: userData
    });
  }

  static async deleteById(id: string): Promise<User> {
    return await prisma.user.delete({
      where: { id }
    });
  }
}