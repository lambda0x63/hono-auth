# hono-auth-api

A simple authentication API built with Hono and Prisma.

## Features

- User registration and login
- JWT authentication
- Password hashing
- Profile management (read, update, delete)
- PostgreSQL database with Prisma ORM

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Configure your database URL and JWT secret in `.env`

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma client:
```bash
npx prisma generate
```

## Development

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### User Profile
- `GET /users/profile` - Get user profile (requires auth)
- `PUT /users/profile` - Update user profile (requires auth)
- `DELETE /users/profile` - Delete user account (requires auth)

## Tech Stack

- [Hono](https://hono.dev/) - Web framework
- [Prisma](https://prisma.io/) - Database ORM
- [PostgreSQL](https://postgresql.org/) - Database
- TypeScript