# Repository Guidelines

## Project Structure

This is an **Expo SDK 54** React Native app (iOS & Android) that serves as a native client for the [Seerr](https://github.com/seerr-team/seerr) media request management system. Key directories:

| Path          | Purpose                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `app/`        | Expo Router v6 file-based routes and layouts                                                     |
| `screens/`    | Screen implementations; `.ios.tsx` suffix for iOS-specific variants                              |
| `components/` | Flat directory of reusable UI components                                                         |
| `hooks/`      | Custom React hooks                                                                               |
| `http/`       | API client config, error classes, and interceptors                                               |
| `http/gen/`   | **Auto-generated** — do not edit. Generated from `seerr/seerr-api.yml` via `@hey-api/openapi-ts` |
| `const/`      | Constants, enums, and theme definitions                                                          |
| `utils/`      | Pure utility functions                                                                           |
| `assets/`     | App icons, splash images, and third-party logos                                                  |
| `seerr/`      | Git submodule — the Seerr backend (source of the OpenAPI spec)                                   |
| `patches/`    | `patch-package` patches for dependencies                                                         |

The path alias `@/*` maps to the project root (e.g., `@/components/title-card`).

## Build, Test & Development Commands

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm install`     | Install dependencies (runs `patch-package` via postinstall) |
| `npm start`       | Start the Expo dev server                                   |
| `npm run ios`     | Build and run on iOS (clears `ios/` first)                  |
| `npm run android` | Build and run on Android (clears `android/` first)          |
| `npm run lint`    | Run ESLint via `expo lint`                                  |

Use `.nvmrc` (`lts/*`) to set the correct Node version. Copy `.env.example` to `.env.local` to enable optional dev tools (Rozenite).

## Coding Style & Naming Conventions

- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **Semicolons:** Required
- **Print width:** 100 characters
- **Trailing commas:** ES5-style
- **Formatter:** Prettier (`prettier.config.mjs`)
- **Linter:** ESLint v9 flat config with `eslint-config-expo`
- **Import order:** Enforced by `eslint-plugin-simple-import-sort` (error)
- **Unused imports:** Flagged by `eslint-plugin-unused-imports` (error); prefix intentionally unused vars with `_`
- **File naming:** Kebab-case for all files (e.g., `title-card.tsx`, `use-base-url.ts`)
- **Platform variants:** Use `.ios.tsx` suffix for iOS-specific screen implementations alongside a default `.tsx`

## API Client (Code Generation)

The `http/gen/` directory is auto-generated from the OpenAPI spec at `seerr/seerr-api.yml`. Configuration is in `openapi-ts.config.js`. **Never edit files in `http/gen/` directly** — they are excluded from linting and will be overwritten.

## Commit & Pull Request Guidelines

This project uses **Conventional Commits**:

```
feat: add user profile screen
fix: prevent text overflow in `RequestItem` subheading
chore: bump dependencies in `package-lock.json`
refactor: separate movie/tv details components
```

Format: `<type>: <imperative description>`. Use backticks around component or file names in the description.

## Architecture Notes

- **React Compiler** and **New Architecture** are both enabled.
- **TanStack React Query v5** handles all server state (with `experimental_prefetchInRender`).
- **TanStack React Form v1** handles form state.
- **Zod v4** validates API error responses.
- Navigation uses native stacks and native bottom tabs via `expo-router`.
- Auth tokens and server URLs are stored in `expo-secure-store`.
