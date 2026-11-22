import { describe, expect, it } from "vitest";
import worker, { readContact } from "../worker/index";

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
};

const env = { ASSETS: { fetch: async () => new Response("site") } as unknown as Fetcher };

describe("the contact form", () => {
  it("takes a filled form and thanks the sender", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/api/contact", {
        method: "POST",
        body: form({ name: "Ada", email: "ada@example.com", message: "Hello" }),
      }),
      env
    );
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("https://example.com/?sent=1");
  });

  it("says what is wrong with a form it cannot take", () => {
    expect(readContact(form({ name: "Ada", email: "nope", message: "Hi" }))).toEqual({
      error: "That email does not look right.",
    });
    expect(readContact(form({ name: "", email: "a@b.co", message: "Hi" }))).toEqual({
      error: "Every field is needed.",
    });
  });

  it("serves the site for everything else", async () => {
    const response = await worker.fetch(new Request("https://example.com/"), env);
    expect(await response.text()).toBe("site");
  });
});
