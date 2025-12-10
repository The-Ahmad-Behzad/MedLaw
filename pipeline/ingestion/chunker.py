"""
Chunking utilities for sliding-window, word-based segmentation.
"""

from __future__ import annotations

from typing import List, Dict, Optional, Any


def split_words(text: str) -> List[str]:
    """Split text into words preserving simple whitespace separation."""
    if not text:
        return []
    return text.split()


def build_page_ranges(page_texts: List[Dict[str, Any]]) -> List[Dict[str, int]]:
    """
    Build word-offset ranges for each page given page_texts entries
    of the form {"page": int, "text": str}.
    Returns list of dicts with start_offset (inclusive) and end_offset (exclusive).
    """
    ranges: List[Dict[str, int]] = []
    offset = 0
    for entry in page_texts:
        page_num = entry.get("page")
        words = split_words(entry.get("text", ""))
        length = len(words)
        start = offset
        end = offset + length
        ranges.append({"page": page_num, "start_offset": start, "end_offset": end})
        offset = end
    return ranges


def _find_page(page_ranges: Optional[List[Dict[str, int]]], start_offset: int) -> Optional[int]:
    """Return page number containing the start_offset based on ranges."""
    if not page_ranges:
        return None
    for rng in page_ranges:
        if rng["start_offset"] <= start_offset < rng["end_offset"]:
            return rng["page"]
    # If beyond last range, return last page id
    return page_ranges[-1]["page"] if page_ranges else None


def chunk_text(
    text: str,
    doc_id: str,
    chunk_size: int = 500,
    overlap: int = 50,
    source: Optional[str] = None,
    page_ranges: Optional[List[Dict[str, int]]] = None,
) -> List[Dict]:
    """
    Split text into overlapping word chunks with metadata.
    Chunks follow sliding window:
      chunk_1 = words[0:chunk_size]
      chunk_2 = words[chunk_size - overlap : chunk_size - overlap + chunk_size]
    """
    words = split_words(text)
    if not words:
        return []

    step = max(chunk_size - overlap, 1)
    chunks: List[Dict] = []

    start = 0
    index = 0
    total = len(words)

    while start < total:
        end = min(start + chunk_size, total)
        chunk_words = words[start:end]
        if not chunk_words:
            break

        chunk_text_str = " ".join(chunk_words)
        chunks.append(
            {
                "doc_id": doc_id,
                "chunk_index": index,
                "text": chunk_text_str,
                "start_offset": start,
                "end_offset": end,
                "source": source,
                "page": _find_page(page_ranges, start),
            }
        )

        index += 1
        start += step

    return chunks

