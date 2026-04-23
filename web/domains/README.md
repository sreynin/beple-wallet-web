# Domains

Each folder mirrors a domain code from `product-spec.md §3`.
Domains are isolated: never import from another domain — cross-domain needs go through `@/shared`.

```
onboarding/    ONB  Language, KYC (Quick/Full), PIN, biometric
home/          HOM  Balance dashboard, quick actions, banners
recharge/      CHG  Korbit, direct transfer, bank account
payment/       PAY  QR scan, confirm, PIN
withdrawal/    WDR  ATM QR withdrawal
activity/      ACT  Transaction history, account management
settings/      SET  Language, notifications, biometric, PIN, logout
```

## Conventions

Inside each domain:

```
components/   UI specific to this domain
hooks/        Query hooks (TanStack Query)
api/          Typed HTTP calls wrapping @/shared/lib/http
schemas/      Zod schemas for forms + API response validation
store.ts      Zustand slice (optional, domain-local state)
types.ts      Domain types
```

Routes live in `src/app/[locale]/.../` (App Router) and pull components/hooks from here.
