# Beple Wallet — Web (BPW)

Next.js 15 App Router implementation of the Beple Wallet product spec.
Mirrors the domain structure in `../BPW_beple-wallet/domains/` and consumes its design tokens directly.

## Stack

- Next.js 15 (App Router, RSC) + React 19 + TypeScript
- Tailwind CSS v4 (@theme driven by `tokens.css`)
- next-intl (ko, en, zh, ja, es)
- TanStack Query + Axios
- Zustand (auth/session, persisted)
- Zod + React Hook Form
- Playwright (mobile viewport)

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000 → redirects to `/ko/onb/language`.

## Folder Layout

```
src/
├── app/
│   ├── layout.tsx              root (viewport/metadata only)
│   ├── globals.css             imports tokens.css + @theme mapping
│   ├── tokens.css              synced from ../BPW_beple-wallet/design/tokens.css
│   └── [locale]/
│       ├── layout.tsx          420px mobile shell, providers
│       ├── page.tsx            redirect → /onb/language
│       └── (auth)/onb/...      onboarding flow
│
├── i18n/
│   ├── routing.ts              locale list + typed Link/useRouter
│   ├── request.ts              next-intl request config
│   └── messages/               ko|en|zh|ja|es.json
│
├── shared/
│   ├── ui/                     TopBar, Button, TextField, BottomTab, Popup, PinKeypad
│   ├── lib/                    http, query-provider, cn
│   └── auth/store.ts           zustand (persisted)
│
├── domains/                    mirrors BPW_beple-wallet/domains/
│   ├── onboarding/             ONB
│   ├── home/                   HOM
│   ├── recharge/               CHG
│   ├── payment/                PAY
│   ├── withdrawal/             WDR
│   ├── activity/               ACT
│   └── settings/               SET
│
├── config/
│   ├── env.ts                  Zod-validated env
│   └── routes.ts               typed deep-link map
│
└── middleware.ts (project root) i18n middleware
```

## Design Token Rules

- Never hard-code hex in components. Use Tailwind token classes: `bg-primary`, `text-text-body`, `border-border-card`, etc.
- ESLint blocks raw hex literals (see `eslint.config.mjs`).
- When the Figma source updates, re-copy `../BPW_beple-wallet/design/tokens.css` → `src/app/tokens.css`.

## Domain Rules

- A domain never imports from another domain. Go through `@/shared`.
- Server Components by default. Mark `"use client"` only on interactive leaves.
- Deep links live in `config/routes.ts` — import the typed map, don't concat strings.

## Mobile Development (Pattern B — Expo WebView Shell)

The `mobile/` directory contains a React Native Expo app that wraps the web app in a WebView and provides native KYC screens (passport, face scan, biometric, PIN).

### Option A — USB Hotspot (recommended, no tunnel needed)

**One-time:** Connect iPhone to Mac via USB.

**Each session:**

```bash
# Terminal 1 — Next.js production server
cd web
npx next build        # only needed when web code changes
npx next start --hostname 0.0.0.0

# Terminal 2 — Find Mac's IP on the USB hotspot interface
ipconfig getifaddr en5   # try en6 if empty; result is 172.20.10.x

# Update mobile/.env
echo "EXPO_PUBLIC_WEB_URL=http://172.20.10.x:3000" > mobile/.env

# Terminal 3 — Expo
cd mobile
npx expo start --lan --clear
```

On iPhone: Settings → Personal Hotspot → Allow Others to Join → ON, then scan the QR code.

### Option B — Serveo tunnel (WiFi only, no USB)

```bash
# Terminal 1 — Next.js
cd web && npx next start --hostname 0.0.0.0

# Terminal 2 — Serveo tunnel (copy the printed URL)
ssh -R 80:localhost:3000 nokey@localhost.run
# Update mobile/.env with the printed URL:
# EXPO_PUBLIC_WEB_URL=https://xxxx.localhost.run

# Terminal 3 — Expo
cd mobile && npx expo start --tunnel --clear
```

The WebView auto-clicks the Serveo browser warning — no manual interaction needed.

### Important notes

- `web/.env.local`: keep `NEXT_PUBLIC_API_MOCKING` **commented out** for mobile testing. Re-enable only for browser development.
- Re-run `npx next build` whenever web code changes.
- Expo hot-reloads mobile (native shell) code automatically — no rebuild needed.
- Do **not** use ngrok for the Next.js server — its interstitial page injects HTML into JS chunk responses in WKWebView, causing `SyntaxError: Unexpected token '<'`.

### Web ↔ Native bridge

Messages are sent via `postMessage` / `onMessage`. Types are defined in `mobile/lib/bridge.ts` and `web/lib/native-bridge.ts`.

| Web → Native | Native → Web |
|---|---|
| `KYC_PASSPORT_START` | `KYC_PASSPORT_DONE` |
| `KYC_FACE_START` | `KYC_FACE_DONE` |
| `KYC_BIOMETRIC_START` | `KYC_BIOMETRIC_DONE` / `KYC_BIOMETRIC_SKIP` |
| `KYC_PIN_START` | `KYC_PIN_DONE` |

---

## Next Steps

1. `pnpm install`
2. Verify `/ko/onb/language` renders the language picker
3. Port `domains/ONB_onboarding/screens/onb-user-type.html` → `src/app/[locale]/(auth)/onb/user-type/page.tsx`
4. Build ONB API surface in `src/domains/onboarding/api/`
5. Add Playwright spec per `domains/ONB_onboarding/qa-scenarios.md`

## QA

Playwright suites mirror `domains/[D]/qa-scenarios.md` one-to-one. Run with `pnpm e2e`.
Default viewport 375×812 (iOS reference per `design-guide.md §1.1`).
