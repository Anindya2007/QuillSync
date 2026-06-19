# System Architecture

## Purpose

This document describes the high-level architecture of QuillSync.

It explains how the system is structured, how components communicate, and how user actions move through the platform.

The goal is to provide a shared understanding of the system before implementation begins.

Detailed technical reasoning for architectural decisions can be found in `DECISIONS.md`.

---

# System Overview

QuillSync is a collaborative knowledge management and documentation platform that allows individuals, teams, and organizations to create, organize, search, and collaboratively edit documents within shared workspaces.

The system combines traditional document management with real-time collaboration capabilities, enabling multiple users to work simultaneously on the same content while maintaining consistency, version history, permissions, and reliability.

The architecture is designed to support:

* Large numbers of documents
* Real-time collaboration
* Offline editing
* Version recovery
* Fast search
* Scalable workspace management

---

# High-Level Architecture

```text id="wdu4z6"
┌──────────────────────────┐
│      Frontend (Web)      │
└────────────┬─────────────┘
             │
     REST API / WebSocket
             │
┌────────────▼─────────────┐
│      Backend API         │
└───────┬─────────┬────────┘
        │         │
        │         │
        │         ▼
        │   Real-Time Service
        │   (WebSocket Layer)
        │
        ▼
┌──────────────────────────┐
│       MongoDB            │
└──────────────────────────┘

        ▲
        │
        ▼

┌──────────────────────────┐
│     File Storage         │
│ (S3 / Cloudflare R2)     │
└──────────────────────────┘

        ▲
        │
        ▼

┌──────────────────────────┐
│     Notification Layer   │
└──────────────────────────┘
```

---

# Component Map

## Frontend Application

### Responsibilities

The frontend provides the user interface for all user interactions.

Key responsibilities:

* Authentication
* Workspace management
* Document editing
* Folder navigation
* Search experience
* Commenting
* Notifications
* Real-time collaboration UI

### Major Modules

* Authentication Module
* Workspace Module
* Document Editor
* Search Module
* Comments Module
* Notification Center
* Settings Module

### Technology

Recommended:

```text id="4uzdd0"
React
TypeScript
Tailwind CSS
```

---

## Backend API

### Responsibilities

The backend acts as the central business logic layer.

It validates requests, enforces permissions, manages data access, and coordinates collaboration.

Key responsibilities:

* Authentication
* Authorization
* Workspace management
* Document management
* Version history
* Search
* Notifications
* File management

### Major Services

```text id="bx0n7u"
Auth Service

Workspace Service

Document Service

Folder Service

Comment Service

Version Service

Search Service

Notification Service
```

### Technology

Recommended:

```text id="9eh8zx"
Node.js

Express.js
```

---

## Database Layer

### Responsibilities

Stores persistent application data.

Key responsibilities:

* User data
* Workspace data
* Document content
* Metadata
* Version history
* Comments
* Notifications

### Database Choice

```text id="5q7hmg"
MongoDB
```

### Why MongoDB

* Flexible document structure
* Rich editor content storage
* Scalable architecture
* Efficient document retrieval
* Atlas Search support

---

## Real-Time Collaboration Service

### Responsibilities

Provides live collaboration capabilities.

Key responsibilities:

* Presence tracking
* Cursor synchronization
* Live content updates
* Conflict resolution
* Connection management

### Managed Data

* Active users
* Active documents
* Cursor positions
* Collaboration sessions

### Technology

Recommended:

```text id="5j3qvs"
Socket.IO
```

or

```text id="gdywyw"
Native WebSockets
```

---

## File Storage Service

### Responsibilities

Stores uploaded files and attachments.

Examples:

* Images
* PDFs
* ZIP files
* Documents

### Important Rule

Files should not be stored in MongoDB.

Only metadata should be stored in the database.

### Recommended Providers

```text id="l1h9y4"
AWS S3

Cloudflare R2

MinIO
```

---

## Notification Layer

### Responsibilities

Generates and delivers user notifications.

Examples:

* Mentions
* Comments
* Invitations
* Workspace updates
* Version restores

Notifications are stored in MongoDB and delivered through API polling or WebSockets.

---

# Communication Patterns

Different system components communicate using different patterns depending on the use case.

---

## REST API

### Used For

Standard CRUD operations.

Examples:

* Login
* Registration
* Workspace creation
* Document creation
* Search
* Comments
* Notifications

### Why REST

REST is simple, predictable, and well-suited for request-response operations.

Example:

```text id="tmcl9j"
Create Workspace

Client
  → POST /workspaces

Server
  → Returns Workspace Data
```

---

## WebSockets

### Used For

Real-time collaboration features.

Examples:

* Live editing
* Cursor movement
* Presence indicators
* Instant notifications

### Why WebSockets

Collaboration requires low-latency bidirectional communication.

Polling would be inefficient and introduce delays.

Example:

```text id="9vr5jm"
User A edits document
        ↓
WebSocket Event
        ↓
Server receives change
        ↓
Broadcast to all active users
        ↓
Other clients update instantly
```

---

## Event-Driven Processing

### Used For

Background actions that should not block user requests.

Examples:

* Notification generation
* Version creation
* Search indexing
* Activity logging

Example:

```text id="0m27xe"
Comment Created
       ↓
Event Generated
       ↓
Notification Created
       ↓
Mention Alerts Sent
```

---

# Key Decisions

The rationale behind architectural decisions is documented separately.

See:

```text id="5vh7wi"
DECISIONS.md
```

Examples of decisions:

* Why MongoDB was selected
* Why WebSockets are required
* Versioning strategy
* Search architecture
* Permission model
* File storage approach

---

# Data Flow

## User Login Flow

```text id="7xvxxo"
User
  ↓
Frontend
  ↓
POST /auth/login
  ↓
Backend
  ↓
MongoDB
  ↓
JWT Generated
  ↓
Frontend Stores Token
  ↓
Authenticated Session Created
```

---

## Document Creation Flow

```text id="l0x1kj"
User Creates Document
          ↓
Frontend Sends Request
          ↓
Backend Validates Permissions
          ↓
Document Stored
          ↓
Initial Version Created
          ↓
Search Index Updated
          ↓
Response Returned
```

---

## Real-Time Editing Flow

```text id="ndj6ho"
User Types Content
         ↓
Editor Generates Change
         ↓
WebSocket Event Sent
         ↓
Collaboration Service Receives Update
         ↓
Conflict Resolution Applied
         ↓
Document Updated
         ↓
Broadcast To Connected Users
         ↓
All Editors Receive Update
```

---

## Comment Flow

```text id="z8z7q7"
User Creates Comment
          ↓
Backend Stores Comment
          ↓
Notification Event Generated
          ↓
Mentioned Users Identified
          ↓
Notifications Created
          ↓
Users Receive Updates
```

---

## Search Flow

```text id="4bc9b4"
User Enters Query
         ↓
Frontend Calls Search API
         ↓
Search Service Executes Query
         ↓
MongoDB Atlas Search
         ↓
Ranked Results Returned
         ↓
Frontend Displays Results
```

---

## Version Recovery Flow

```text id="d2fhd6"
User Opens History
        ↓
Backend Fetches Versions
        ↓
User Selects Version
        ↓
Restore Request Sent
        ↓
Current Version Archived
        ↓
Selected Version Restored
        ↓
New Version Snapshot Created
```

---

# Scalability Strategy

The architecture is designed to support the scale targets defined in the PRD.

Target Scale:

```text id="3m4nj6"
1,000,000+ Users

1,000,000+ Documents

100,000+ Monthly Active Users

25+ Simultaneous Editors Per Document

Thousands Of Operations Per Minute
```

Key scalability principles:

* Stateless backend services
* Indexed database queries
* Dedicated version storage
* External file storage
* WebSocket-based collaboration
* Horizontal backend scaling
* Search-optimized architecture

---

# Future Architecture Extensions

The architecture should support future enhancements without major redesign.

Potential future additions:

* AI assistants
* Public document sharing
* Mobile applications
* Desktop applications
* Third-party integrations
* Analytics systems
* Audit logging
* Enterprise features

The system should evolve through additional services and modules rather than disruptive architectural changes.

```
```
