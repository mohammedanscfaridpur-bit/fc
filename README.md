# Mohammeda Sporting Club, Faridpur — Official Website

Est. ১৯৩৬ (1936). A premium, bilingual (English / বাংলা) website with a public site
and a secure admin dashboard for managing all club content.

## Tech stack

| Layer        | Choice                                                |
|--------------|--------------------------------------------------------|
| Framework    | Next.js 15 (App Router, Server Components, Server Actions) |
| Language     | TypeScript (strict)                                    |
| Styling      | Tailwind CSS + design tokens in `tailwind.config.ts`    |
| Motion       | Framer Motion                                           |
| i18n         | next-intl (`en` / `bn`, route-based `/en/...` `/bn/...`) |
| Database     | MySQL + Prisma ORM (chosen for affordable Hostinger Node.js hosting; PostgreSQL-compatible schema, easy to swap later) |
| Auth         | NextAuth (credentials provider, admin-only)              |
| Forms        | react-hook-form + zod                                    |
| Images       | next/image + sharp, local disk storage on the VPS         |
| Gallery      | yet-another-react-lightbox                                |
| Deployment   | Hostinger Node.js-enabled hosting (Business/Cloud plan) — no VPS required |

## Folder structure

```
mohammeda-sc-faridpur/
├── prisma/
│   ├── schema.prisma          # (Step 3)
│   ├── migrations/
│   └── seed/                  # seed script: founding data, 1936 badge, etc.
├── public/
│   ├── images/
│   │   ├── logo/logo.png      # official club crest (uploaded)
│   │   ├── committee/ gallery/ news/ events/ sponsors/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (public)/          # every public page (Home, History, Gallery, ...)
│   │   │   └── [page]/page.tsx
│   │   ├── (admin)/admin/     # admin dashboard route group (auth-gated)
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   └── [resource]/    # president-secretary, committee, news, events...
│   │   └── api/                # route handlers backing the admin CRUD + public forms
│   │       ├── auth/ news/ events/ gallery/ committee/ activities/
│   │       ├── sponsors/ contact/ membership/ leadership/ upload/
│   ├── components/
│   │   ├── layout/             # Header, Footer, Sticky nav, LanguageSwitch, MobileNav
│   │   ├── home/                # Hero, About teaser, Stats, Highlights
│   │   ├── history/              # Timeline
│   │   ├── committee/            # PersonCard, CommitteeGrid
│   │   ├── gallery/               # LightboxGrid
│   │   ├── news/ events/ membership/ sponsors/ contact/
│   │   ├── admin/                  # DataTable, AdminSidebar, forms
│   │   ├── shared/                  # SectionHeading, Container, EmblemDivider
│   │   └── ui/                       # Button, Card, Input, Badge (design-system primitives)
│   ├── lib/                    # prisma client, auth config, validators, utils
│   ├── hooks/
│   ├── types/
│   ├── store/                   # zustand client stores (e.g., admin UI state)
│   ├── i18n/
│   │   ├── locales/en/*.json
│   │   ├── locales/bn/*.json
│   │   └── request.ts
│   └── styles/globals.css
├── docs/                        # design-system.md, deployment.md, content guide
├── scripts/                     # VPS deploy + backup scripts (Step 7)
├── tailwind.config.ts
├── next.config.mjs
└── .env.example
```

## Pages (public)

Home · History · Activities · Achievements · Management · Executive Committee ·
Former Presidents · Former Secretaries · Life Members · Gallery · Events · News ·
Membership · Sponsors · Contact

## Admin dashboard capabilities

Login (credentials, hashed with bcrypt) · President & Secretary profile ·
Executive Committee CRUD · News CRUD · Events CRUD · Gallery uploads ·
Activities CRUD · Sponsors CRUD · Contact info · Membership applications (view/export)

## Build plan (confirm each step before I move to the next)

1. **Project structure** ← you are here
2. UI Design — design tokens (color/type/layout), signature visual motif, key
   component mockups (Hero, Nav, Cards) before wiring real pages
3. Database — Prisma schema for all entities + seed data
4. Components — reusable UI + feature components
5. Pages — all 15 public pages wired to real data
6. Admin Dashboard — auth, CRUD screens, file uploads
7. Deployment — Hostinger Node.js-enabled hosting setup (Business/Cloud plan, GitHub
   deploy or ZIP upload, MySQL database, custom domain + SSL) — no VPS required

## Getting started (once dependencies are installed on your machine)

```bash
npm install
cp .env.example .env      # fill in DATABASE_URL, NEXTAUTH_SECRET, SMTP, etc.
npm run db:push           # or db:migrate once schema is finalized
npm run db:seed
npm run dev
```
