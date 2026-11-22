# fnMoa templates

The starting points fnMoa offers under **New project**. Each folder is one
template; fnMoa copies the folder you choose into a new repository of your
own and fills in your answers.

| Folder | Template |
| --- | --- |
| `landing/` | Landing page |
| `frontend/` | Web app |
| `fullstack/` | Full stack app |
| `backend/` | API |

## How fnMoa reads this repository

- `templates.json` lists every template: its folder, name, description,
  picture and the questions New project asks. fnMoa reads this one file, so
  listing templates needs no GitHub sign-in.
- Each folder keeps its own `.fnmoa/template.json` (the same entry, the source
  of truth) and `.fnmoa/checks.json` (the health checks the new project runs).

## Changing a template

1. Edit the files in its folder, including `.fnmoa/template.json`.
2. Run `node scripts/index.mjs` to rewrite `templates.json`.
3. Commit both. Everyone sees the change on their next New project.

## Adding a template

Make a new folder with a `.fnmoa/template.json` and `.fnmoa/checks.json`,
then run `node scripts/index.mjs`.
