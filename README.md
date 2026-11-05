# ÉVÉNTE — Catering & Décor Booking Platform

A responsive booking experience and modular-monolith starter for event catering and décor services.

## What is included

- Responsive React + TypeScript + Vite customer-facing website.
- Service discovery with Catering / Décor / Packages filters.
- Search, theme toggle, mobile navigation, smooth section navigation.
- Booking enquiry modal with date, event type, guest count, location and budget.
- Demo booking submission (client-side confirmation; no payment or persistence yet).
- Express + TypeScript API starter organized by business module.
- Prisma data model for users, service catalogues, bookings, quotations and payments.
- Architecture notes for extracting modules into services later.

## Quick start

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

Frontend runs at the Vite URL shown in the terminal (usually http://localhost:5173).

To run the API starter in another terminal:

```bash
npm run dev:api
```

The API starter listens on `http://localhost:4000`.

## Reference and design approach

The UI takes inspiration from the interaction patterns in [bedimcode/responsive-book-website](https://github.com/bedimcode/responsive-book-website):
- mobile-first responsive layout
- fixed/sticky navigation
- smooth scrolling and reveal animations
- search and account modals
- light/dark theme toggle

The result is an original catering-and-décor design rather than a copy of the reference site's assets or branding.

## Assets

The prototype uses curated Unsplash image URLs for event photography. They are loaded remotely at runtime, so an internet connection is needed to display the photographs. Replace these with licensed local assets in `apps/web/public/images/` before production. Keep image dimensions optimized (AVIF/WebP), provide alt text, and confirm usage rights.

## Modular monolith boundaries

The API is one deployable application, but each domain owns its routes, services and persistence boundary:

- `auth` — authentication and sessions
- `catalog` — catering, décor and package listings
- `bookings` — booking lifecycle and availability
- `quotations` — quote creation and approval
- `payments` — payment intents and reconciliation
- `customers` — customer profiles
- `reviews` — feedback and ratings

Rules:
1. A module must not import another module's Prisma models or repository implementation.
2. Cross-module operations go through exported application services or internal domain events.
3. Keep module contracts transport-agnostic so they can later be exposed through HTTP or messaging.
4. Use one PostgreSQL database initially, with module-owned tables and migrations.
5. Avoid shared mutable business logic in `shared/`; keep it for technical infrastructure only.

## Suggested production evolution

1. Add authentication, RBAC and server-side validation.
2. Add PostgreSQL + Prisma migrations and seed data.
3. Add booking availability rules and transactional booking creation.
4. Integrate a South African payment provider (for example PayFast) behind a `PaymentGateway` interface.
5. Add email/SMS notifications using an outbox pattern.
6. Add object storage for service galleries and customer uploads.
7. Add observability, audit logs, rate limits, backups and CI/CD.
8. Extract a module only when independent scaling, deployment cadence or team ownership justifies it.

### Microservice extraction path

| Modular monolith module | Future service | Extraction trigger |
|---|---|---|
| Identity | Identity service | Separate identity/security ownership |
| Catalog | Catalog service | High read traffic / independent catalogue |
| Bookings | Booking service | Availability and booking throughput |
| Payments | Payment service | Compliance and payment isolation |
| Notifications | Notification worker/service | Queue volume and independent retries |

Use the transactional outbox + idempotent consumers before introducing a message broker. Do not start with distributed transactions or a service-per-table design.

## Environment

Create `apps/api/.env` from `.env.example` when wiring persistence:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/evente?schema=public"
JWT_ACCESS_SECRET="replace-with-a-long-random-secret"
```

The included API routes are starter contracts only. The demo frontend currently submits locally and does not persist bookings.
