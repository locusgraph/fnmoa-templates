import { describe, expect, it } from "vitest";
import { app } from "../apps/api/src/api";

/** A stand-in for D1 that keeps notes in a list. */
function fakeDb() {
  const notes: Array<{ id: number; text: string; created_at: string }> = [];
  return {
    prepare(sql: string) {
      let bound: unknown[] = [];
      const statement = {
        bind(...values: unknown[]) {
          bound = values;
          return statement;
        },
        async all() {
          return { results: [...notes].reverse() };
        },
        async first() {
          if (!sql.startsWith("INSERT")) return null;
          const note = {
            id: notes.length + 1,
            text: String(bound[0]),
            created_at: "2026-01-01 00:00:00",
          };
          notes.push(note);
          return note;
        },
      };
      return statement;
    },
  } as unknown as D1Database;
}

describe("the notes API", () => {
  it("adds a note and lists it", async () => {
    const env = { DB: fakeDb() };
    const added = await app.request(
      "/api/notes",
      { method: "POST", body: JSON.stringify({ text: " Hi " }) },
      env
    );
    expect(added.status).toBe(201);
    const listed = await app.request("/api/notes", {}, env);
    expect(await listed.json()).toEqual({
      notes: [{ id: 1, text: "Hi", created_at: "2026-01-01 00:00:00" }],
    });
  });

  it("refuses an empty note", async () => {
    const response = await app.request(
      "/api/notes",
      { method: "POST", body: "{}" },
      { DB: fakeDb() }
    );
    expect(response.status).toBe(400);
  });

  it("answers its health", async () => {
    expect(await (await app.request("/api/health", {}, { DB: fakeDb() })).json()).toEqual({
      ok: true,
    });
  });
});
