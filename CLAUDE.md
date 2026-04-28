# CLAUDE.md — Dropshipping Platform (Next.js)

> This file is the canonical reference for AI-assisted development on this project.
> Read it fully before writing any code, suggesting architecture changes, or creating files.

---

## 1. Project Overview

A **full-stack dropshipping platform** built with Next.js. The app combines a customer-facing storefront with an internal admin dashboard for order and product management. The business sources products from multiple third-party suppliers across a **general / mixed-niche** catalogue and fulfils orders without holding inventory. The platform targets a **global audience**, so shipping estimates, carrier options, and supplier routing must account for international fulfilment.

**Business model:** Customer places order → app routes order to the correct supplier(s) based on each product's source → supplier ships directly to customer.

**Supplier mix:**
- **AliExpress / DSers** — general merchandise, long-tail products, longest shipping times
- **Spocket** — faster-shipping products (US/EU warehouse suppliers)
- **CJ Dropshipping** — wide catalogue, competitive pricing, warehousing options
- **Printful** — print-on-demand (custom apparel, accessories, home goods — no inventory)

Each supplier has different APIs, fulfilment timelines, and shipping carrier options. The supplier adapter pattern (§6) is critical for keeping this complexity contained. A single customer order may contain items from multiple suppliers and will be split into separate fulfilments.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Use Server Components by default; Client Components only when needed |
| Language | **TypeScript** | Strict mode enabled. No `any` unless absolutely necessary |
| Styling | **Tailwind CSS** | Utility-first. No CSS modules or inline styles |
| UI Components | **shadcn/ui** | Copy components into `/components/ui`. Do not modify originals |
| Database | **PostgreSQL** via **Prisma ORM** | Hosted on Supabase or Railway |
| Auth | **NextAuth.js v5** | Email/password + Google OAuth for customers; credentials-only for admin |
| Payments | **Stripe** | Checkout Sessions for storefront payments |
| State (client) | **Zustand** | Cart, UI state. No Redux |
| Data fetching | **TanStack Query** | Client-side fetching and caching where needed |
| Email | **Resend** + **React Email** | Transactional emails (order confirmation, shipping updates) |
| File storage | **Supabase Storage** or **Cloudflare R2** | Product images |
| Deployment | **Vercel** | Use Edge Middleware for auth checks |
| Monorepo | None — single Next.js app | Keep it simple unless the project scales significantly |

---

## 3. Repository Structure

```
/
├── app/                        # Next.js App Router
│   ├── (storefront)/           # Customer-facing route group
│   │   ├── page.tsx            # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx        # Product listing (filterable by niche)
│   │   │   └── [slug]/page.tsx # Product detail
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── orders/page.tsx     # Customer order history
│   ├── (admin)/                # Internal admin route group
│   │   ├── layout.tsx          # Admin shell with sidebar
│   │   ├── dashboard/page.tsx
│   │   ├── products/
│   │   ├── orders/
│   │   └── suppliers/
│   ├── api/                    # API Routes
│   │   ├── auth/[...nextauth]/ # NextAuth handlers
│   │   ├── webhooks/
│   │   │   ├── stripe/         # Stripe webhook handler
│   │   │   ├── printful/       # Printful production status webhooks
│   │   │   └── supplier/       # Generic supplier tracking webhooks
│   │   ├── products/
│   │   └── orders/
│   ├── layout.tsx              # Root layout
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn/ui components (do not edit)
│   ├── storefront/             # Storefront-specific components
│   ├── admin/                  # Admin-specific components
│   └── shared/                 # Shared across both (e.g. modals, toasts)
├── lib/
│   ├── db.ts                   # Prisma client singleton
│   ├── auth.ts                 # NextAuth config
│   ├── stripe.ts               # Stripe client
│   ├── suppliers/              # Supplier adapter pattern (see §6)
│   │   ├── types.ts            # Shared SupplierAdapter interface
│   │   ├── aliexpress.ts       # AliExpress / DSers adapter
│   │   ├── spocket.ts          # Spocket adapter
│   │   ├── cjdropshipping.ts   # CJ Dropshipping adapter
│   │   ├── printful.ts         # Printful (print-on-demand) adapter
│   │   └── index.ts            # Factory: getSupplierAdapter(name)
│   └── utils.ts                # Shared utilities
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── hooks/                      # Custom React hooks
├── stores/                     # Zustand stores
│   ├── cartStore.ts
│   └── uiStore.ts
├── types/                      # Global TypeScript types
├── emails/                     # React Email templates
├── public/
├── .env.local                  # Never commit. See §10 for required vars
├── .env.example                # Committed. Template for required vars
├── middleware.ts               # Auth protection, redirects
├── next.config.ts
├── tailwind.config.ts
├── CLAUDE.md                   # This file
└── README.md
```

---

## 4. Database Schema (Prisma)

The schema below is the authoritative starting point. Migrations must be generated with `prisma migrate dev`.

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(CUSTOMER)
  orders    Order[]
  createdAt DateTime @default(now())
}

enum Role {
  CUSTOMER
  ADMIN
}

model Product {
  id              String         @id @default(cuid())
  slug            String         @unique
  name            String
  description     String
  images          String[]       // URLs
  price           Decimal        @db.Decimal(10, 2)
  compareAtPrice  Decimal?       @db.Decimal(10, 2)
  costPrice       Decimal        @db.Decimal(10, 2)   // Supplier cost, used for margin calc
  inventory       Int            @default(0)
  status          ProductStatus  @default(DRAFT)
  supplierName    SupplierName   // which supplier fulfils this product
  supplierId      String         // internal reference ID from supplier
  supplierSku     String         // SKU on supplier side
  isPrintOnDemand Boolean        @default(false)      // true for Printful products
  category        String?
  niche           String?        // e.g. "home-decor", "apparel", "gadgets"
  tags            String[]
  shippingFrom    String?        // ISO 3166-1 alpha-2 e.g. "CN", "US", "DE"
  variants        ProductVariant[]
  orderItems      OrderItem[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

enum SupplierName {
  ALIEXPRESS
  SPOCKET
  CJ_DROPSHIPPING
  PRINTFUL
}

enum ProductStatus {
  DRAFT
  ACTIVE
  ARCHIVED
}

model ProductVariant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id])
  name      String  // e.g. "Size: L / Color: Red"
  sku       String
  price     Decimal @db.Decimal(10, 2)
  inventory Int     @default(0)
}

model Order {
  id              String        @id @default(cuid())
  userId          String?
  user            User?         @relation(fields: [userId], references: [id])
  guestEmail      String?
  status          OrderStatus   @default(PENDING)
  paymentStatus   PaymentStatus @default(UNPAID)
  stripeSessionId String?
  // An order may span multiple suppliers — each gets its own Fulfilment record
  fulfilments     Fulfilment[]
  items           OrderItem[]
  shippingAddress Json          // { name, line1, line2, city, state, country, zip, phone }
  currency        String        @default("USD")  // ISO 4217
  subtotal        Decimal       @db.Decimal(10, 2)
  shippingCost    Decimal       @db.Decimal(10, 2)
  total           Decimal       @db.Decimal(10, 2)
  notes           String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

// One Fulfilment record per supplier involved in an order
model Fulfilment {
  id              String       @id @default(cuid())
  orderId         String
  order           Order        @relation(fields: [orderId], references: [id])
  supplierName    SupplierName
  supplierOrderId String?      // Reference returned by that supplier
  status          OrderStatus  @default(PENDING)
  trackingNumber  String?
  trackingUrl     String?
  estimatedDays   Int?
  updatedAt       DateTime     @updatedAt
}

enum OrderStatus {
  PENDING
  PROCESSING
  FORWARDED_TO_SUPPLIER
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  UNPAID
  PAID
  REFUNDED
}

model OrderItem {
  id              String       @id @default(cuid())
  orderId         String
  order           Order        @relation(fields: [orderId], references: [id])
  productId       String
  product         Product      @relation(fields: [productId], references: [id])
  variantId       String?
  supplierName    SupplierName // denormalised for quick routing
  quantity        Int
  unitPrice       Decimal      @db.Decimal(10, 2)
  printfulFileUrl String?      // Printful POD only — design/mockup file URL
}
```

---

## 5. Core Features & Implementation Notes

### 5.1 Storefront

- **Homepage:** Hero banner, featured products, niche/category grid. All data fetched server-side with ISR (revalidate every 60s).
- **Product Listing:** Filter by niche/category/tags, sort by price and popularity. Use `searchParams` in Server Components. Show `shippingFrom` country flag and estimated delivery range per product card.
- **Product Detail:** Image gallery, variant selector, Add-to-Cart (client). Check stock before add. Printful POD products show "Made to order" badge — no stock check needed.
- **Cart:** Zustand store persisted to `localStorage`. Cart may contain items from multiple suppliers — inform customer: "Ships in multiple packages."
- **Checkout:** Collect shipping address → create Stripe Checkout Session via `/api/orders/checkout` → redirect to Stripe hosted page.
- **Guest checkout:** Allowed. Associate order with `guestEmail`. Offer account creation post-purchase.
- **Order confirmation:** Stripe webhook triggers order creation in DB + confirmation email via Resend. Email notes if multiple packages are expected.
- **Global shipping UX:** Show delivery estimate ranges based on `product.shippingFrom` and customer's destination country (e.g. "10–20 business days from China"). Never promise specific dates.

### 5.2 Admin Dashboard

- **Auth guard:** `middleware.ts` protects all `/admin/*` routes. Non-admins redirect to `/`.
- **Dashboard:** KPI cards (revenue today/week/month, order count, pending orders, fulfilment breakdown by supplier). Charts with Recharts.
- **Products:** CRUD interface. Import product from any supplier by searching with supplier + SKU. Tag with `niche` and `shippingFrom`. Bulk publish/archive. Show margin warning if < 20%.
- **Orders:** List with status filter. Order detail shows all `Fulfilment` sub-records per supplier. Manual status update per fulfilment. "Forward to Supplier" button per fulfilment row.
- **Suppliers:** All four integrations listed with connection status, last sync time, and any API errors.
- **Niches/Categories:** Manage the niche taxonomy used for storefront filtering.

### 5.3 Order Fulfilment Flow

Orders can contain items from multiple suppliers. Fulfilment is split per supplier group.

```
Stripe webhook (checkout.session.completed)
  → Validate Stripe signature
  → Create Order in DB (status: PROCESSING, paymentStatus: PAID)
  → Group OrderItems by supplierName
  → For each supplier group (run concurrently with Promise.allSettled):
      → Create Fulfilment record (status: PENDING)
      → Call getSupplierAdapter(name).placeOrder()
      → On success: update Fulfilment.supplierOrderId + status: FORWARDED_TO_SUPPLIER
      → On failure: flag Fulfilment for manual review, alert admin
  → Send customer confirmation email
      → Note number of packages if fulfilments > 1

Supplier webhook / polling (tracking update)
  → Match to Fulfilment record by supplierOrderId
  → Update Fulfilment.trackingNumber + trackingUrl + status: SHIPPED
  → If ALL Fulfilments for that Order are SHIPPED → Order.status = SHIPPED
  → Send customer shipping email with all tracking links
```

**Printful specifics:**
- POD products have unlimited inventory — `checkInventory()` returns `-1`. Never block add-to-cart.
- `placeOrder()` requires `printfulFileUrl` on each item.
- Printful fires its own webhooks: `package_shipped` updates the Fulfilment record.
- Printful ships from US/EU — faster for those destinations.

**Spocket specifics:**
- Suppliers are primarily US/EU based — shorter delivery times for those regions.
- Real inventory — always call `checkInventory()` before forwarding.

**CJ Dropshipping specifics:**
- Some products ship from US/EU warehouses — use `shippingFrom` on the product record.
- CJ has its own status codes; map them to the internal `OrderStatus` enum in the adapter.

**AliExpress / DSers specifics:**
- Longest shipping times (10–45 days standard). Always use conservative delivery estimates.
- Use DSers API for order placement (not AliExpress directly).
- Prefer ePacket or AliExpress Standard Shipping for international orders.

---

## 6. Supplier Adapter Pattern

All supplier integrations must implement the `SupplierAdapter` interface. **Never call supplier APIs directly from components or API routes** — always go through the adapter.

```typescript
// lib/suppliers/types.ts

export type SupplierName = "ALIEXPRESS" | "SPOCKET" | "CJ_DROPSHIPPING" | "PRINTFUL";

export interface SupplierProduct {
  supplierName: SupplierName;
  supplierId: string;
  sku: string;
  name: string;
  costPrice: number;        // USD cents
  images: string[];
  shippingFrom?: string;    // ISO 3166-1 alpha-2
  isPrintOnDemand: boolean;
  variants: {
    name: string;
    sku: string;
    costPrice: number;
  }[];
}

export interface SupplierOrderPayload {
  items: {
    sku: string;
    quantity: number;
    variantSku?: string;
    printfulFileUrl?: string; // Printful POD only
  }[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;          // ISO 3166-1 alpha-2
    zip: string;
    phone: string;
  };
}

export interface SupplierOrderResult {
  supplierOrderId: string;
  estimatedDeliveryDays?: number;
  trackingUrl?: string;
}

export interface SupplierAdapter {
  name: SupplierName;
  searchProducts(query: string): Promise<SupplierProduct[]>;
  getProduct(sku: string): Promise<SupplierProduct | null>;
  checkInventory(sku: string, variantSku?: string): Promise<number>; // -1 = unlimited (POD)
  placeOrder(payload: SupplierOrderPayload): Promise<SupplierOrderResult>;
  getOrderStatus(supplierOrderId: string): Promise<string>;
}
```

**Factory** (`lib/suppliers/index.ts`):

```typescript
import { aliexpressAdapter } from "./aliexpress";
import { spocketAdapter }    from "./spocket";
import { cjAdapter }         from "./cjdropshipping";
import { printfulAdapter }   from "./printful";
import type { SupplierName, SupplierAdapter } from "./types";

const adapters: Record<SupplierName, SupplierAdapter> = {
  ALIEXPRESS:      aliexpressAdapter,
  SPOCKET:         spocketAdapter,
  CJ_DROPSHIPPING: cjAdapter,
  PRINTFUL:        printfulAdapter,
};

export function getSupplierAdapter(name: SupplierName): SupplierAdapter {
  const adapter = adapters[name];
  if (!adapter) throw new Error(`No adapter registered for supplier: ${name}`);
  return adapter;
}
```

To add a new supplier: create `lib/suppliers/<name>.ts` implementing `SupplierAdapter`, add it to the factory, and add the enum value to Prisma schema + run a migration.

---

## 7. API Route Conventions

- All API routes live in `app/api/`.
- Use Next.js Route Handlers (`route.ts`) with named exports (`GET`, `POST`, etc.).
- Always validate request bodies with **Zod** before processing.
- Return consistent JSON:
  ```json
  { "data": ..., "error": null }   // success
  { "data": null, "error": "..." } // failure
  ```
- Use correct HTTP status codes: 200, 201, 400, 401, 403, 404, 500.
- Webhook routes (Stripe, Printful, supplier) must verify signatures before processing. Reject unsigned requests with 401.

---

## 8. Code Style & Conventions

### General
- **No `any` in TypeScript.** Use `unknown` and narrow types properly.
- Prefer `async/await` over `.then()` chains.
- Keep functions small and single-purpose.
- Named exports for components and utilities. Default exports only for Next.js page/layout files.

### Components
- Server Components by default. Add `"use client"` only when the component uses hooks or browser APIs.
- Props interfaces above the component: `interface ProductCardProps { ... }`.
- No business logic in components. Extract to hooks or server actions.

### Data Fetching
- **Server Components:** `async/await` directly in the component. Use `cache()` for deduplication.
- **Client Components:** TanStack Query (`useQuery`, `useMutation`).
- **Mutations:** Next.js Server Actions for form submissions where possible.

### Naming
- Files: `kebab-case.ts` / `kebab-case.tsx`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Database models: `PascalCase` (Prisma convention)

### Commits
Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.

---

## 9. Key Business Rules

1. **Never show out-of-stock products as purchasable.** Disable Add-to-Cart when `inventory <= 0`, except for Printful POD products (`isPrintOnDemand = true`).
2. **Prices are stored in the smallest currency unit for Stripe** (cents) but displayed as decimals. Always format with `Intl.NumberFormat`.
3. **Orders cannot be cancelled once any Fulfilment is `FORWARDED_TO_SUPPLIER`** without contacting the supplier manually. Reflect this in the UI — disable cancel button, show explanation.
4. **Admin accounts** must not be self-registerable. Admin accounts are seeded or created by another admin only.
5. **All supplier credentials are server-side only.** Never expose supplier API keys to the client or include them in `NEXT_PUBLIC_*` variables.
6. **Margin enforcement:** Product `price` must always be > `costPrice`. Warn in the admin product form if margin < 20%.
7. **Multi-supplier cart transparency:** Always inform customers if their order will ship in multiple packages from different locations. Show estimated delivery ranges per item, not just per order.
8. **Shipping estimate display:** Never promise a specific delivery date. Always show a range and disclaim it is an estimate. AliExpress items: 10–45 days. Spocket/Printful US: 3–7 days. CJ varies by warehouse.
9. **Currency:** Default to USD for all Stripe sessions in the MVP. Store currency on the Order record for future multi-currency support.

---

## 10. Environment Variables

Required in `.env.local` (never committed):

```bash
# Database
DATABASE_URL=

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=
EMAIL_FROM=orders@yourdomain.com

# Storage
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Suppliers — all server-side only, never NEXT_PUBLIC_
ALIEXPRESS_APP_KEY=
ALIEXPRESS_APP_SECRET=
ALIEXPRESS_ACCESS_TOKEN=

SPOCKET_API_KEY=

CJ_API_KEY=
CJ_EMAIL=

PRINTFUL_API_KEY=
```

---

## 11. Testing Strategy

- **Unit tests:** Vitest. Cover utility functions, all four supplier adapters, price/margin calculations, order routing logic.
- **Integration tests:** Test API routes with Next.js test helpers. Especially: Stripe webhook handler, supplier forwarding logic.
- **E2E tests:** Playwright. Cover: product listing → add to cart (mixed suppliers) → checkout flow; admin login → product create → order fulfilment.
- Test files co-located with the code they test: `lib/suppliers/aliexpress.test.ts`, or in `__tests__/` for integration/E2E.
- Mock all supplier APIs in tests — never call real supplier APIs in CI.

---

## 12. MVP Scope (Ship First)

The following is the **minimum viable product**. Do not over-engineer before these are working:

- [ ] Product listing + detail pages (static seed data OK to start)
- [ ] Cart with multi-supplier awareness (Zustand, localStorage)
- [ ] Stripe Checkout integration
- [ ] Order creation on Stripe webhook
- [ ] At least one supplier adapter live: **AliExpress** (others can be stubbed)
- [ ] Fulfilment record creation per supplier group
- [ ] Customer order confirmation email
- [ ] Admin login
- [ ] Admin order list with Fulfilment status per supplier
- [ ] Manual fulfilment status update in admin

Everything else (Spocket/CJ/Printful live adapters, tracking emails, admin analytics, refunds, product import UI) is **Phase 2**.

---

## 13. Out of Scope (for now)

- Multi-vendor marketplace (this is a single-operator store)
- Mobile app
- Multi-language / multi-currency (USD only for MVP — `currency` field in schema is ready for later)
- Inventory forecasting / AI product recommendations
- Loyalty / referral programs
- Automated supplier selection based on customer location (manual product tagging for now)

---

## 14. AI Assistant Guidelines

When helping develop this project:

1. **Always read this file first** before proposing architecture or file structure changes.
2. Prefer **Server Components and Server Actions** over client-side fetching unless interactivity requires it.
3. When adding a new supplier, create a new adapter file — do not modify existing adapters.
4. When adding API routes, always include **Zod validation** and proper error handling.
5. **Do not introduce new dependencies** without flagging it and explaining why the existing stack cannot handle it.
6. When writing Prisma queries, use **transactions** for multi-step DB operations (e.g. creating an Order + OrderItems + Fulfilments together).
7. Never hardcode secrets. Always use `process.env.*`.
8. When in doubt about a UI component, reach for **shadcn/ui** before building from scratch.
9. For any multi-supplier logic, use `Promise.allSettled()` — a failure on one supplier should not block others.
10. Always check `isPrintOnDemand` before applying inventory rules — POD products skip all stock checks.
