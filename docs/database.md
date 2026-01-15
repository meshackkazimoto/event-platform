# 🗄️ Database Design

This project uses **PostgreSQL + Prisma ORM**.

---

## Naming Conventions

- Tables: `snake_case`
- Prisma models: `PascalCase`
- Columns: `snake_case`
- IDs: `uuid`

Example:

```prisma
model InvitationScan {
  id        String @id @default(uuid())
  eventId   String @map("event_id")
}
```

---

## Key Models

- **User**
- **Event**
- **Invitation**
- **InvitationScan**

---

## Why Explicit Status Enums?

Enums prevent:

- Invalid transitions
- Magic strings
- Silent bugs

Example:

```prisma
enum InvitationStatus {
  CREATED
  SENT
  CHECKED_IN
  CANCELLED
  EXPIRED
}
```
