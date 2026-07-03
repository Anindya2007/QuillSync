# QuillSync Backend (Server)

This directory contains the Node.js backend application for QuillSync.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB (with Prisma ORM)
- **Real-Time:** Socket.IO
- **Authentication:** Cookie-based JWT (using HTTP-Only cookies for `accessToken` and `refreshToken`) or Authorization Bearer header.

## Development

To start the development server for the backend, run the following command from the root of the repository:

```bash
npm run dev:server
```

## Folder Structure
- `src/controllers/`: Request handlers for REST endpoints (e.g., `auth.controller.ts`).
- `src/services/`: Core business logic and database interactions (e.g., `auth.service.ts`).
- `src/routes/`: Express route definitions (e.g., `auth.routes.ts`).
- `src/middlewares/`: Express middlewares (e.g., `auth.middleware.ts` for JWT verification).
- `src/lib/`: Shared clients and libraries (e.g., Prisma client, JWT utilities).
- `src/utils/`: Common helpers and utility functions (e.g., password hashing).
- `src/config/`: App configuration (e.g., environment variables loading).
- `prisma/`: Prisma schema configuration (`schema.prisma`) and configuration (`prisma.config.ts`).
