# Event Platform Web App

This is the main web application for the Event Platform, built with [Next.js](https://nextjs.org). It serves as the user interface for event organizers and attendees.

## Features

- **Dashboard**: A comprehensive dashboard for event organizers to manage events, attendees, and tickets.
- **Event Management**: Create, edit, and delete events.
- **Authentication**: Secure user authentication and management.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Localization**: Support for multiple languages using `@event-platform/locale`.

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: Tanstack Query (React Query)
- **Form Handling**: React Hook Form, Zod
- **Icons**: Lucide React
- **Workspace Packages**:
  - `@event-platform/api-client`: For API communication.
  - `@event-platform/ui`: Shared UI components.
  - `@event-platform/validators`: Shared validation schemas.

## Setup

1.  **Install dependencies**:
    From the root of the monorepo:

    ```bash
    pnpm install
    ```

2.  **Configuration**:
    Ensure you have the necessary environment variables set up. Refer to `.env.example` (if available) or ask the team for the required keys.

## Running the App

### Development Mode

To run the web application in development mode:

```bash
pnpm --filter web dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To build the application for production:

```bash
pnpm --filter web build
```

To start the production server:

```bash
pnpm --filter web start
```

## Linting

To lint the code:

```bash
pnpm --filter web lint
```
