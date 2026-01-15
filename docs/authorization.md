# 🛂 Authorization (RBAC)

This project uses **strict role-based access control**.

---

## Roles

| Role      | Permissions          |
| --------- | -------------------- |
| ADMIN     | Everything           |
| ORGANIZER | Events & invitations |
| SCANNER   | Scan validation only |

---

## Enforcement Pattern

```ts
const user = requireAuth(req);
requireRole(user, ["SCANNER"]);
```

---

## Why Strict?

- Security > convenience
- Scanners must never create or modify data
