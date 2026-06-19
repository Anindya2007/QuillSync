# Database Design Documentation

## Purpose

This document defines the data architecture for QuillSync.

The objective is to explain how information is stored, organized, accessed, and scaled throughout the system.

This document must be finalized before implementation begins because all backend services, APIs, permissions, collaboration systems, and search capabilities depend on the underlying data model.

---

# Database Technology

## Primary Database

MongoDB

### Why MongoDB?

QuillSync stores highly flexible document content.

Documents may contain:

* Rich text
* Headings
* Lists
* Checklists
* Tables
* Images
* Embedded content
* Future editor blocks

Because document structures evolve over time, a document-oriented database is more suitable than a rigid relational schema.

MongoDB also provides:

* Horizontal scalability
* Flexible schemas
* Fast document retrieval
* Atlas Search support
* Efficient indexing
* High write throughput for collaboration workloads

---

# Core Entities

The system revolves around the following entities.

| Entity           | Purpose                 |
| ---------------- | ----------------------- |
| User             | Platform account        |
| Workspace        | Collaboration boundary  |
| Workspace Member | Workspace permissions   |
| Invitation       | Workspace onboarding    |
| Folder           | Document organization   |
| Document         | Knowledge container     |
| Tag              | Document classification |
| Comment          | Discussion system       |
| Version          | Historical recovery     |
| Attachment       | Uploaded resources      |
| Notification     | User activity alerts    |

---

# Entity Details

## User

Represents a registered account.

A user may:

* Create workspaces
* Join multiple workspaces
* Create documents
* Edit documents
* Leave comments
* Receive notifications

### Key Attributes

* Name
* Email
* Password Hash
* Profile Photo
* Verification Status

### Cardinality

```text
One User
    ├── Owns Many Workspaces
    ├── Member Of Many Workspaces
    ├── Creates Many Documents
    ├── Creates Many Comments
    └── Receives Many Notifications
```

---

## Workspace

A workspace is the primary collaboration container.

Everything belongs to a workspace.

Examples:

* Engineering Wiki
* Product Documentation
* Research Repository

### Contains

* Members
* Documents
* Folders
* Tags
* Categories

### Cardinality

```text
One Workspace
    ├── Many Members
    ├── Many Documents
    ├── Many Folders
    ├── Many Tags
    └── Many Invitations
```

---

## Workspace Member

Defines permissions.

A user can belong to many workspaces.

Roles:

* Owner
* Admin
* Editor
* Viewer

Purpose:

* Access control
* Authorization
* Ownership management

---

## Folder

Provides hierarchical organization.

Supports:

```text
Workspace
 ├── Folder A
 │    ├── Folder B
 │    └── Folder C
```

Folders may contain:

* Documents
* Child folders

---

## Document

The most important entity.

Documents are the core knowledge objects.

A document stores:

* Title
* Rich editor content
* Metadata
* Status
* Tags
* Version references

### Supported States

```text
Draft
Review
Published
Archived
```

### Hierarchy

Documents can contain nested pages.

Example:

```text
Engineering Wiki
 ├── Backend
 │    ├── Authentication
 │    └── Database Design
```

---

## Comment

Supports collaboration.

Comments are attached to specific document locations.

Features:

* Inline comments
* Threaded replies
* Mentions
* Resolution status

---

## Version

Stores immutable snapshots.

Purpose:

* Recovery
* Auditability
* Change history

A version can never be modified.

New edits create new versions.

---

## Attachment

Represents uploaded resources.

Examples:

* Images
* PDFs
* ZIP files
* Documents

Files should be stored in object storage.

Database stores metadata only.

---

## Notification

Tracks important activity.

Examples:

* Mentions
* Comments
* Invitations
* Shares
* Restores

---

# Relationships

## User ↔ Workspace

Many-to-Many

Reason:

Users can join multiple workspaces.

Workspaces contain multiple users.

Implemented using:

```text
workspace_members
```

---

## Workspace ↔ Document

One-to-Many

```text
One Workspace
    → Many Documents
```

A document cannot exist outside a workspace.

---

## Workspace ↔ Folder

One-to-Many

```text
One Workspace
    → Many Folders
```

---

## Folder ↔ Folder

Self Relationship

```text
Folder
 └── Child Folder
      └── Child Folder
```

Supports unlimited nesting.

---

## Folder ↔ Document

One-to-Many

```text
Folder
 └── Many Documents
```

---

## Document ↔ Document

Self Relationship

Supports nested pages.

```text
Document
 └── Child Document
```

---

## Document ↔ Comment

One-to-Many

```text
Document
 └── Many Comments
```

---

## Document ↔ Version

One-to-Many

```text
Document
 └── Many Versions
```

---

## Document ↔ Attachment

One-to-Many

```text
Document
 └── Many Attachments
```

---

# Data Flow

## Workspace Creation

### Create

* Workspace
* WorkspaceMember (Owner)

### Read

* User

### Update

None

### Delete

None

---

## Document Creation

### Create

* Document
* Initial Version

### Read

* Workspace
* Folder

### Update

None

### Delete

None

---

## Real-Time Editing

### Read

* Document

### Update

* Document content

### Create

* New Version snapshot

### Broadcast

* Collaboration events via WebSocket

---

## Comment Workflow

### Create

* Comment

### Read

* Document

### Create

* Notification

---

## Version Restore Workflow

### Read

* Historical Version

### Update

* Current Document

### Create

* New Version Snapshot

### Create

* Notifications

---

# Scaling Considerations

The PRD targets:

* 1,000,000+ users
* 1,000,000+ documents
* Thousands of operations per minute
* 25+ simultaneous editors per document

The database design must support these targets.

---

## Document Scaling

Documents should store editor content as structured JSON blocks.

Benefits:

* Partial updates
* Easier rendering
* Future editor support

---

## Version Scaling

Versions grow rapidly.

Store in a dedicated collection.

Never embed versions inside documents.

Reason:

Large documents may generate thousands of versions.

---

## Search Scaling

Use MongoDB Atlas Search.

Index:

* Titles
* Content
* Tags
* Comments

---

## Attachment Scaling

Files should never be stored in MongoDB.

Store only metadata.

Use:

* AWS S3
* Cloudflare R2
* MinIO

---

## Collaboration Scaling

Presence data should not be stored permanently.

Use:

* Redis
* WebSocket server memory

Avoid writing cursor movements to MongoDB.

---

## Future Growth

The schema must support future additions without breaking existing functionality.

Potential future features:

* AI assistants
* Document sharing links
* Public workspaces
* Analytics
* Activity feeds
* Templates
* Mobile applications
* Enterprise audit logs

The data model should evolve through additive changes rather than destructive schema rewrites.

```
```
