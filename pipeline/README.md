# Python RAG Pipeline - Person 2, 3, & 4

Document processing, embedding generation, vector search, and RAG orchestration for MedLaw Regulatory Copilot.

## 🏗️ Architecture

```
pipeline/
├── ingestion/              # Person 2: Document Ingestion ✅
├── embed-and-vec-search/   # Person 3: Embeddings & Vector Search ✅
├── rag-orchestrator/       # Person 4: RAG Orchestration 🔄
└── storage/                # Shared storage
    ├── chunks/             # Processed document chunks
    └── uploads/            # Original uploaded files
```

## 👥 Module Responsibilities

### Person 2 - Document Ingestion ✅ COMPLETE
**Status**: Production-ready

Handles document upload, text extraction, and chunking:
- PDF parsing (pdfplumber)
- DOCX parsing (python-docx)
- OCR for scanned documents (pytesseract)
- Intelligent text chunking (500-800 tokens, 20% overlap)
- Metadata generation (doc_id, page, offsets)

**Output**: JSON chunks stored in `storage/chunks/<doc_id>/`

See [ingestion/README.md](ingestion/README.md)

### Person 3 - Embeddings & Vector Search ✅ COMPLETE
**Status**: Production-ready, API running on port 5001

Generates embeddings and provides vector search:
- Embedding generation (all-MiniLM-L6-v2)
- FAISS indexing (FlatIP for cosine similarity)
- Flask REST API for vector search
- Metadata filtering support
- Unit tests (5/5 passing)

**Endpoints**:
- `POST /vector/search` - Search for relevant chunks
- `POST /vector/index` - Rebuild index
- `GET /health` - Health check

See [embed-and-vec-search/README.md](embed-and-vec-search/README.md)

### Person 4 - RAG Orchestrator 🔄 COMING SOON
**Status**: Awaiting implementation

Orchestrates the RAG pipeline:
- Retrieval logic (calls Person 3's vector search)
- Prompt assembly (combine context + query)
- LLM integration (calls Person 5's LLM wrapper)
- Response post-processing (narrative + checklist + citations)

**Expected Output**:
```json
{
  "narrative": "Compliance analysis...",
  "checklist": [
    {
      "id": "check_1",
      "requirement": "...",
      "status": "compliant",
      "confidence": 0.9,
      "evidence": "chunk_123",
      "recommendation": "..."
    }
  ],
  "citations": {
    "chunk_123": { "source": "file.pdf", "page": 3 }
  }
}
```

See [rag-orchestrator/README.md](rag-orchestrator/README.md)

## 🚀 Setup

### Prerequisites
- Python 3.10+
- Tesseract OCR (for scanned PDFs)
- 4GB RAM minimum for embeddings

### Installation

```bash
cd pipeline
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### Install Tesseract OCR

**Windows**:
Download from https://github.com/tesseract-ocr/tesseract  
Add to PATH

**Mac**:
```bash
brew install tesseract
```

**Linux**:
```bash
sudo apt-get install tesseract-ocr
```

## 📋 Complete Pipeline Workflow

### Step 1: Ingest Document (Person 2)
```bash
python ingestion/ingest.py "path/to/document.pdf"
```

Output: `storage/chunks/<doc_id>/chunk_0.json, chunk_1.json, ...`

### Step 2: Generate Embeddings & Build Index (Person 3)
```bash
python embed-and-vec-search/embed_and_index.py
```

Output: `embed-and-vec-search/vector_index/faiss.index`, `metadata.pkl`

### Step 3: Start Vector Search API (Person 3)
```bash
python embed-and-vec-search/vector_search_api.py
```

API available at `http://localhost:5001`

### Step 4: Query via RAG (Person 4 - coming soon)
```bash
python rag-orchestrator/orchestrator.py --query "What are GMP requirements?"
```

## 🧪 Testing

### Test Ingestion
```bash
cd pipeline
python ingestion/ingest.py "sample_document.pdf"
ls storage/chunks/  # Should see doc_id folder
```

### Test Vector Search
```bash
# Ensure API is running
curl http://localhost:5001/health

# Test search
curl -X POST http://localhost:5001/vector/search \
  -H "Content-Type: application/json" \
  -d '{"query": "FDA compliance", "k": 5}'
```

### Run Unit Tests
```bash
pytest embed-and-vec-search/test_embeddings.py -v
```

Expected: 5/5 tests passing

## 🔗 Integration with Backend

Backend (Person 5 & 6) calls the pipeline via HTTP:

```javascript
// Upload document → ingestion
const uploadResponse = await fetch('http://pipeline-url/ingest', {
  method: 'POST',
  body: formData
});

// Query documents → vector search
const searchResponse = await fetch('http://localhost:5001/vector/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: userQuery, k: 5 })
});
```

## 📦 Dependencies

Key libraries in `requirements.txt`:

```
# Ingestion (Person 2)
pdfplumber
python-docx
pytesseract
pillow

# Embeddings & Vector Search (Person 3)
sentence-transformers==2.2.2
faiss-cpu==1.7.4
flask==3.0.0
numpy==1.24.3

# RAG Orchestrator (Person 4 - to be added)
# langchain
# openai
```

## 🗂️ Storage Structure

```
storage/
├── uploads/                    # Original files
│   └── sample.pdf
│
└── chunks/                     # Processed chunks
    ├── 7ba118f3.../
    │   ├── chunk_0.json
    │   ├── chunk_1.json
    │   └── ...
    └── d083f95e.../
        └── chunk_0.json
```

Each chunk JSON:
```json
{
  "doc_id": "7ba118f3...",
  "chunk_index": 0,
  "text": "Full text content...",
  "start_offset": 0,
  "end_offset": 500,
  "source": "sample.pdf",
  "page": 1
}
```

## 📊 Performance Notes

- **Ingestion**: ~2-5 seconds per page (OCR slower)
- **Embedding**: ~1 second per 100 chunks
- **Vector Search**: <1 second per query
- **Index Size**: ~50MB for 10K chunks

## 🐛 Troubleshooting

**"Tesseract not found"**
```bash
# Verify installation
tesseract --version

# Add to PATH if needed
```

**"ModuleNotFoundError"**
```bash
pip install -r requirements.txt --force-reinstall
```

**"No chunks found"**
- Ensure Person 2 ran ingestion first
- Check `storage/chunks/` directory exists and has content

**"Vector search returns empty"**
- Rebuild index: `curl -X POST http://localhost:5001/vector/index`
- Check API logs for errors

## 🤝 Collaboration Notes

- **Person 2 → Person 3**: Chunks stored in `storage/chunks/`
- **Person 3 → Person 4**: Vector search API at port 5001
- **Person 4 → Person 5**: RAG orchestrator provides structured responses
- **Pipeline → Backend**: Flask API called via HTTP

## 📝 Development Guidelines

1. Each person works in their designated folder
2. Use type hints for all functions
3. Add docstrings (Google style)
4. Write unit tests for new features
5. Update README when adding features
6. Use logging for debugging

## 🚀 Deployment

The pipeline can be deployed as a separate service on Render:
- Build command: `pip install -r requirements.txt`
- Start command: `python embed-and-vec-search/vector_search_api.py`
- Port: 5001
- Persistent storage for FAISS index

---

**Last Updated**: December 2025  
**Status**: Person 2 & 3 complete, Person 4 in progress

