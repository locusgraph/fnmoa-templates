export interface Note {
  id: number;
  text: string;
  created_at: string;
}

/** The notes the API has, newest first. */
export async function listNotes(fetcher: typeof fetch = fetch): Promise<Note[]> {
  const response = await fetcher("/api/notes");
  if (!response.ok) throw new Error(`The notes could not be loaded (${response.status}).`);
  return ((await response.json()) as { notes: Note[] }).notes;
}

/** Adds a note; answers it, or throws what the API said. */
export async function addNote(text: string, fetcher: typeof fetch = fetch): Promise<Note> {
  const response = await fetcher("/api/notes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const body = (await response.json()) as { note?: Note; error?: string };
  if (!response.ok || !body.note) throw new Error(body.error ?? "The note could not be added.");
  return body.note;
}
