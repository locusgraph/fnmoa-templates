// Writes templates.json from each folder's .fnmoa/template.json.
// Run after changing a template: node scripts/index.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const templates = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, d.name, ".fnmoa", "template.json")))
  .map((d) => {
    const spec = JSON.parse(readFileSync(join(root, d.name, ".fnmoa", "template.json"), "utf8"));
    return {
      folder: d.name,
      ...spec,
      ...(spec.picture ? { picture: `${d.name}/${spec.picture}` } : {}),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
writeFileSync(join(root, "templates.json"), `${JSON.stringify({ version: 1, templates }, null, 2)}\n`);
console.log(`templates.json: ${templates.map((t) => t.folder).join(", ")}`);
