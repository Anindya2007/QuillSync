# Contributing to QuillSync

Thank you for contributing to QuillSync!

This document explains how to set up the project, create branches, submit pull requests, and follow our engineering standards.

Please read this guide before making your first contribution.

---

# Development Philosophy

QuillSync is built collaboratively.

We value:

* Clean code
* Clear documentation
* Small pull requests
* Consistent architecture
* Respectful communication
* Learning through contribution

Every contribution should improve the project while keeping the codebase maintainable.

---

# Prerequisites

Before contributing, ensure you have:

* Git
* Node.js (v20+)
* npm (v10+)
* MongoDB
* GitHub Account

---

# Project Setup

## 1. Fork Repository

Click **Fork** on GitHub.

---

## 2. Clone Repository

```bash
git clone https://github.com/<your-username>/quillsync.git
cd quillsync
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create:

```bash
.env
```

Using:

```bash
.env.example
```

---

## 5. Start Development Servers

Frontend:

```bash
npm run dev:web
```

Backend:

```bash
npm run dev:server
```

---

# Branch Strategy

Never commit directly to:

```text
main
develop
```

---

## Branch Types

### Feature

```text
feature/document-editor
feature/workspace-invites
feature/search-api
```

Used for:

* New functionality
* Enhancements

---

### Bug Fix

```text
bugfix/login-validation
bugfix/socket-reconnect
```

Used for:

* Defect resolution
* Unexpected behavior fixes

---

### Hotfix

```text
hotfix/security-patch
hotfix/production-crash
```

Used only for:

* Critical production issues

---

# Development Workflow

## Step 1

Update local develop branch.

```bash
git checkout develop
git pull origin develop
```

---

## Step 2

Create a new branch.

```bash
git checkout -b feature/your-feature-name
```

---

## Step 3

Implement your changes.

---

## Step 4

Run checks.

```bash
npm run lint

npm run build
```

---

## Step 5

Commit changes.

```bash
git commit -m "feat: add workspace invitation system"
```

---

## Step 6

Push branch.

```bash
git push origin feature/your-feature-name
```

---

## Step 7

Create Pull Request.

Target branch:

```text
develop
```

---

# Commit Message Convention

We follow Conventional Commits.

---

## Features

```text
feat: add document version history
```

---

## Bug Fixes

```text
fix: resolve duplicate notification issue
```

---

## Refactoring

```text
refactor: simplify workspace service
```

---

## Documentation

```text
docs: update API documentation
```

---

## Tests

```text
test: add authentication service tests
```

---

## Chores

```text
chore: update dependencies
```

---

# Pull Request Guidelines

Every Pull Request must:

* Solve one specific problem
* Be easy to review
* Include clear descriptions
* Pass CI checks

---

## PR Title Examples

Good:

```text
feat: implement workspace creation API
```

```text
fix: prevent duplicate invitations
```

Bad:

```text
changes
```

```text
updated code
```

---

# Code Review Process

Every Pull Request requires:

* At least one review
* Passing CI checks
* No merge conflicts

Reviewers may request:

* Refactoring
* Additional tests
* Documentation updates

Address feedback before requesting re-review.

---

# Coding Standards

## General

* Write readable code.
* Avoid unnecessary complexity.
* Prefer small functions.
* Remove dead code.

---

## Naming

### Variables

```ts
workspaceId
documentTitle
userRole
```

### Components

```tsx
WorkspaceCard.tsx
DocumentEditor.tsx
NotificationPanel.tsx
```

### Services

```ts
workspace.service.ts
document.service.ts
auth.service.ts
```

---

# Frontend Guidelines

## Components

Keep components focused.

Avoid:

```text
1000+ line components
```

Prefer:

```text
Small reusable components
```

---

## State Management

Keep state local whenever possible.

Promote state only when required.

---

## Styling

Use:

```text
TailwindCSS
```

Avoid:

```text
Inline styles
```

unless necessary.

---

# Backend Guidelines

## Controllers

Controllers should:

* Validate requests
* Call services
* Return responses

Avoid business logic inside controllers.

---

## Services

Services should contain:

* Business rules
* Application logic

---

## Database Access

Repositories should handle:

* MongoDB queries
* Data persistence

Keep database logic out of controllers.

---

# Documentation Requirements

Update documentation whenever you modify:

* APIs
* Database schema
* Architecture
* Workflow behavior

Relevant files:

```text
docs/api/API.md

docs/database/DATABASE.md

docs/architecture/ARCHITECTURE.md

docs/decisions/DECISIONS.md
```

---

# Issues

Before creating an issue:

* Search existing issues
* Avoid duplicates
* Provide reproduction steps

Good issue reports contain:

* Expected behavior
* Actual behavior
* Screenshots
* Error logs

---

# What Not To Do

Do NOT:

* Commit secrets
* Commit .env files
* Push directly to main
* Merge your own PR without approval
* Ignore CI failures
* Introduce breaking changes without discussion

---

# Need Help?

If you're stuck:

1. Check project documentation.
2. Search existing issues.
3. Ask in the project discussion whatsapp channel.
4. Contact a mentor or team lead.

---

# Thank You

Every contribution helps make QuillSync better.

Whether you're fixing a typo, improving documentation, or building a major feature, your effort is appreciated.
