import jwt, { JsonWebTokenError } from "jsonwebtoken";

export type AuthPayload = {
  userId: string;
  role: "ADMIN" | "ORGANIZER" | "SCANNER";
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in environment variables");
  return secret;
}

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload {
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    // jwt.verify can return string | object, so validate shape
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("userId" in decoded) ||
      !("role" in decoded)
    ) {
      throw new Error("Unauthorized");
    }

    return decoded as AuthPayload;
  } catch (err) {
    // any JWT parsing/validation error becomes Unauthorized
    if (err instanceof JsonWebTokenError) {
      throw new Error("Unauthorized");
    }
    throw err;
  }
}
