"""
Text extraction utilities for ingestion pipeline.
Supports PDF (with OCR fallback), DOCX, and TXT inputs.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import List, Tuple, Dict

import pdfplumber
import pytesseract
from docx import Document
from PIL import Image


def detect_file_type(file_path: str | Path) -> str:
    """
    Detect supported file type based on extension.
    Returns one of: 'pdf', 'docx', 'txt', 'image'.
    Raises ValueError for unsupported extensions.
    """
    suffix = Path(file_path).suffix.lower()
    if suffix == ".pdf":
        return "pdf"
    if suffix == ".docx":
        return "docx"
    if suffix == ".txt":
        return "txt"
    if suffix in {".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp", ".webp"}:
        return "image"
    raise ValueError(f"Unsupported file type: {suffix}")


def clean_text(text: str) -> str:
    """
    Normalize whitespace and collapse excessive newlines.
    """
    if not text:
        return ""
    text = text.replace("\r", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def _extract_pdf(file_path: Path) -> Tuple[str, List[Dict[str, str]]]:
    full_text_parts: List[str] = []
    page_texts: List[Dict[str, str]] = []

    with pdfplumber.open(file_path) as pdf:
        for idx, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            text = clean_text(text)

            if not text:
                # OCR fallback for scanned or empty pages
                page_image = page.to_image(resolution=300)
                pil_image: Image.Image = page_image.original
                text = clean_text(pytesseract.image_to_string(pil_image))

            page_texts.append({"page": idx, "text": text})
            full_text_parts.append(text)

    full_text = clean_text(" ".join(full_text_parts))
    return full_text, page_texts


def _extract_docx(file_path: Path) -> Tuple[str, List[Dict[str, str]]]:
    doc = Document(file_path)
    paragraphs = [para.text for para in doc.paragraphs if para.text]
    text = clean_text(" ".join(paragraphs))
    return text, [{"page": 1, "text": text}]


def _extract_txt(file_path: Path) -> Tuple[str, List[Dict[str, str]]]:
    text = Path(file_path).read_text(encoding="utf-8", errors="ignore")
    text = clean_text(text)
    return text, [{"page": 1, "text": text}]


def _extract_image(file_path: Path) -> Tuple[str, List[Dict[str, str]]]:
    """
    OCR single image file; treat as one-page document.
    """
    with Image.open(file_path) as img:
        text = clean_text(pytesseract.image_to_string(img))
    return text, [{"page": 1, "text": text}]


def extract_text(file_path: str | Path) -> Tuple[str, List[Dict[str, str]]]:
    """
    Extract text from PDF/DOCX/TXT.
    Returns (full_text_string, page_texts_list).
    """
    path = Path(file_path)
    ftype = detect_file_type(path)

    if ftype == "pdf":
        return _extract_pdf(path)
    if ftype == "docx":
        return _extract_docx(path)
    if ftype == "txt":
        return _extract_txt(path)
    if ftype == "image":
        return _extract_image(path)

    raise ValueError(f"Unhandled file type: {ftype}")

