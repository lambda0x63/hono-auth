// src/types/hono.d.ts
import { User } from '@prisma/client';

declare module 'hono' {
  interface ContextVariableMap {
    user: User;
    userId: string;
  }
}