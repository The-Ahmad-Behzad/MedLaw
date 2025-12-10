# Person 4: RAG Orchestrator 🔄 PLACEHOLDER

RAG (Retrieval-Augmented Generation) orchestration for MedLaw Regulatory Copilot.

## 📋 Status

**🔄 AWAITING IMPLEMENTATION**

This module will be implemented by Person 4. The structure and integration points are defined below.

## 🎯 Responsibilities

1. **Retrieval Logic**: Call Person 3's vector search API
2. **Prompt Assembly**: Combine retrieved chunks + user query + instructions
3. **LLM Integration**: Call Person 5's LLM wrapper API
4. **Post-Processing**: Parse LLM output into structured format
5. **Citation Mapping**: Link checklist items to source chunks

## 🏗️ Expected Structure

```
rag-orchestrator/
├── __init__.py
├── orchestrator.py      # Main RAG pipeline
├── prompts.py           # Prompt templates
├── post_processor.py    # LLM output parsing
├── test_orchestrator.py # Unit tests
└── README.md
```

## 📡 Integration Points

### Input: User Query
```python
{
    "query": "What are GMP compliance requirements?",
    "doc_ids": ["doc_1", "doc_2"],  # Optional: filter specific documents
    "options": {
        "max_chunks": 5,
        "temperature": 0.1
    }
}
```

### Person 3 API Call (Vector Search)
```python
import requests

def retrieve_chunks(query: str, k: int = 5):
    """Call Person 3's vector search API."""
    response = requests.post(
        'http://localhost:5001/vector/search',
        json={'query': query, 'k': k}
    )
    return response.json()['results']
```

### Person 5 API Call (LLM)
```python
import requests

def call_llm(prompt: str, temperature: float = 0.1):
    """Call Person 5's LLM wrapper API."""
    response = requests.post(
        'http://localhost:3001/api/llm/generate',
        json={
            'prompt': prompt,
            'temperature': temperature,
            'max_tokens': 1000
        }
    )
    return response.json()['text']
```

### Expected Output Format
```json
{
    "narrative": "Based on the provided documents, GMP compliance requirements include...",
    "checklist": [
        {
            "id": "check_1",
            "requirement_text": "Documentation control system must be in place",
            "status": "compliant|non_compliant|needs_review",
            "confidence": 0.92,
            "evidence": "chunk_7ba118f3_0",
            "recommended_action": "Ensure SOPs are up to date"
        }
    ],
    "citations": {
        "chunk_7ba118f3_0": {
            "source": "GMP_Guidelines.pdf",
            "page": 5,
            "text_preview": "Documentation systems must..."
        }
    },
    "metadata": {
        "chunks_retrieved": 5,
        "processing_time_ms": 1234,
        "llm_provider": "openai",
        "model": "gpt-4"
    }
}
```

## 💡 Implementation Guide

### Step 1: Retrieval
```python
def retrieve_relevant_context(query: str, k: int = 5) -> List[Dict]:
    """Retrieve relevant chunks from vector search."""
    chunks = retrieve_chunks(query, k)
    return chunks
```

### Step 2: Prompt Assembly
```python
def build_prompt(query: str, chunks: List[Dict]) -> str:
    """Assemble prompt with context and instructions."""
    
    context = "\n\n".join([
        f"[Document: {chunk['source']}, Page {chunk['page']}]\n{chunk['text']}"
        for chunk in chunks
    ])
    
    prompt = f"""You are a regulatory compliance expert for medical devices.

Based on the following regulatory documents, answer the user's question.

REGULATORY DOCUMENTS:
{context}

USER QUESTION:
{query}

Provide:
1. A clear, concise narrative answer
2. A structured compliance checklist
3. Citations to specific document sections

Format your response as JSON with fields: narrative, checklist, citations."""

    return prompt
```

### Step 3: LLM Call
```python
def generate_response(prompt: str) -> str:
    """Call LLM API to generate response."""
    llm_output = call_llm(prompt, temperature=0.1)
    return llm_output
```

### Step 4: Post-Processing
```python
import json
import re

def parse_llm_output(llm_output: str, chunks: List[Dict]) -> Dict:
    """Parse LLM output into structured format."""
    
    try:
        # Try to parse as JSON
        parsed = json.loads(llm_output)
    except json.JSONDecodeError:
        # Fallback: extract JSON from markdown code blocks
        json_match = re.search(r'```json\n(.*?)\n```', llm_output, re.DOTALL)
        if json_match:
            parsed = json.loads(json_match.group(1))
        else:
            # Last resort: return structured error
            return {
                "narrative": llm_output,
                "checklist": [],
                "citations": {},
                "error": "Failed to parse structured output"
            }
    
    # Map citations to chunk metadata
    citations = {}
    for chunk in chunks:
        chunk_id = chunk['chunk_id']
        citations[chunk_id] = {
            "source": chunk['source'],
            "page": chunk['page'],
            "text_preview": chunk['text'][:150] + "..."
        }
    
    parsed['citations'] = citations
    return parsed
```

### Step 5: Main Orchestrator
```python
def run_rag_pipeline(query: str, doc_ids: List[str] = None, k: int = 5) -> Dict:
    """
    Main RAG orchestration function.
    
    Args:
        query: User's compliance question
        doc_ids: Optional list of document IDs to filter
        k: Number of chunks to retrieve
        
    Returns:
        Structured response with narrative, checklist, citations
    """
    # 1. Retrieve relevant chunks
    chunks = retrieve_relevant_context(query, k)
    
    if not chunks:
        return {
            "narrative": "No relevant information found.",
            "checklist": [],
            "citations": {},
            "error": "No documents available"
        }
    
    # 2. Build prompt
    prompt = build_prompt(query, chunks)
    
    # 3. Call LLM
    llm_output = generate_response(prompt)
    
    # 4. Parse and structure output
    result = parse_llm_output(llm_output, chunks)
    
    return result
```

## 📝 Prompt Templates (prompts.py)

```python
COMPLIANCE_CHECK_PROMPT = """You are a regulatory compliance expert for medical devices.

Based on the following regulatory documents, analyze the user's question and provide:
1. A clear narrative explanation
2. A structured compliance checklist
3. Citations to source documents

REGULATORY CONTEXT:
{context}

USER QUESTION:
{query}

Respond in JSON format:
{{
    "narrative": "Your explanation here",
    "checklist": [
        {{
            "id": "check_1",
            "requirement_text": "Specific requirement",
            "status": "compliant|non_compliant|needs_review",
            "confidence": 0.0-1.0,
            "evidence": "chunk_id",
            "recommended_action": "What to do"
        }}
    ]
}}
"""

GAP_ANALYSIS_PROMPT = """You are performing a regulatory gap analysis.

Compare the provided documentation against {regulation} requirements.

DOCUMENTS:
{context}

Identify:
1. Requirements that are met
2. Requirements that are missing
3. Areas needing clarification

Provide a structured gap analysis report."""

QUERY_REFINEMENT_PROMPT = """The user asked: "{query}"

This query is ambiguous. Suggest 2-3 clarifying multiple-choice options to help the user specify their intent."""
```

## 🧪 Testing

```python
# test_orchestrator.py

import pytest
from orchestrator import run_rag_pipeline

def test_basic_query():
    """Test basic RAG pipeline with mock data."""
    result = run_rag_pipeline("What are GMP requirements?")
    
    assert 'narrative' in result
    assert 'checklist' in result
    assert 'citations' in result
    assert len(result['checklist']) > 0

def test_no_results():
    """Test handling of no retrieval results."""
    result = run_rag_pipeline("completely irrelevant query xyz123")
    
    assert 'error' in result or len(result['checklist']) == 0

def test_citation_mapping():
    """Test that citations are properly mapped to chunks."""
    result = run_rag_pipeline("ISO 13485 requirements")
    
    for item in result['checklist']:
        if 'evidence' in item:
            assert item['evidence'] in result['citations']
```

## 🔗 API Endpoint (Optional)

If Person 4 wants to expose this as an API:

```python
from flask import Flask, request, jsonify
from orchestrator import run_rag_pipeline

app = Flask(__name__)

@app.route('/rag/analyze', methods=['POST'])
def analyze():
    """RAG analysis endpoint."""
    data = request.json
    query = data.get('query')
    doc_ids = data.get('doc_ids')
    k = data.get('k', 5)
    
    result = run_rag_pipeline(query, doc_ids, k)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5002)
```

## 📦 Dependencies (to add to ../requirements.txt)

```txt
# RAG Orchestrator (Person 4)
langchain>=0.1.0        # Optional: RAG patterns
openai>=1.0.0           # If calling LLM directly
requests>=2.31.0        # API calls
python-dotenv>=1.0.0    # Environment variables
```

## 🤝 Collaboration

**From Person 3**:
- Vector search API: `http://localhost:5001/vector/search`
- Returns chunks with text, score, metadata

**From Person 5**:
- LLM API: `http://localhost:3001/api/llm/generate`
- Returns generated text

**To Person 1 (Frontend)**:
- Structured response: narrative + checklist + citations
- Can be consumed directly by dashboard

**To Backend (Person 5/6)**:
- Backend can call this orchestrator
- Or Person 4 can expose as separate API

## 🚀 Getting Started (for Person 4)

1. Ensure Person 3's API is running: `curl http://localhost:5001/health`
2. Ensure Person 5's LLM wrapper is available
3. Implement `orchestrator.py` following the guide above
4. Test with: `python orchestrator.py --query "test query"`
5. Write unit tests
6. Update this README with actual implementation details

## 📞 Questions for Person 4

Before starting, clarify:
1. Should this be a standalone API or a library?
2. Preferred LLM temperature for compliance (suggest 0.1 for determinism)?
3. How to handle uncertain/ambiguous queries (MCQ to user)?
4. Should we cache LLM responses to reduce API costs?

---

**Status**: 🔄 Placeholder - Awaiting Person 4  
**Priority**: High (needed for MVP)  
**Estimated Time**: 3-5 days  
**Dependencies**: Person 3 ✅, Person 5 (parallel work)

