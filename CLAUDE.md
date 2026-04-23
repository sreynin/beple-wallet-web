# Beple Wallet Web — Project Rules

## ⚠️ MANDATORY: Read QA Scenarios Before Every Page

Before creating or modifying any page, you MUST read the QA scenarios file
for that domain. This is not optional — every scenario must be implemented.

### Domain → QA file mapping

| Route prefix   | Domain | QA file                        |
|----------------|--------|-------------------------------|
| `/onb/*`       | ONB    | `docs/qa/ONB_onboarding.md`   |
| `/home/*`      | HOM    | `docs/qa/HOM_home.md`         |
| `/pay/*`       | PAY    | `docs/qa/PAY_payment.md`      |
| `/recharge/*`  | CHG    | `docs/qa/CHG_recharge.md`     |
| `/withdraw/*`  | WDR    | `docs/qa/WDR_withdrawal.md`   |
| `/activity/*`  | ACT    | `docs/qa/ACT_activity.md`     |
| `/settings/*`  | SET    | `docs/qa/SET_settings.md`     |

### Process (follow every time)

1. **Read** the QA file for the target domain
2. **Find** all scenarios for the target screen (e.g. HOM-001, HOM-002)
3. **Implement** every Happy Path, Expected Result, and Exception Case
4. **Verify** — after coding, list each SCN-ID and mark ✅ covered / ❌ gap
5. **Fix** any gaps before finishing
6. **Typecheck** — run `npx tsc --noEmit`, fix all errors

---

## Tech Stack

- Next.js 15 App Router · TypeScript strict · Tailwind CSS v4
- TanStack Query v5 · Zustand · MSW v2
- `@/*` alias → `web/` root
- Routes defined in `web/lib/routes.ts`

## Conventions

- All interactive forms → `"use client"` component
- Mutations → `useMutation` (TanStack Query)
- Queries → `useQuery` (TanStack Query)
- Navigation → `useRouter` from `@/lib/i18n/routing`
- Cards: `rounded-2xl`, Primary CTA: `bg-primary h-[52px] rounded-2xl`
- New API function → `domains/{domain}/api/index.ts`
- New MSW handler → `mocks/handlers/{domain}.ts`
- New types → `domains/{domain}/types.ts`
