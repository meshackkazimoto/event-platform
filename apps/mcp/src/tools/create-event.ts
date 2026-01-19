import { z } from "zod";
import { eventsApi } from "@event-platform/api-client";
import { getPlatformClient } from "../lib/client";
import { zodToJsonSchema } from "zod-to-json-schema";

const schema = z.object({
  token: z.string().optional(),
  title: z.string().min(2),
  venue: z.string().min(2),
  eventDate: z.string(),
  allowReentry: z.boolean().optional(),
  entryCutoffTime: z.string().nullable().optional(),
});

export function createEventTool() {
  return {
    name: "createEvent",
    description: "Create a new event",
    inputSchema: (schema),
    async run(input: unknown) {
      const data = schema.parse(input);

      const client = getPlatformClient({ token: data.token });
      const api = eventsApi(client);

      return api.create({
        title: data.title,
        venue: data.venue,
        eventDate: data.eventDate,
        allowReentry: data.allowReentry ?? false,
        entryCutoffTime: data.entryCutoffTime ?? null,
      });
    },
  };
}
