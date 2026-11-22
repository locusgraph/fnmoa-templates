-- The first table. Each later change is a new numbered file; fnMoa applies
-- them before publishing.
CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
