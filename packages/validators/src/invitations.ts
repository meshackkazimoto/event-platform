import { z } from "zod";

export const ticketTypeSchema = z.enum([
  "REGULAR",
  "VIP",
  "STAFF",
  "FREE",
  "SINGLE",
  "DOUBLE",
]);

export const invitationStatusSchema = z.enum([
  "CREATED",
  "SENT",
  "CHECKED_IN",
  "CANCELLED",
  "EXPIRED",
]);

export const createInvitationSchema = z.object({
  guestName: z.string().min(1).optional(),
  guestPhone: z.string().min(5),
  ticketType: ticketTypeSchema,
  price: z.number().optional().default(0),
  maxEntries: z.number().int().positive().optional().default(1),
});

export const createInvitationsBulkRequestSchema = z.object({
  invitations: z.array(createInvitationSchema).min(1),
});

export type CreateInvitationsBulkRequest = z.infer<
  typeof createInvitationsBulkRequestSchema
>;

export type CreateInvitationsBulkRequestInput = z.input<
  typeof createInvitationsBulkRequestSchema
>;

export const invitationResponseSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  guestName: z.string().nullable().optional(),
  guestPhone: z.string(),
  ticketType: ticketTypeSchema,
  price: z.number(),
  inviteCode: z.string(),
  qrToken: z.string(),
  status: invitationStatusSchema,
  maxEntries: z.number().int(),
  entriesUsed: z.number().int(),
  sentAt: z.string().nullable(),
  checkedInAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type InvitationResponse = z.infer<typeof invitationResponseSchema>;
