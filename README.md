# CrickAcademy 🏏 — Monorepo

A modern Progressive Web Application (PWA) and management platform for cricket academies built with **Next.js 14 (App Router)**, **Turborepo**, **pnpm**, **Tailwind CSS**, **shadcn/ui**, **GSAP**, and **Prisma with Supabase PostgreSQL**.

---

## 📁 Monorepo Structure

```
crick-academy/
├── apps/
│   └── web/                   # Next.js 14 App Router PWA frontend
│       ├── src/
│       │   ├── app/           # App router pages, layouts, globals.css, manifest.ts
│       │   ├── components/    # Page components & GSAP animation hooks
│       │   └── lib/           # Utils
│       ├── public/            # Static assets & PWA icons
│       ├── tailwind.config.ts # Cricket token set & Oswald / Inter typography
│       └── components.json    # shadcn/ui configuration
├── packages/
│   ├── config/                # Shared tsconfig, eslint, and tailwind presets
│   │   ├── tsconfig.base.json
│   │   ├── tsconfig.nextjs.json
│   │   ├── tsconfig.react-library.json
│   │   ├── eslint-preset.js
│   │   └── tailwind-preset.js
│   ├── database/              # Prisma schema & singleton client for Supabase
│   │   ├── prisma/
│   │   │   └── schema.prisma  # Student, Fee, NetSession, Tournament models
│   │   └── src/               # Reusable database client
│   ├── types/                 # Shared TypeScript domain interfaces & enums
│   │   └── src/               # Student, Fee, NetSession, Tournament, Performance types
│   └── ui/                    # Shared UI design system & shadcn primitives
│       └── src/
│           ├── components/    # Button, Card, Badge, Avatar, StatCard
│           └── lib/utils.ts   # Class merging utility (cn)
├── package.json               # Monorepo root scripts
├── pnpm-workspace.yaml        # PNPM workspace definition
├── turbo.json                 # Turborepo task pipeline
├── .env.example               # Environment variables template
└── .gitignore
```

---

## 🎨 Design Tokens & Typography

Tailwind CSS is configured with the following custom palette exposed as CSS variables:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `pitch-green` | `#0B3D2E` | Primary cricket turf brand color |
| `chalk` | `#F5F1E6` | Crease chalk background / contrast surface |
| `leather-red` | `#C1121F` | Cricket ball red accent & alerts |
| `ink` | `#1A1A1A` | Core dark typography color |
| `stump-gold` | `#E8C468` | Timber stump & trophy gold accents |

### Typography
- **Headings / Display**: `Oswald` (via `next/font/google`)
- **Body / Content**: `Inter` (via `next/font/google`)

---

## 🗄️ Prisma Data Models (`packages/database`)

- **`Student`**: Player profile with batting/bowling disciplines, guardian contacts, joined date, batch.
- **`FeePayment`**: Fee dues tracking (`PAID`, `UNPAID`, `OVERDUE`) by type (`MONTHLY`, `MATCH`, `TOURNAMENT`).
- **`NetSession`**: Turf and astro net practice slots with capacity and fee management.
- **`SessionRegistration`**: Many-to-many session bookings linking students to slots.
- **`Tournament`**: Tournament metadata and lifecycle (`UPCOMING`, `ONGOING`, `COMPLETED`, `CANCELLED`).
- **`Match`**: Tournament fixtures, opponents, venues, and match results.
- **`PlayerPerformance`**: Individual match scorecard metrics (runs, wickets, catches, notes).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in the root:
```bash
cp .env.example .env
```
Provide your Supabase PostgreSQL credentials (`DATABASE_URL`, `DIRECT_URL`).

### 3. Generate Prisma Client
```bash
pnpm db:generate
```

### 4. Push Database Schema to Supabase
```bash
pnpm db:push
```

### 5. Run the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

- `pnpm dev`: Start all apps and packages in watch mode
- `pnpm build`: Build all applications with Turborepo
- `pnpm lint`: Run ESLint across all workspaces
- `pnpm check-types`: Run TypeScript compiler checks across all workspaces
- `pnpm db:generate`: Generate Prisma Client
- `pnpm db:push`: Synchronize Prisma schema with Supabase database
- `pnpm db:studio`: Launch Prisma Studio database GUI
