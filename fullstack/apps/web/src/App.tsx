import { type FormEvent, useEffect, useState } from "react";
import { addNote, listNotes, type Note } from "./notes";

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    listNotes().then(setNotes, (e: Error) => setError(e.message));
  }, []);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get("text") ?? "");
    try {
      const note = await addNote(text);
      setNotes((all) => [note, ...all]);
      setError(undefined);
      form.reset();
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <main
      style={{
        maxWidth: "40rem",
        margin: "0 auto",
        padding: "3rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>{{ title }}</h1>
      <form onSubmit={onSubmit}>
        <input name="text" placeholder="Write a note" />
        <button type="submit">Add</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </main>
  );
}
