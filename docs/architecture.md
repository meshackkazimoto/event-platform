# 🏗️ System Architecture

The Event Platform is a **monorepo-based system** with clear separation of concerns.

---

## High-Level Components

```
Client (Web / Mobile)
        |
        v
Next.js API (App Router)
        |
        v
   Prisma ORM
        |
        v
   PostgreSQL
```

---

## Roles & Responsibilities

| Component   | Responsibility                 |
| ----------- | ------------------------------ |
| Web App     | Event & invitation management  |
| Scanner App | QR code validation             |
| API         | Business logic & authorization |
| Database    | Source of truth                |

---

## Key Principles

- **Backend is authoritative**
- **No client-side trust**
- **Transactions for critical flows**
- **Explicit state machines**
