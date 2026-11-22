import { describe, expect, it } from "vitest";
import { checkSignIn, pageOf } from "../src/signIn";

describe("sign in", () => {
  it("says what is missing before sending", () => {
    expect(checkSignIn("nope", "x", false)).toBe("Enter your email address.");
    expect(checkSignIn("a@b.co", "", false)).toBe("Enter your password.");
    expect(checkSignIn("a@b.co", "short", true)).toBe(
      "Use at least 8 characters for your password."
    );
    expect(checkSignIn("a@b.co", "short", false)).toBeUndefined();
  });

  it("finds the page for a path", () => {
    expect(pageOf("/sign-up")).toBe("sign-up");
    expect(pageOf("/anything")).toBe("home");
  });
});
