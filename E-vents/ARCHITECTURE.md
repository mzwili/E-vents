# Architecture Decision Record — Modular Monolith

## Decision
Start with one API deployment and one PostgreSQL database. Enforce module boundaries in code rather than deploying each domain independently.

## Module contract example
`bookings` owns booking state transitions. It may request a quotation through the quotations application service, but it must not import quotation repository internals. `payments` owns provider integration and payment state; booking confirmation should react to a `PaymentSucceeded` domain event or an explicit application-service result.

## Internal event examples
- `BookingEnquiryCreated`
- `QuotationIssued`
- `QuotationAccepted`
- `PaymentSucceeded`
- `BookingConfirmed`
- `BookingCancelled`

For reliable event publication, write the domain change and outbox record in the same database transaction. A background dispatcher publishes outbox records. Consumers must be idempotent.

## Extraction checklist
- Stable API/event contract documented
- Module owns its tables and migrations
- No cross-module database joins in application logic
- No shared ORM model imports
- Outbox/inbox and idempotency implemented
- Tracing, metrics, retries and dead-letter handling available
- Data ownership and backfill strategy agreed
- Independent deployment and rollback tested

Do not extract modules solely because they exist. Extract when scaling, release autonomy, compliance or team ownership provides a measurable benefit.
