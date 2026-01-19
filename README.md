# Event Platform Monorepo

The Event Platform is a comprehensive event management and access control system. It enables organizers to create events, issue invitations, and validate entry using secure QR codes. This monorepo contains all the applications and packages required for the platform.

## Project Structure

This project uses **pnpm** workspaces and **Turborepo** for build system orchestration.

### Applications (`apps/`)

- **web**: The main web application for event organizers and attendees. Built with Next.js, Tailwind CSS, and React Query.
- **api**: The backend API service. Built with Next.js App Router, Prisma, and JWT authentication.
- **mcp**: A Model Context Protocol (MCP) server that exposes platform tools to LLMs and other agents.
- **mobile**: (Coming soon) A Flutter-based mobile scanner application.

### Packages (`packages/`)

- **api-client**: A shared type-safe API client for communicating with the backend.
- **db**: Database configuration, Prisma schema, and client.
- **ui**: Shared UI component library.
- **validators**: Shared Zod types and validation schemas.
- **logger**: Shared logging utilities.
- **locale**: Internationalization strings and utilities.
- **tsconfig**: Shared TypeScript configuration bases.

## Prerequisites

- **Node.js** (v20 or higher recommended)
- **pnpm** (Package manager)
- **PostgreSQL** (Database)

## Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/kazimoto5520/event-platform.git
    cd event-platform
    ```

2.  **Install dependencies**:
    From the root directory, install all project dependencies:

    ```bash
    pnpm install
    ```

3.  **Environment Setup**:
    You will need to configure environment variables for the applications.
    - Create a `.env` file in `apps/api` with `DATABASE_URL` and `JWT_SECRET`.
    - Create a `.env` file in `apps/mcp` with `API_BASE_URL`.
    - Refer to specific app `README.md` files for more details.

4.  **Database Setup**:
    initialize the database and push the schema:
    ```bash
    pnpm --filter db db:push
    ```

## Development

To start the development environment for all applications:

```bash
pnpm dev
```

This will start the web app (localhost:3000) and the API (localhost:4000).

To run specific applications, use the `pnpm --filter` command:

```bash
# Run only the web app
pnpm --filter web dev

# Run only the api
pnpm --filter api dev

# Run only the MCP server
pnpm --filter mcp dev
```

## Building

To build all apps and packages:

```bash
pnpm build
```

## Architecture Overview

The platform uses a centralized backend API (`apps/api`) that connects to a PostgreSQL database via Prisma (`packages/db`). Front-end applications like `apps/web` and `apps/mobile` interact with this API using the shared `packages/api-client`. The `apps/mcp` server acts as an alternative interface, allowing AI agents to perform actions on the platform using standard tools.
