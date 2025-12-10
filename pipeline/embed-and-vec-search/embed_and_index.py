import os
import json
import pickle
import numpy as np
from pathlib import Path
import logging

from sentence_transformers import SentenceTransformer
import faiss


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EmbeddingIndexer:
    def __init__(self, model_name: str = "all-MiniLM-L6-v2", index_path: str = "./vector_index"):
        """Initialize embedding model and FAISS index location."""
        logger.info("Initializing EmbeddingIndexer with model: %s", model_name)
        self.model = SentenceTransformer(model_name)
        self.index_path = Path(index_path)
        self.index_path.mkdir(exist_ok=True)

        # FAISS index and metadata storage
        self.index = None
        self.chunk_metadata = []  # keep metadata order aligned with FAISS index
        self.dimension = 384  # embedding dimension for all-MiniLM-L6-v2

    def load_chunks(self, chunks_dir: str = "./storage/chunks"):
        """Load chunk JSON files produced by Person 2.

        Expected structure:
            storage/chunks/<doc_id>/chunk_0.json
            storage/chunks/<doc_id>/chunk_1.json
            ...
        """
        chunks = []
        chunks_path = Path(chunks_dir)

        if not chunks_path.exists():
            logger.warning("%s does not exist. Make sure Person 2 ran ingestion.", chunks_dir)
            return chunks

        # walk through all doc_id folders
        for doc_folder in chunks_path.iterdir():
            if doc_folder.is_dir():
                doc_id = doc_folder.name
                logger.info("Loading chunks from doc_id: %s", doc_id)

                # load all chunk_*.json files ordered by index
                chunk_files = sorted(
                    doc_folder.glob("chunk_*.json"),
                    key=lambda x: int(x.stem.split("_")[1]),
                )

                for chunk_file in chunk_files:
                    try:
                        with open(chunk_file, "r", encoding="utf-8") as f:
                            chunk_data = json.load(f)

                        # add convenience ID for downstream reference
                        chunk_data["chunk_id"] = f"{doc_id}_chunk_{chunk_data['chunk_index']}"
                        chunks.append(chunk_data)
                    except Exception as e:  # pragma: no cover - defensive logging
                        logger.error("Error loading %s: %s", chunk_file, e)

        logger.info("Loaded %d chunks from %s", len(chunks), chunks_dir)
        return chunks

    def embed_chunks(self, chunks):
        """Generate embeddings for all chunks."""
        if not chunks:
            logger.warning("No chunks to embed.")
            return np.array([])

        texts = [chunk["text"] for chunk in chunks]

        logger.info("Generating embeddings for %d chunks...", len(texts))
        embeddings = self.model.encode(
            texts,
            show_progress_bar=True,
            batch_size=32,
            convert_to_numpy=True,
            normalize_embeddings=False,  # normalized later for FAISS search
        )

        logger.info("Generated embeddings with shape: %s", embeddings.shape)
        return embeddings

    def build_index(self, embeddings, chunks):
        """Build FAISS index from embeddings."""
        if len(embeddings) == 0:
            logger.warning("No embeddings to index.")
            return

        self.index = faiss.IndexFlatIP(self.dimension)

        # normalize embeddings for cosine similarity
        embeddings_normalized = embeddings.copy()
        faiss.normalize_L2(embeddings_normalized)

        self.index.add(embeddings_normalized)
        self.chunk_metadata = chunks

        logger.info("Built FAISS index with %d vectors", self.index.ntotal)

    def save_index(self):
        """Persist index and metadata to disk."""
        if self.index is None:
            logger.warning("No index to save.")
            return

        index_file = self.index_path / "faiss.index"
        metadata_file = self.index_path / "metadata.pkl"

        faiss.write_index(self.index, str(index_file))
        with open(metadata_file, "wb") as f:
            pickle.dump(self.chunk_metadata, f)

        logger.info("Saved index to %s", self.index_path)
        logger.info("  - Index file: %s", index_file)
        logger.info("  - Metadata file: %s", metadata_file)

    def load_index(self):
        """Load existing index and metadata."""
        index_file = self.index_path / "faiss.index"
        metadata_file = self.index_path / "metadata.pkl"

        if not index_file.exists():
            logger.warning("No existing index found at %s", index_file)
            return False

        self.index = faiss.read_index(str(index_file))
        with open(metadata_file, "rb") as f:
            self.chunk_metadata = pickle.load(f)

        logger.info("Loaded index with %d vectors", self.index.ntotal)
        return True

    def search(self, query_text, k: int = 5, filters=None):
        """Search for top-k most similar chunks."""
        if self.index is None or self.index.ntotal == 0:
            logger.warning("Index is empty or not loaded.")
            return []

        query_embedding = self.model.encode([query_text], convert_to_numpy=True)
        faiss.normalize_L2(query_embedding)

        search_k = k * 3 if filters else k
        scores, indices = self.index.search(query_embedding, min(search_k, self.index.ntotal))

        results = []
        for idx, score in zip(indices[0], scores[0]):
            if idx < 0 or idx >= len(self.chunk_metadata):
                continue

            chunk = self.chunk_metadata[idx].copy()
            chunk["score"] = float(score)

            if filters:
                if "doc_id" in filters and chunk.get("doc_id") != filters["doc_id"]:
                    continue

            results.append(chunk)
            if len(results) >= k:
                break

        logger.info("Search returned %d results for query: '%s...'", len(results), query_text[:50])
        return results


def main():
    """Run full pipeline: load chunks, embed, index, save, and test search."""
    print("=" * 60)
    print("PERSON 3: Embeddings & Vector Index")
    print("=" * 60)

    indexer = EmbeddingIndexer()

    print("\n[1/4] Loading chunks from storage/chunks/...")
    chunks = indexer.load_chunks("./storage/chunks")

    if not chunks:
        print("\n❌ ERROR: No chunks found!")
        print("Make sure Person 2 has run ingestion and chunks exist at:")
        print("  storage/chunks/<doc_id>/chunk_0.json")
        print("  storage/chunks/<doc_id>/chunk_1.json")
        print("  ...")
        return

    print(f"✅ Loaded {len(chunks)} chunks")

    print("\nSample chunk:")
    sample = chunks[0]
    print(f"  - doc_id: {sample.get('doc_id')}")
    print(f"  - chunk_index: {sample.get('chunk_index')}")
    print(f"  - source: {sample.get('source')}")
    print(f"  - text preview: {sample.get('text', '')[:100]}...")

    print("\n[2/4] Generating embeddings...")
    embeddings = indexer.embed_chunks(chunks)
    print(f"✅ Generated embeddings with shape: {embeddings.shape}")

    print("\n[3/4] Building FAISS index...")
    indexer.build_index(embeddings, chunks)
    print(f"✅ Built index with {indexer.index.ntotal} vectors")

    print("\n[4/4] Saving index to disk...")
    indexer.save_index()
    print("✅ Index saved successfully")

    print("\n" + "=" * 60)
    print("TESTING VECTOR SEARCH")
    print("=" * 60)

    test_queries = [
        "GMP compliance requirements",
        "quality control procedures",
        "regulatory documentation",
    ]

    for query in test_queries:
        print(f"\nQuery: '{query}'")
        results = indexer.search(query, k=3)

        if results:
            for i, result in enumerate(results, 1):
                print(f"  {i}. Score: {result['score']:.4f}")
                print(f"     Chunk: {result['chunk_id']}")
                print(f"     Source: {result.get('source', 'N/A')}")
                print(f"     Text: {result['text'][:100]}...")
        else:
            print("  No results found")

    print("\n" + "=" * 60)
    print("✅ INDEXING COMPLETE")
    print("=" * 60)
    print("\nNext steps:")
    print("  1. Start the vector search API: python vector_search_api.py")
    print("  2. Run tests: python -m pytest test_embeddings.py")
    print("  3. Coordinate with Person 4 (RAG Orchestrator)")


if __name__ == "__main__":
    main()

