# How to work in this project

This is an API (Hono on Cloudflare Workers) with a D1 database, made from an fnMoa template. It is published to Cloudflare
Workers by fnMoa; nobody deploys it by hand.

## Layout

- `src/api.ts`: the routes, all under `/api`.
- `migrations/`: the database's changes, numbered; never edit one already published, add a new one.
- `test/`: tests (Vitest), with a stand-in for D1.

## Rules

- Keep the health check green: `npm run typecheck`, `npm test` and
  `npm run build` must pass. `.fnmoa/checks.json` is what fnMoa runs.
- Add a test with every change in behaviour.
- Never commit secrets. A secret the code needs is read from `env` and added
  to fnMoa's secrets by the owner.
- Do not edit `wrangler.jsonc`'s `name`: it is the published Worker's name.
- A change to the database is a new file in `migrations/`, never an edit to an old one.
