"""
Utility helpers for ingestion pipeline.
"""

from __future__ import annotations

import json
import os
import uuid
from pathlib import Path
from typing import Any


def generate_doc_id() -> str:
    """Generate a unique hex document identifier."""
    return uuid.uuid4().hex


def ensure_folder(path: str | Path) -> None:
    """Create folder path if it does not exist."""
    Path(path).mkdir(parents=True, exist_ok=True)


def save_chunk(doc_id: str, chunk_index: int, chunk_data: Any) -> Path:
    """
    Save chunk data to storage/chunks/<doc_id>/chunk_<index>.json.
    Returns the path to the saved file.
    """
    base_dir = Path("storage") / "chunks" / doc_id
    ensure_folder(base_dir)

    file_path = base_dir / f"chunk_{chunk_index}.json"
    with file_path.open("w", encoding="utf-8") as f:
        json.dump(chunk_data, f, ensure_ascii=False, indent=2)

    return file_path

