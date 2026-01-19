import { z } from "zod";
import { scannerApi } from "@event-platform/api-client";
import { getPlatformClient } from "../lib/client";
import { zodToJsonSchema } from "zod-to-json-schema";

const schema = z.object({
  token: z.string().optional(),
  qrToken: z.string().min(5),
});

export function scanTicketTool() {
  return {
    name: "scanTicket",
    description: "Scan a ticket QR token and validate it",
    inputSchema: (schema),
    async run(input: unknown) {
      const data = schema.parse(input);

      const client = getPlatformClient({ token: data.token });
      const api = scannerApi(client);

      return api.scan({ qrToken: data.qrToken });
    },
  };
}
