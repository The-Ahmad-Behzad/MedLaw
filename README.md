# MedLaw Regulatory Copilot

AI-powered regulatory compliance assistant for medical device and pharmaceutical companies.

## 🏗️ Project Structure

```
MedLaw/
├── frontend/           # Next.js web application (Person 1)
├── backend/            # Node.js API server (Person 5 & 6)
└── pipeline/           # Python RAG pipeline (Person 2-4)
    ├── ingestion/                  # Document processing (Person 2) ✅
    ├── embed-and-vec-search/       # Vector search API (Person 3) ✅
    └── rag-orchestrator/           # RAG pipeline (Person 4) 🔄
```

## 👥 Team Structure

### Person 1 - Frontend Development
- **Responsibilities**: Next.js UI, React components, API integration
- **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS
- **Status**: Ready for implementation
- **Directory**: `frontend/`

### Person 2 - Document Ingestion ✅ COMPLETE
- **Responsibilities**: PDF/DOCX parsing, OCR, text chunking
- **Tech Stack**: Python, pdfplumber, pytesseract
- **Status**: ✅ Complete and tested
- **Directory**: `pipeline/ingestion/`

### Person 3 - Embeddings & Vector Search ✅ COMPLETE
- **Responsibilities**: Generate embeddings, FAISS indexing, vector search API
- **Tech Stack**: Python, sentence-transformers, FAISS, Flask
- **Status**: ✅ Complete and tested
- **Directory**: `pipeline/embed-and-vec-search/`

### Person 4 - RAG Orchestrator 🔄 IN PROGRESS
- **Responsibilities**: Retrieval logic, prompt assembly, LLM integration
- **Tech Stack**: Python, LangChain patterns
- **Status**: 🔄 Coming soon
- **Directory**: `pipeline/rag-orchestrator/`

### Person 5 - LLM Wrapper Service
- **Responsibilities**: OpenAI/Anthropic API wrapper, query classification
- **Tech Stack**: Node.js/Python, OpenAI SDK
- **Status**: Ready for implementation
- **Directory**: `backend/src/services/`

### Person 6 - Auth & Dashboard Backend
- **Responsibilities**: Firebase Auth, MongoDB models, dashboard APIs
- **Tech Stack**: Node.js, Firebase Admin, MongoDB Atlas
- **Status**: Ready for implementation
- **Directory**: `backend/src/`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account
- Firebase project
- OpenAI/Anthropic API key

### 1. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Add environment variables
npm run dev
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add environment variables
npm run dev
```

### 3. Pipeline Setup
```bash
cd pipeline
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run ingestion (Person 2)
python ingestion/ingest.py "path/to/document.pdf"

# Build vector index (Person 3)
python embed-and-vec-search/embed_and_index.py

# Start vector search API (Person 3)
python embed-and-vec-search/vector_search_api.py
```

## 📦 Technology Stack

**Frontend**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Firebase Auth SDK

**Backend**
- Node.js + Express/Fastify
- MongoDB Atlas
- Firebase Admin SDK
- OpenAI/Anthropic SDK

**Pipeline**
- Python 3.10+
- FAISS (vector search)
- sentence-transformers (embeddings)
- Flask (API)
- pdfplumber, pytesseract (ingestion)

## 🔗 Integration Points

1. **Frontend** → **Backend**: REST API over HTTPS
2. **Backend** → **Pipeline**: HTTP calls to vector search API (port 5001)
3. **Backend** → **MongoDB**: User data, products, organizations
4. **Backend** → **Firebase**: Authentication
5. **Backend** → **LLM**: OpenAI/Anthropic API

## 📚 Documentation

- [Frontend README](frontend/README.md) - Person 1 guide
- [Backend README](backend/README.md) - Person 5 & 6 guide
- [Pipeline README](pipeline/README.md) - Person 2-4 overview
- [Ingestion README](pipeline/ingestion/README.md) - Person 2 details
- [Vector Search README](pipeline/embed-and-vec-search/README.md) - Person 3 details
- [RAG Orchestrator README](pipeline/rag-orchestrator/README.md) - Person 4 guide

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run lint
```

### Backend
```bash
cd backend
npm run test
npm run lint
```

### Pipeline
```bash
cd pipeline
pytest embed-and-vec-search/test_embeddings.py -v
```

## 🌐 Deployment

**Frontend**: Vercel  
**Backend**: Render  
**Pipeline**: Render (separate service)

## 📄 License

MIT

## 🤝 Contributing

This is a modular team project. Each person works in their designated directory. See module READMEs for specific contribution guidelines.

## 📞 Support

For questions or issues:
- Frontend: Contact Person 1
- Backend API: Contact Person 5 & 6
- Pipeline: Contact Person 2-4

---

**Last Updated**: December 2025  
**Repository**: https://github.com/The-Ahmad-Behzad/MedLaw

