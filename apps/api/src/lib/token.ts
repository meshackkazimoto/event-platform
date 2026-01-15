import crypto from "crypto";

export function generateQrToken(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function generateInviteCode(prefix: string): string {
  const code = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `${prefix}-${code}`;
}
