# Sistema de Mejora Genética Animal (SMGA)

A cattle farm genetic improvement management system built with React, Vite, TypeScript, and a Node.js/Express backend API connected to a Replit PostgreSQL database.

## Architecture

- **Frontend**: React + Vite (TypeScript) on port 5000, using Tailwind CSS + shadcn/ui components
- **Backend**: Express API server (TypeScript, tsx) on port 3001
- **Database**: Replit PostgreSQL with Drizzle ORM
- **Schema**: `shared/schema.ts` (Drizzle schema)
- **API client**: `src/lib/api.ts` (frontend fetch wrapper using `/api` proxy)

## Running the App

```bash
npm run dev
```

This runs both the API server (`npx tsx server/index.ts` on port 3001) and Vite (`vite` on port 5000) concurrently. Vite proxies `/api` requests to the backend at port 3001.

## Database

- Schema defined in `shared/schema.ts`
- Push schema changes: `npm run db:push`
- Connection via `DATABASE_URL` env var (injected by Replit)

### Tables
- `registros_basicos` — Basic cattle records (id, raza, fecha_nacimiento, lactancia, etc.)
- `registros_productivos` — Production records (milk yield, fat%, protein%, etc.)
- `registros_reproductivos` — Reproductive records (parto, servicios, concepcion, etc.)
- `registros_otros` — Other records (renguera, mastitis, longevidad, etc.)
- `toros` — Bull records with DEP indices (leche, grasa, prot, tph, INIA, Rovere)

## Key Features

- **Registros Básicos**: Add/edit/delete basic cattle records
- **Registros Productivos**: Wood production records with LC305 auto-calculation
- **Registros Reproductivos**: Reproductive tracking (IIP, IPC, S/C auto-calculated)
- **Registros Otros**: Health/conformation scoring
- **Tablero Final**: Dashboard with all combined metrics
- **Reporte Toros**: Bull index reports (INIA and Rovere indices auto-calculated from DEP values)
- **Valor Cría**: Breeding value calculator
- **Indicadores Reproductivos**: Reproductive indicators
- **Producción Wood**: Wood model production curves
- **Factores Corrección**: Age/lactation correction factors
- **Bulk upload**: Excel/CSV import for all record types

## Migration History

- Migrated from Lovable/Supabase to Replit + PostgreSQL
- Replaced Supabase client calls with server-side API routes
- API credentials and DB connection stay securely on the server
