import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Optional

from app.config import BASE_DIR, settings


def _database_path() -> Path:
    url = settings.DATABASE_URL
    if url.startswith("sqlite:///"):
        raw_path = url.replace("sqlite:///", "", 1)
        path = Path(raw_path)
        if not path.is_absolute():
            return (BASE_DIR / path).resolve()
        return path
    return (BASE_DIR / "fupanbao.db").resolve()


class ThemeStore:
    """SQLite storage for user-managed themes."""

    def __init__(self):
        self.db_path = _database_path()
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.init_db()

    def connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        return conn

    def init_db(self) -> None:
        with self.connect() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS themes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    category TEXT NOT NULL DEFAULT '未分组',
                    source TEXT NOT NULL DEFAULT 'mine',
                    parent_id INTEGER,
                    sort_order INTEGER NOT NULL DEFAULT 0,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
                """
            )
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS theme_stocks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    theme_id INTEGER NOT NULL,
                    thscode TEXT NOT NULL,
                    ticker TEXT NOT NULL,
                    name TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    UNIQUE(theme_id, thscode),
                    FOREIGN KEY(theme_id) REFERENCES themes(id) ON DELETE CASCADE
                )
                """
            )
            conn.commit()

    def list_themes(self, source: str = "mine") -> list[dict]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT
                    t.*,
                    COUNT(s.id) AS stock_count
                FROM themes t
                LEFT JOIN theme_stocks s ON s.theme_id = t.id
                WHERE t.source = ?
                GROUP BY t.id
                ORDER BY t.sort_order ASC, t.id DESC
                """,
                (source,),
            ).fetchall()
            return [dict(row) for row in rows]

    def create_theme(self, name: str, category: str = "未分组", source: str = "mine") -> dict:
        now = datetime.now().isoformat(timespec="seconds")
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO themes (name, category, source, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (name, category or "未分组", source, now, now),
            )
            conn.commit()
            return self.get_theme(cursor.lastrowid)

    def get_theme(self, theme_id: int) -> dict:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM themes WHERE id = ?", (theme_id,)).fetchone()
            if row is None:
                raise KeyError("题材不存在")
            item = dict(row)
            item["stocks"] = self.list_stocks(theme_id)
            item["stock_count"] = len(item["stocks"])
            return item

    def delete_theme(self, theme_id: int) -> None:
        with self.connect() as conn:
            conn.execute("DELETE FROM themes WHERE id = ?", (theme_id,))
            conn.commit()

    def list_stocks(self, theme_id: int) -> list[dict]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT id, theme_id, thscode, ticker, name, created_at
                FROM theme_stocks
                WHERE theme_id = ?
                ORDER BY id DESC
                """,
                (theme_id,),
            ).fetchall()
            return [dict(row) for row in rows]

    def add_stock(self, theme_id: int, thscode: str, ticker: str, name: str) -> dict:
        now = datetime.now().isoformat(timespec="seconds")
        with self.connect() as conn:
            row = conn.execute("SELECT id FROM themes WHERE id = ?", (theme_id,)).fetchone()
            if row is None:
                raise KeyError("题材不存在")
            conn.execute(
                """
                INSERT OR REPLACE INTO theme_stocks (theme_id, thscode, ticker, name, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (theme_id, thscode, ticker, name, now),
            )
            conn.commit()
        return self.get_theme(theme_id)

    def remove_stock(self, theme_id: int, thscode: str) -> dict:
        with self.connect() as conn:
            conn.execute(
                "DELETE FROM theme_stocks WHERE theme_id = ? AND thscode = ?",
                (theme_id, thscode),
            )
            conn.commit()
        return self.get_theme(theme_id)


theme_store = ThemeStore()
