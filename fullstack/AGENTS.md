# How to work in this project

This is a web app and its API in one project, published as one Worker, made from an fnMoa template. It is published to Cloudflare
Workers by fnMoa; nobody deploys it by hand.

## Layout

- `apps/web/`: the web app (Vite and React).
- `apps/api/src/api.ts`: the API (Hono), all under `/api`.
- `migrations/`: the database's changes, numbered.
- `test/`: tests for both (Vitest).

## Rules

- Keep the health check green: `npm run typecheck`, `npm test` and
  `npm run build` must pass. `.fnmoa/checks.json` is what fnMoa runs.
- Add a test with every change in behaviour.
- Never commit secrets. A secret the code needs is read from `env` and added
  to fnMoa's secrets by the owner.
- Do not edit `wrangler.jsonc`'s `name`: it is the published Worker's name.
- A change to the database is a new file in `migrations/`, never an edit to an old one.
- A change that touches both sides is one change: the web app and the API publish together.
