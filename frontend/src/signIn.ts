/** What a sign-in or sign-up form says before it is sent, or nothing when it is fine. */
export function checkSignIn(
  email: string,
  password: string,
  signingUp: boolean
): string | undefined {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return "Enter your email address.";
  if (password.length === 0) return "Enter your password.";
  if (signingUp && password.length < 8) return "Use at least 8 characters for your password.";
  return undefined;
}

/** The app's pages, by their path. */
export type Page = "home" | "sign-in" | "sign-up";

export const pageOf = (path: string): Page =>
  path === "/sign-in" ? "sign-in" : path === "/sign-up" ? "sign-up" : "home";
