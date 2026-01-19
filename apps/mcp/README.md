# Event Platform MCP Server

This is the Model Context Protocol (MCP) server for the Event Platform. It exposes various tools that allow LLMs or other MCP clients to interact with the Event Platform API.

## Features

This server provides the following tools:

- **createEvent**: Create a new event.
- **createInvitationsBulk**: Create invitations in bulk for a specific event.
- **scanTicket**: Scan a ticket QR token and validate it.

## Prerequisites

- Node.js (v20 or later recommended)
- `pnpm`
- The Event Platform API running (usually on `http://localhost:4000`)

## Configuration

Create a `.env` file in the `apps/mcp` directory (or ensure the root `.env` is loaded) with the following variable:

```env
API_BASE_URL=http://localhost:4000/api
```

## Setup

1.  **Install dependencies**:
    From the root of the monorepo:

    ```bash
    pnpm install
    ```

2.  **Build the project**:
    ```bash
    pnpm --filter mcp build
    ```

## Running the Server

### Development Mode

To run the server in development mode with watch support:

```bash
pnpm --filter mcp dev
```

### Production Mode

To run the server directly (this communicates via Stdio):

```bash
pnpm --filter mcp mcp
```

## Using with MCP Inspector

You can use the `@modelcontextprotocol/inspector` to test the tools interactively.

```bash
pnpm dlx @modelcontextprotocol/inspector
```

This will start the MCP inspector and launch this server as a child process. You can then use the web interface to discover and call tools.

## Development

The main entry point is `src/index.ts`. Tools are defined in the `src/tools/` directory.

To add a new tool:

1.  Create a new file in `src/tools/`.
2.  Define the tool name, description, schema, and implementation.
3.  Export the tool factory function.
4.  Register the tool in `src/index.ts`.
