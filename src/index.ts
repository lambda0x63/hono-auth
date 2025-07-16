// src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import auth from './routes/auth';
import users from './routes/user';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.route('/auth', auth);
app.route('/users', users);

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono API!' });
});

app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});