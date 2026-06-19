# API Documentation

## Purpose

Create contracts between frontend and backend.

This document is the single source of truth for all API interactions within QuillSync.

---

# Base URL

The API base URL depends on the deployment environment.

## Local Development

http://localhost:5000/api/v1

## Staging

https://staging-server-url/api/v1

## Production

https://production-server-url/api/v1

---

# Authentication

All protected endpoints require:

```http
Authorization: Bearer <jwt_token>
```

---

# Response Standards

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Human readable error",
  "code": "ERROR_CODE"
}
```

---

# Authentication APIs

## POST /auth/register

### Purpose

Create a new user account.

### Request Body

| Field    | Type   | Required | Description          |
| -------- | ------ | -------- | -------------------- |
| name     | string | Yes      | User display name    |
| email    | string | Yes      | Unique email address |
| password | string | Yes      | User password        |

### Response 201

| Field     | Type    | Description        |
| --------- | ------- | ------------------ |
| id        | uuid    | User ID            |
| name      | string  | User name          |
| email     | string  | User email         |
| createdAt | ISO8601 | Creation timestamp |

### Errors

| Code | Description          |
| ---- | -------------------- |
| 400  | Invalid request body |
| 409  | Email already exists |

---

## POST /auth/login

### Purpose

Authenticate user and issue access token.

### Request Body

| Field    | Type   | Required | Description      |
| -------- | ------ | -------- | ---------------- |
| email    | string | Yes      | Registered email |
| password | string | Yes      | User password    |

### Response 200

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Errors

| Code | Description         |
| ---- | ------------------- |
| 400  | Invalid request     |
| 401  | Invalid credentials |

---

## POST /auth/logout

### Purpose

Invalidate active session.

### Response 204

No content.

### Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Not authenticated |

---

# Workspace APIs

## POST /workspaces

### Purpose

Create a new workspace.

### Request Body

| Field       | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| name        | string | Yes      | Workspace name        |
| description | string | No       | Workspace description |

### Response 201

```json
{
  "id": "uuid",
  "name": "Engineering Wiki",
  "description": "Internal docs",
  "ownerId": "uuid",
  "createdAt": "2026-06-19T10:00:00Z"
}
```

### Errors

| Code | Description       |
| ---- | ----------------- |
| 400  | Missing name      |
| 401  | Not authenticated |

---

## GET /workspaces

### Purpose

Retrieve all workspaces accessible to the current user.

### Response 200

```json
[
  {
    "id": "uuid",
    "name": "Engineering Wiki",
    "role": "Owner"
  }
]
```

### Errors

| Code | Description       |
| ---- | ----------------- |
| 401  | Not authenticated |

---

## GET /workspaces/:workspaceId

### Purpose

Retrieve workspace details.

### Response 200

```json
{
  "id": "uuid",
  "name": "Engineering Wiki",
  "description": "Internal docs"
}
```

### Errors

| Code | Description         |
| ---- | ------------------- |
| 401  | Not authenticated   |
| 403  | Access denied       |
| 404  | Workspace not found |

---

## PATCH /workspaces/:workspaceId

### Purpose

Update workspace settings.

### Request Body

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| name        | string | No       |
| description | string | No       |

### Response 200

Updated workspace object.

### Errors

| Code | Description              |
| ---- | ------------------------ |
| 401  | Not authenticated        |
| 403  | Insufficient permissions |
| 404  | Workspace not found      |

---

## DELETE /workspaces/:workspaceId

### Purpose

Delete a workspace.

### Response 204

No content.

### Errors

| Code | Description           |
| ---- | --------------------- |
| 401  | Not authenticated     |
| 403  | Only owner can delete |
| 404  | Workspace not found   |

---

# Workspace Member APIs

## POST /workspaces/:workspaceId/invitations

### Purpose

Invite a member to a workspace.

### Request Body

| Field | Type   | Required |
| ----- | ------ | -------- |
| email | string | Yes      |
| role  | enum   | Yes      |

### Roles

```text
Owner
Admin
Editor
Viewer
```

### Response 201

```json
{
  "invitationId": "uuid",
  "email": "user@example.com",
  "role": "Editor"
}
```

### Errors

| Code | Description              |
| ---- | ------------------------ |
| 400  | Invalid email            |
| 403  | Insufficient permissions |
| 404  | Workspace not found      |

---

## GET /workspaces/:workspaceId/members

### Purpose

List all workspace members.

### Response 200

```json
[
  {
    "id": "uuid",
    "name": "John",
    "role": "Admin"
  }
]
```

### Errors

| Code | Description         |
| ---- | ------------------- |
| 403  | Access denied       |
| 404  | Workspace not found |

---

# Document APIs

## POST /workspaces/:workspaceId/documents

### Purpose

Create a new document.

### Request Body

| Field    | Type   | Required |
| -------- | ------ | -------- |
| title    | string | Yes      |
| parentId | uuid   | No       |
| folderId | uuid   | No       |
| content  | json   | No       |

### Response 201

```json
{
  "id": "uuid",
  "title": "System Architecture",
  "workspaceId": "uuid",
  "createdAt": "2026-06-19T10:00:00Z"
}
```

### Errors

| Code | Description              |
| ---- | ------------------------ |
| 400  | Invalid payload          |
| 403  | Insufficient permissions |
| 404  | Workspace not found      |

---

## GET /documents/:documentId

### Purpose

Retrieve document content.

### Response 200

```json
{
  "id": "uuid",
  "title": "System Architecture",
  "content": {},
  "status": "Draft"
}
```

### Errors

| Code | Description        |
| ---- | ------------------ |
| 403  | Access denied      |
| 404  | Document not found |

---

## PATCH /documents/:documentId

### Purpose

Update document metadata.

### Request Body

| Field    | Type   |
| -------- | ------ |
| title    | string |
| status   | enum   |
| category | string |

### Response 200

Updated document object.

### Errors

| Code | Description              |
| ---- | ------------------------ |
| 400  | Invalid request          |
| 403  | Insufficient permissions |
| 404  | Document not found       |

---

## DELETE /documents/:documentId

### Purpose

Delete a document.

### Response 204

No content.

### Errors

| Code | Description              |
| ---- | ------------------------ |
| 403  | Insufficient permissions |
| 404  | Document not found       |

---

# Comments APIs

## POST /documents/:documentId/comments

### Purpose

Create an inline comment.

### Request Body

| Field          | Type   | Required |
| -------------- | ------ | -------- |
| text           | string | Yes      |
| selectionRange | object | Yes      |

### Response 201

```json
{
  "id": "uuid",
  "text": "Please update this section"
}
```

### Errors

| Code | Description        |
| ---- | ------------------ |
| 400  | Invalid payload    |
| 404  | Document not found |

---

## PATCH /comments/:commentId/resolve

### Purpose

Mark comment thread as resolved.

### Response 200

```json
{
  "resolved": true
}
```

### Errors

| Code | Description       |
| ---- | ----------------- |
| 404  | Comment not found |

---

# Version History APIs

## GET /documents/:documentId/versions

### Purpose

Retrieve document version history.

### Response 200

```json
[
  {
    "versionId": "uuid",
    "createdAt": "2026-06-19T10:00:00Z",
    "author": "John Doe"
  }
]
```

### Errors

| Code | Description        |
| ---- | ------------------ |
| 404  | Document not found |

---

## POST /documents/:documentId/versions/:versionId/restore

### Purpose

Restore a previous version.

### Response 200

```json
{
  "restored": true
}
```

### Errors

| Code | Description       |
| ---- | ----------------- |
| 403  | Access denied     |
| 404  | Version not found |

---

# Search APIs

## GET /search

### Purpose

Search across workspace content.

### Query Parameters

| Parameter | Type   |
| --------- | ------ |
| q         | string |
| tag       | string |
| author    | string |
| status    | string |

### Example

```http
GET /search?q=authentication
```

### Response 200

```json
[
  {
    "documentId": "uuid",
    "title": "Authentication Design"
  }
]
```

### Errors

| Code | Description   |
| ---- | ------------- |
| 400  | Invalid query |

---

# Notification APIs

## GET /notifications

### Purpose

Retrieve notifications for current user.

### Response 200

```json
[
  {
    "id": "uuid",
    "type": "MENTION",
    "read": false
  }
]
```

---

## PATCH /notifications/:notificationId/read

### Purpose

Mark notification as read.

### Response 200

```json
{
  "read": true
}
```

### Errors

| Code | Description            |
| ---- | ---------------------- |
| 404  | Notification not found |

---

# Attachment APIs

## POST /uploads

### Purpose

Upload files and attachments.

### Request

Multipart Form Data

| Field | Type   |
| ----- | ------ |
| file  | binary |

### Response 201

```json
{
  "fileId": "uuid",
  "url": "https://cdn.quillsync.com/file.pdf"
}
```

### Errors

| Code | Description    |
| ---- | -------------- |
| 400  | Invalid file   |
| 413  | File too large |

---

# WebSocket Events

## Client → Server

```json
{
  "event": "document.join",
  "documentId": "uuid"
}
```

```json
{
  "event": "cursor.move",
  "position": 120
}
```

```json
{
  "event": "document.update",
  "operation": {}
}
```

---

## Server → Client

```json
{
  "event": "presence.update",
  "users": []
}
```

```json
{
  "event": "document.synced",
  "version": 42
}
```

```json
{
  "event": "document.updated",
  "operation": {}
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 413  | Payload Too Large     |
| 429  | Rate Limited          |
| 500  | Internal Server Error |

```
```
