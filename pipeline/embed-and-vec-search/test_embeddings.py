import unittest
import json
import tempfile
import shutil
from pathlib import Path

import numpy as np

from embed_and_index import EmbeddingIndexer


class TestEmbeddingIndexer(unittest.TestCase):
    def setUp(self):
        """Create temp directory with sample chunks matching Person 2's format."""
        self.temp_dir = tempfile.mkdtemp()
        self.chunks_dir = Path(self.temp_dir) / "chunks"
        self.index_dir = Path(self.temp_dir) / "index"

        doc_id = "test_doc_123"
        doc_dir = self.chunks_dir / doc_id
        doc_dir.mkdir(parents=True)

        sample_chunks = [
            {
                "doc_id": doc_id,
                "chunk_index": 0,
                "text": "This document describes GMP compliance requirements for pharmaceutical manufacturing.",
                "start_offset": 0,
                "end_offset": 88,
                "source": "test_document.pdf",
                "page": 1,
            },
            {
                "doc_id": doc_id,
                "chunk_index": 1,
                "text": "Quality control procedures must be documented and validated according to regulatory standards.",
                "start_offset": 88,
                "end_offset": 183,
                "source": "test_document.pdf",
                "page": 1,
            },
            {
                "doc_id": doc_id,
                "chunk_index": 2,
                "text": "All manufacturing processes require proper documentation and traceability.",
                "start_offset": 183,
                "end_offset": 258,
                "source": "test_document.pdf",
                "page": 2,
            },
        ]

        for chunk in sample_chunks:
            chunk_file = doc_dir / f"chunk_{chunk['chunk_index']}.json"
            with open(chunk_file, "w", encoding="utf-8") as f:
                json.dump(chunk, f, indent=2)

        self.indexer = EmbeddingIndexer(index_path=self.index_dir)

    def tearDown(self):
        """Clean up temp directory."""
        shutil.rmtree(self.temp_dir)

    def test_load_chunks(self):
        """Test loading chunks from Person 2's format."""
        chunks = self.indexer.load_chunks(self.chunks_dir)

        self.assertEqual(len(chunks), 3, "Should load all 3 chunks")
        self.assertEqual(chunks[0]["chunk_index"], 0)
        self.assertEqual(chunks[1]["chunk_index"], 1)
        self.assertEqual(chunks[2]["chunk_index"], 2)
        self.assertIn("chunk_id", chunks[0])
        self.assertTrue(chunks[0]["chunk_id"].startswith("test_doc_123_chunk_"))

    def test_embed_chunks(self):
        """Embedding generation shape should be correct."""
        chunks = self.indexer.load_chunks(self.chunks_dir)
        embeddings = self.indexer.embed_chunks(chunks)

        self.assertEqual(embeddings.shape[0], 3, "Should have 3 embeddings")
        self.assertEqual(embeddings.shape[1], 384, "MiniLM dimension should be 384")
        self.assertGreater(np.abs(embeddings).sum(), 0, "Embeddings should not be all zeros")

    def test_build_and_search(self):
        """Index building and search should work."""
        chunks = self.indexer.load_chunks(self.chunks_dir)
        embeddings = self.indexer.embed_chunks(chunks)
        self.indexer.build_index(embeddings, chunks)

        self.assertEqual(self.indexer.index.ntotal, 3)

        results = self.indexer.search("GMP compliance pharmaceutical", k=2)
        self.assertGreater(len(results), 0, "Should return at least 1 result")
        self.assertIn("chunk_id", results[0])
        self.assertIn("score", results[0])
        self.assertIn("text", results[0])
        self.assertIn("doc_id", results[0])
        self.assertIn("source", results[0])
        self.assertGreater(results[0]["score"], 0, "Score should be positive")

    def test_search_with_filters(self):
        """Search should respect doc_id filter."""
        chunks = self.indexer.load_chunks(self.chunks_dir)
        embeddings = self.indexer.embed_chunks(chunks)
        self.indexer.build_index(embeddings, chunks)

        results = self.indexer.search("quality control", k=5, filters={"doc_id": "test_doc_123"})
        self.assertGreater(len(results), 0)

        results = self.indexer.search("quality control", k=5, filters={"doc_id": "wrong_doc"})
        self.assertEqual(len(results), 0)

    def test_save_and_load_index(self):
        """Index persistence should work."""
        chunks = self.indexer.load_chunks(self.chunks_dir)
        embeddings = self.indexer.embed_chunks(chunks)
        self.indexer.build_index(embeddings, chunks)
        self.indexer.save_index()

        index_file = self.index_dir / "faiss.index"
        metadata_file = self.index_dir / "metadata.pkl"
        self.assertTrue(index_file.exists(), "Index file should exist")
        self.assertTrue(metadata_file.exists(), "Metadata file should exist")

        new_indexer = EmbeddingIndexer(index_path=self.index_dir)
        success = new_indexer.load_index()

        self.assertTrue(success, "Should successfully load index")
        self.assertEqual(new_indexer.index.ntotal, 3, "Loaded index should have 3 vectors")
        self.assertEqual(len(new_indexer.chunk_metadata), 3, "Should load 3 metadata entries")


if __name__ == "__main__":
    unittest.main(verbosity=2)

