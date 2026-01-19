# Event Platform API

This is the backend API for the Event Platform, built using [Next.js](https://nextjs.org) Route Handlers. It provides the core business logic and data persistence for the platform.

## Features

- **Event Operations**: CRUD operations for managing events.
- **Authentication**: User registration and login using JWT.
- **Database Integration**: Connects to the database using Prisma (via `@event-platform/db`).
- **Secure**: Uses `bcryptjs` for password hashing and `jsonwebtoken` for secure sessions.

## Tech Stack

- **Framework**: Next.js 15 (App Router for API Routes)
- **Database**: PostgreSQL (managed via Prisma in `@event-platform/db`)
- **Authentication**: JWT, Bcrypt
- **Workspace Packages**:
  - `@event-platform/db`: Database client and Prisma schema.
  - `@event-platform/logger`: Logging utilities.

## Setup

1.  **Install dependencies**:
    From the root of the monorepo:

    ```bash
    pnpm install
    ```

2.  **Database Setup**:
    Ensure your database is running and the schema is pushed. Run from the root or the db package:

    ```bash
    pnpm --filter db db:push
    ```

3.  **Environment Variables**:
    Create a `.env` file in `apps/api` with the necessary secrets, such as `JWT_SECRET` and `DATABASE_URL`.

## Running the API

### Development Mode

To run the API server in development mode (runs on port 4000):

```bash
pnpm --filter api dev
```

The API will be available at [http://localhost:4000](http://localhost:4000).

### Building for Production

To build the API for production:

```bash
pnpm --filter api build
```

To start the production server:

```bash
pnpm --filter api start
```

## API Structure

The API routes are located in `src/app/api`. It follows the Next.js App Router conventions for defining endpoints.

## Linting

To lint the code:

```bash
pnpm --filter api lint
```
