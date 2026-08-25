# Sara & Atef — Wedding Invitation Website

A single-page, SEO-optimized Next.js (App Router + TypeScript) wedding
invitation site, with an RSVP system backed by Prisma and a password
protected admin dashboard.

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS
- Framer Motion (all `ease: "easeOut"`, no spring/bounce, respects
  `prefers-reduced-motion`)
- React Hook Form + Zod (client and server validation)
- Prisma, SQLite by default for zero-config local dev — swap to Postgres
  for production (see `prisma/schema.prisma`)
- A lightweight JWT session cookie for the single-admin auth flow (`lib/auth.ts`)

## Getting started

```bash
npm install
cp .env.example .env
# edit .env: set ADMIN_EMAIL, ADMIN_PASSWORD, and a long random JWT_SECRET

npm run db:push      # creates dev.db and applies the schema
npx tsx prisma/seed.ts   # seeds default wedding date/venue settings

npm run dev
```

Then drop the required media/image files into `/public` — see
`public/README-ASSETS.md` for the full list and notes on a couple of
assets (individual bride/groom portraits) that weren't part of the
original asset drop.

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin dashboard.

## Structure

```
app/
  page.tsx                 — assembles all public sections
  layout.tsx                — fonts + global SEO metadata
  sitemap.ts / robots.ts    — App Router metadata API
  admin/login, admin/dashboard
  api/rsvp                  — public RSVP submission
  api/guests/approved       — public approved guest list (for the modal)
  api/admin/*                — auth + dashboard data, all session-protected
components/
  sections/*                 — one component per page section
  ui/*                       — RotatingFlower, FloatingButterfly
  admin/*                    — RsvpTable, SettingsPanel, LogoutButton
lib/
  prisma.ts, auth.ts, validations.ts
prisma/
  schema.prisma, seed.ts
middleware.ts                — protects /admin/dashboard
```

## Notes on production readiness

- **Database**: switch `prisma/schema.prisma`'s datasource provider to
  `postgresql` and point `DATABASE_URL` at your Postgres instance (e.g.
  Supabase/Neon), then `npx prisma db push`.
- **Admin auth**: the current setup checks plaintext credentials from env
  vars against a submitted email/password, then issues a signed JWT
  cookie — sufficient for a single-admin wedding site. For multiple admins
  or stronger guarantees, add a hashed-password `AdminUser` table
  (`bcryptjs` is already a dependency) or swap in NextAuth's credentials
  provider.
- **Images**: `bride.jpg`, `groom.jpg`, and any extra floral/butterfly
  assets referenced in comments should be added to `/public` before
  deploying — see `public/README-ASSETS.md`.
- **Site settings** (wedding dates, venue, ceremony/reception times) live
  in the `SiteSettings` DB row and are editable from `/admin/dashboard`;
  the public homepage is rendered with `force-dynamic` so edits show up
  immediately without a redeploy.
