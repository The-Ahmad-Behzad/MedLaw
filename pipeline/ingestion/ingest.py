"""
CLI entrypoint for ingestion pipeline.
Usage:
    python ingest.py <file_path>
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

from chunker import chunk_text, build_page_ranges
from extractor import extract_text
from utils import generate_doc_id, save_chunk


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest a document and chunk it.")
    parser.add_argument("file_path", help="Path to the input document (pdf/docx/txt).")
    args = parser.parse_args()

    file_path = Path(args.file_path)
    if not file_path.exists():
        print(f"[error] File not found: {file_path}")
        sys.exit(1)

    try:
        doc_id = generate_doc_id()
        full_text, page_texts = extract_text(file_path)
        page_ranges = build_page_ranges(page_texts)
        chunks = chunk_text(full_text, doc_id, source=file_path.name, page_ranges=page_ranges)
    except Exception as exc:  # pylint: disable=broad-except
        print(f"[error] Extraction failed: {exc}")
        sys.exit(1)

    for idx, chunk in enumerate(chunks):
        save_chunk(doc_id, idx, chunk)

    output_folder = Path("storage") / "chunks" / doc_id
    print("Ingestion summary")
    print("-----------------")
    print(f"doc_id: {doc_id}")
    print(f"file: {file_path.name}")
    print(f"total_chars: {len(full_text)}")
    print(f"pages: {len(page_texts)}")
    print(f"chunks: {len(chunks)}")
    print(f"output: {output_folder.resolve()}")


if __name__ == "__main__":
    main()

