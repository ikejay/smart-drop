# SmartDrop

SmartDrop is a Next.js App Router dropshipping storefront and admin dashboard. It is designed around a multi-supplier catalog, guest checkout, Stripe payments, Prisma-backed product and order data, and supplier fulfilment tracking.

## Features

- Storefront homepage with featured products, category browsing, trust badges, and supplier messaging.
- Product listing pages with category, search, and price sorting support.
- Product detail, cart, checkout, and order pages for the customer flow.
- Zustand cart state with multi-supplier warnings for orders that may ship separately.
- Admin dashboard routes for KPIs, orders, products, and supplier configuration.
- Prisma data model for users, products, variants, orders, fulfilments, and order items.
- Supplier adapter structure for AliExpress, Spocket, CJ Dropshipping, and Printful.
- Stripe Checkout and webhook routes scaffolded for payment and order processing.
- NextAuth configuration for Google and credentials-based auth.
- Demo product fallback when the database is not connected.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Prisma and PostgreSQL
- Stripe
- NextAuth
- Zustand
- Tailwind CSS
- Zod

## AI Usage

AI was used as a development assistant throughout this project. It helped turn the initial dropshipping store idea into a working technical structure by suggesting the app architecture, route organization, data model, and supplier abstraction.

Specific uses included:

- Planning the Next.js App Router structure for storefront routes, admin routes, and API routes.
- Drafting and refining React components for the homepage, product grid, cart, admin pages, navbar, footer, and product cards.
- Designing the Prisma schema for products, suppliers, variants, orders, fulfilments, payment status, and order items.
- Scaffolding API routes for products, orders, Stripe checkout, Stripe webhooks, and supplier webhooks.
- Creating validation logic with Zod for product creation and checkout requests.
- Drafting supplier adapter files for AliExpress, Spocket, CJ Dropshipping, and Printful so each supplier can share a common internal interface.
- Generating demo catalog data so the storefront can still render when a database connection is unavailable.
- Improving UI copy, empty states, badges, labels, and customer-facing messaging.
- Reviewing TODO areas and helping identify where production logic is still needed, such as real supplier API calls, admin authorization checks, inventory validation, and complete checkout line-item creation.

All AI-generated code and text was reviewed and adjusted in the project context. The AI did not replace manual ownership of the implementation; it was used to accelerate scaffolding, iteration, debugging, and documentation.

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your own database, auth, Stripe, email, storage, and supplier credentials. Do not commit real secrets.

Generate the Prisma client:

```bash
npm run db:generate
```

Apply the database schema:

```bash
npm run db:migrate
```

Optional: seed demo products into the database.

```bash
npm run db:seed
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Scripts

```bash
npm run dev          # Start local development
npm run build        # Build for production
npm run start        # Start the production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run Prisma migrations locally
npm run db:push      # Push schema changes without a migration
npm run db:seed      # Seed demo data
npm run db:studio    # Open Prisma Studio
```

## Project Structure

```text
src/app/(storefront)        Customer storefront pages
src/app/(admin)             Admin dashboard pages
src/app/api                 API and webhook routes
src/components/storefront   Storefront UI components
src/lib                     Auth, database, Stripe, utilities, demo data
src/lib/suppliers           Supplier adapter interfaces and implementations
src/stores                  Zustand UI and cart stores
src/types                   Shared TypeScript types
prisma                      Prisma schema, migrations, and seed script
```

## Current Status

Several production integrations are scaffolded but not complete yet:

- Checkout still needs database-backed Stripe line items and inventory checks.
- Supplier adapters need real API calls for order placement and status polling.
- Admin routes need complete authorization and live KPI data.
- Supplier connection status is currently static.
- Credentials auth needs database lookup and password verification.

