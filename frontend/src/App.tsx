import { type FormEvent, useEffect, useState } from "react";
import { checkSignIn, type Page, pageOf } from "./signIn";

const go = (path: string) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

export function App() {
  const [page, setPage] = useState<Page>(pageOf(window.location.pathname));
  useEffect(() => {
    const onPop = () => setPage(pageOf(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return (
    <>
      <nav>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            go("/");
          }}
        >
          <strong>{{ title }}</strong>
        </a>
        <a
          href="/sign-in"
          onClick={(e) => {
            e.preventDefault();
            go("/sign-in");
          }}
        >
          Sign in
        </a>
      </nav>
      <main>{page === "home" ? <Home /> : <SignIn signingUp={page === "sign-up"} />}</main>
    </>
  );
}

function Home() {
  return (
    <>
      <h1>Welcome to {{ title }}</h1>
      <p>Ask fnMoa to add the pages your app needs.</p>
    </>
  );
}

function SignIn({ signingUp }: { signingUp: boolean }) {
  const [error, setError] = useState<string>();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const said = checkSignIn(
      String(data.get("email") ?? ""),
      String(data.get("password") ?? ""),
      signingUp
    );
    // Signing in for real needs a backend: ask fnMoa to add one.
    setError(said ?? "Signing in is not set up yet.");
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>{signingUp ? "Create your account" : "Sign in"}</h1>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      {error && <p className="error">{error}</p>}
      <button type="submit">{signingUp ? "Sign up" : "Sign in"}</button>
      <a
        href={signingUp ? "/sign-in" : "/sign-up"}
        onClick={(e) => {
          e.preventDefault();
          go(signingUp ? "/sign-in" : "/sign-up");
        }}
      >
        {signingUp ? "I have an account" : "Create an account"}
      </a>
    </form>
  );
}
