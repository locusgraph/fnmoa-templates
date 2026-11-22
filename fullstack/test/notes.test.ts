import { describe, expect, it } from "vitest";
import { addNote } from "../apps/web/src/notes";

describe("the web app's notes", () => {
  it("says what the API said when a note is refused", async () => {
    const refusing = (async () =>
      new Response(JSON.stringify({ error: "A note needs some text." }), {
        status: 400,
      })) as typeof fetch;
    await expect(addNote("", refusing)).rejects.toThrow("A note needs some text.");
  });
});
