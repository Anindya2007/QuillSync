## Purpose: Record why important choices were made. Future engineers — including your
teammates in week 6 — should understand the reasoning behind decisions, not just the
decisions themselves.

## Each decision record must include:
• The decision made
• The context that drove the decision
• The alternatives that were considered
• The reason this option was chosen
• The known trade-offs accepted

## Example decision record
- Decision: Use PostgreSQL as the primary database.
- Context: The product requires strong relational integrity between entities.
 Multiple features depend on complex joins and foreign key constraints.
- Alternatives considered:
 MongoDB — rejected because schema flexibility is not needed here
 SQLite — rejected due to concurrent write limitations at scale
- Trade-offs accepted:
 More complex horizontal scaling compared to document stores.
 Accepted because scale targets are achievable with vertical scaling and
 read replicas within the 8-week scope.