#!/usr/bin/env python3
"""Build a minimal Anki .apkg package from generator JSON on stdin."""

import json
import sqlite3
import sys
import tempfile
import zipfile
from pathlib import Path


SCHEMA = """
CREATE TABLE col (
  id integer primary key,
  crt integer not null,
  mod integer not null,
  scm integer not null,
  ver integer not null,
  dty integer not null,
  usn integer not null,
  ls integer not null,
  conf text not null,
  models text not null,
  decks text not null,
  dconf text not null,
  tags text not null
);
CREATE TABLE notes (
  id integer primary key,
  guid text not null,
  mid integer not null,
  mod integer not null,
  usn integer not null,
  tags text not null,
  flds text not null,
  sfld text not null,
  csum integer not null,
  flags integer not null,
  data text not null
);
CREATE TABLE cards (
  id integer primary key,
  nid integer not null,
  did integer not null,
  ord integer not null,
  mod integer not null,
  usn integer not null,
  type integer not null,
  queue integer not null,
  due integer not null,
  ivl integer not null,
  factor integer not null,
  reps integer not null,
  lapses integer not null,
  left integer not null,
  odue integer not null,
  odid integer not null,
  flags integer not null,
  data text not null
);
CREATE TABLE revlog (
  id integer primary key,
  cid integer not null,
  usn integer not null,
  ease integer not null,
  ivl integer not null,
  lastIvl integer not null,
  factor integer not null,
  time integer not null,
  type integer not null
);
CREATE TABLE graves (
  usn integer not null,
  oid integer not null,
  type integer not null
);
CREATE INDEX ix_notes_usn on notes (usn);
CREATE INDEX ix_cards_usn on cards (usn);
CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid);
CREATE INDEX ix_cards_sched on cards (did, queue, due);
CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);
"""


def compact_json(value):
  return json.dumps(value, ensure_ascii=True, separators=(",", ":"))


def build_apkg(data, output_path):
  output_path.parent.mkdir(parents=True, exist_ok=True)
  mod = data["mod"]
  metadata = data["metadata"]

  with tempfile.TemporaryDirectory(prefix="js-reading-anki-") as tmp:
    tmp_path = Path(tmp)
    collection_path = tmp_path / "collection.anki2"

    connection = sqlite3.connect(collection_path)
    try:
      cursor = connection.cursor()
      cursor.executescript(SCHEMA)
      cursor.execute(
        "INSERT INTO col VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
          1,
          mod,
          mod,
          mod * 1000,
          11,
          0,
          -1,
          0,
          compact_json(metadata["conf"]),
          compact_json(metadata["models"]),
          compact_json(metadata["decks"]),
          compact_json(metadata["dconf"]),
          "{}",
        ),
      )

      cursor.executemany(
        "INSERT INTO notes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          (
            note["noteId"],
            note["guid"],
            note["modelId"],
            note["mod"],
            -1,
            note["tags"],
            note["fields"],
            note["sortField"],
            note["checksum"],
            0,
            "",
          )
          for note in data["notes"]
        ],
      )

      cursor.executemany(
        "INSERT INTO cards VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          (
            note["cardId"],
            note["noteId"],
            note["deckId"],
            0,
            note["mod"],
            -1,
            0,
            0,
            note["due"],
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            "",
          )
          for note in data["notes"]
        ],
      )
      connection.commit()
    finally:
      connection.close()

    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED, allowZip64=True) as package:
      package.write(collection_path, "collection.anki2")
      package.writestr("media", "{}\n")


def main():
  if len(sys.argv) != 2:
    raise SystemExit("usage: build-apkg.py OUTPUT.apkg")

  data = json.load(sys.stdin)
  build_apkg(data, Path(sys.argv[1]).resolve())


if __name__ == "__main__":
  main()
