import { Hono } from "hono";

export interface Env {
  DB: D1Database;
}

interface Note {
  id: number;
  text: string;
  created_at: string;
}

/** The API. Every route is under /api. */
export const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.get("/health", (c) => c.json({ ok: true }));

app.get("/notes", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, text, created_at FROM notes ORDER BY id DESC LIMIT 100"
  ).all<Note>();
  return c.json({ notes: results });
});

app.post("/notes", async (c) => {
  const body = (await c.req.json().catch(() => ({}))) as { text?: unknown };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return c.json({ error: "A note needs some text." }, 400);
  if (text.length > 2000) return c.json({ error: "A note is at most 2000 characters." }, 400);
  const note = await c.env.DB.prepare(
    "INSERT INTO notes (text) VALUES (?) RETURNING id, text, created_at"
  )
    .bind(text)
    .first<Note>();
  return c.json({ note }, 201);
});
