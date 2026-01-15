# 🔐 Authentication

Authentication is **JWT-based**.

---

## Token Contents

```json
{
  "userId": "uuid",
  "role": "ORGANIZER",
  "iat": 123456,
  "exp": 123456
}
```

---

## Auth Rules

- Tokens are stateless
- No sessions in DB
- Token required for all protected routes

---

## Common Errors

| Error            | Cause                   |
| ---------------- | ----------------------- |
| 401 Unauthorized | Missing / invalid token |
| Token expired    | exp exceeded            |
