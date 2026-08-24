# Spokes Turbo Repo

Monorepo for the Spokes platform, built with [Turborepo](https://turborepo.dev), [pnpm](https://pnpm.io), and [Next.js](https://nextjs.org).

## What's inside

### Apps

| App | Port | Purpose |
|-----|------|---------|
| [`tenant`](apps/tenant) | 3001 | Tenant-facing product portal |
| [`operations`](apps/operations) | 3000 | Internal operations portal |
| [`docs`](apps/docs) | 4000 | Documentation site |

### Packages

| Package | Purpose |
|---------|---------|
| [`@repo/ui`](packages/ui) | Shared shadcn/Base UI component library |
| [`@repo/db`](packages/db) | Supabase clients, types, and migrations |
| [`@repo/eslint-config`](packages/eslint-config) | Shared ESLint configuration |
| [`@repo/typescript-config`](packages/typescript-config) | Shared TypeScript configuration |

## Getting started

### Prerequisites

- Node.js 20+ (see [`.nvmrc`](.nvmrc))
- pnpm 11+
- [Docker](https://www.docker.com/) (for local Supabase)

### Install dependencies

```sh
pnpm install
```

### Environment variables

Copy the example env file and fill in your values:

```sh
cp .env.example .env.local
```

After starting local Supabase (below), update `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` with the keys printed by the CLI.

### Start local Supabase

```sh
pnpm db:start
pnpm db:reset   # applies migrations
pnpm db:gen-types
```

### Run all apps in development

```sh
pnpm dev
```

Or run a single app:

```sh
pnpm --filter tenant dev
pnpm --filter operations dev
pnpm --filter docs dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm check-types` | Type-check all packages |
| `pnpm test` | Run unit tests |
| `pnpm format` | Format code with Prettier |
| `pnpm db:start` | Start local Supabase |
| `pnpm db:stop` | Stop local Supabase |
| `pnpm db:reset` | Reset local database and apply migrations |
| `pnpm db:gen-types` | Regenerate TypeScript types from local schema |
| `pnpm db:migration:new` | Create a new database migration |

## Project structure

```
apps/
  tenant/       # Tenant portal (primary app)
  operations/   # Internal ops
  docs/         # Documentation
packages/
  ui/           # Shared UI components
  db/           # Supabase integration
  eslint-config/
  typescript-config/
```

## Adding UI components

Components live in `packages/ui`. To add new shadcn components to the tenant app:

```sh
cd apps/tenant
pnpm dlx shadcn@latest add button
```

Configure aliases in [`apps/tenant/components.json`](apps/tenant/components.json) to point at `@repo/ui`.
