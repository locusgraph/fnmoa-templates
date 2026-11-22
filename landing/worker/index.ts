/**
 * The site's Worker: the contact form posts here; everything else is the
 * built site, served from ASSETS.
 */
export interface Env {
  ASSETS: Fetcher;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}

/** A contact form's fields, or why they cannot be taken. */
export function readContact(form: FormData): Contact | { error: string } {
  const field = (name: string) => String(form.get(name) ?? "").trim();
  const contact = { name: field("name"), email: field("email"), message: field("message") };
  if (!contact.name || !contact.email || !contact.message)
    return { error: "Every field is needed." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email))
    return { error: "That email does not look right." };
  if (contact.message.length > 5000) return { error: "The message is too long." };
  return contact;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return new Response("Use the form.", { status: 405 });
      const contact = readContact(await request.formData());
      if ("error" in contact) return new Response(contact.error, { status: 400 });
      // Where messages go is the owner's to choose: an email service, a
      // database. Until then they are kept in the Worker's logs.
      console.log("contact", JSON.stringify(contact));
      return Response.redirect(new URL("/?sent=1", url).toString(), 303);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
