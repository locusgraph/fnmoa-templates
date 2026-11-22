# How to work in this project

This is a web app (Vite and React, served as static files), made from an fnMoa template. It is published to Cloudflare
Workers by fnMoa; nobody deploys it by hand.

## Layout

- `src/App.tsx`: the pages.
- `src/signIn.ts`: logic kept out of components, so it can be tested.
- `test/`: tests (Vitest).

## Rules

- Keep the health check green: `npm run typecheck`, `npm test` and
  `npm run build` must pass. `.fnmoa/checks.json` is what fnMoa runs.
- Add a test with every change in behaviour.
- Never commit secrets. A secret the code needs is read from `env` and added
  to fnMoa's secrets by the owner.
- Do not edit `wrangler.jsonc`'s `name`: it is the published Worker's name.
- Keep logic in plain modules with tests; components stay thin.
