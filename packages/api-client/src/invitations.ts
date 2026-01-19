import type { AxiosInstance } from "axios";
import {
  createInvitationsBulkRequestSchema,
  invitationResponseSchema,
  type CreateInvitationsBulkRequestInput,
  type InvitationResponse,
} from "@event-platform/validators";

export function invitationsApi(client: AxiosInstance) {
  return {
    async createBulk(
      eventId: string,
      payload: CreateInvitationsBulkRequestInput,
    ): Promise<InvitationResponse[]> {
      const body = createInvitationsBulkRequestSchema.parse(payload);
      const res = await client.post(
        `/api/events/${eventId}/invitations/bulk`,
        body,
      );
      return invitationResponseSchema.array().parse(res.data);
    },

    async listByEvent(eventId: string): Promise<InvitationResponse[]> {
      const res = await client.get(`/api/events/${eventId}/invitations`);
      return invitationResponseSchema.array().parse(res.data);
    },

    async getById(invitationId: string): Promise<InvitationResponse> {
      const res = await client.get(`/api/invitations/${invitationId}`);
      return invitationResponseSchema.parse(res.data);
    },

    async send(invitationId: string): Promise<InvitationResponse> {
      const res = await client.post(`/api/invitations/${invitationId}/send`);
      return invitationResponseSchema.parse(res.data);
    },
  };
}
