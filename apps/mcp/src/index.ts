import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createEventTool } from "./tools/create-event";
import { createInvitationsBulkTool } from "./tools/create-invitations-bulk";
import { scanTicketTool } from "./tools/scan-ticket";

async function main() {
  // IMPORTANT: use stderr for logs
  console.error("[mcp] MCP Server running...");

  const server = new McpServer({
    name: "event-platform-mcp",
    version: "1.0.0",
  });

  const tools = [
    createEventTool(),
    createInvitationsBulkTool(),
    scanTicketTool(),
  ];

  for (const tool of tools) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      async (input: any) => {
        const result = await tool.run(input);

        console.error(`[mcp] Tool ${tool.name} called`, result);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      },
    );
  }

  await server.connect(new StdioServerTransport());
}

main().catch((err) => {
  console.error("[mcp] MCP failed to start:", err);
  process.exit(1);
});
