# Annt Nandas Foundation

## Project overview
This is a Next.js site for the foundation. The main app pages live under src/app and the reusable UI is mostly in src/components.

## Key folders
- src/app: page routes such as home, about, contact, donate, and registrations
- src/components: reusable sections used by the pages
- src/lib: shared data and helper utilities
- public: static assets

## Run locally
1. Install dependencies: npm install
2. Start the dev server: npm run dev
3. Open http://localhost:3000

## Build
- npm run build

## Notes for a new developer
- Keep page-specific content in the route files under src/app.
- Reuse components from src/components instead of creating new one-off files.
- Avoid adding extra utility folders unless the feature truly needs it.
