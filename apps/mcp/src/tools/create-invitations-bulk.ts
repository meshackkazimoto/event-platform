import { z } from "zod";
import { invitationsApi } from "@event-platform/api-client";
import { getPlatformClient } from "../lib/client";
import { zodToJsonSchema } from "zod-to-json-schema";

const schema = z.object({
  token: z.string().optional(),
  eventId: z.string().min(1),
  invitations: z.array(
    z.object({
      guestName: z.string().optional(),
      guestPhone: z.string().min(5),
      ticketType: z.enum(["REGULAR", "VIP", "STAFF", "FREE", "SINGLE", "DOUBLE"]),
      price: z.number().optional(),
      maxEntries: z.number().int().positive().optional(),
    })
  ),
});

export function createInvitationsBulkTool() {
  return {
    name: "createInvitationsBulk",
    description: "Create invitations in bulk for an event",
    inputSchema: (schema),
    async run(input: unknown) {
      const data = schema.parse(input);

      const client = getPlatformClient({ token: data.token });
      const api = invitationsApi(client);

      return api.createBulk(data.eventId, {
        invitations: data.invitations,
      });
    },
  };
}
