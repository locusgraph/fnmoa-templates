# How to work in this project

This is a one-page site with a contact form (Astro, static), made from an fnMoa template. It is published to Cloudflare
Workers by fnMoa; nobody deploys it by hand.

## Layout

- `src/pages/index.astro`: the page.
- `worker/index.ts`: the Worker; the contact form posts to `/api/contact`.
- `test/`: tests for the Worker (Vitest).

## Rules

- Keep the health check green: `npm run typecheck`, `npm test` and
  `npm run build` must pass. `.fnmoa/checks.json` is what fnMoa runs.
- Add a test with every change in behaviour.
- Never commit secrets. A secret the code needs is read from `env` and added
  to fnMoa's secrets by the owner.
- Do not edit `wrangler.jsonc`'s `name`: it is the published Worker's name.
