# Backend API - Person 5 & Person 6

API server providing authentication, user management, LLM integration, and bridge to Python RAG pipeline.

## 👥 Responsibilities

### Person 5 - LLM Wrapper Service
- OpenAI/Anthropic API integration
- Query classification
- Entity extraction
- Prompt templates for regulatory compliance
- Rate limiting & error handling

### Person 6 - Auth & Dashboard Backend
- Firebase Authentication
- MongoDB data models
- User management APIs
- Dashboard data endpoints
- Product & organization management
- Monitoring preferences

## 🏗️ Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── llm.ts          # Person 5: LLM endpoints
│   │   ├── auth.ts         # Person 6: Authentication
│   │   ├── user.ts         # Person 6: User management
│   │   ├── dashboard.ts    # Person 6: Dashboard APIs
│   │   ├── monitoring.ts   # Person 6: Monitoring preferences
│   │   └── bridge.ts       # Bridge to Python RAG pipeline
│   ├── services/
│   │   ├── llm.service.ts  # OpenAI/Anthropic client
│   │   ├── mongodb.ts      # MongoDB connection
│   │   └── firebase.ts     # Firebase Admin SDK
│   ├── middleware/
│   │   ├── auth.ts         # JWT verification
│   │   └── rateLimit.ts    # Rate limiting
│   ├── models/             # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Organization.ts
│   │   ├── Product.ts
│   │   ├── Alert.ts
│   │   └── MonitoringPreference.ts
│   └── app.ts              # Express/Fastify app
├── .env.example
├── package.json
└── README.md
```

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env
```

Required environment variables:
```env
# Server
PORT=3001
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://...

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# LLM (Person 5)
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-...

# Python RAG Pipeline
PYTHON_RAG_URL=http://localhost:5001
```

### 3. Run Development Server
```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 📡 API Endpoints

### Person 5 - LLM Wrapper

**POST /api/llm/generate**
```json
{
  "prompt": "What are FDA 21 CFR 820 requirements?",
  "temperature": 0.1,
  "max_tokens": 500
}
```

**POST /api/llm/classify**
```json
{
  "query": "Show me DHF templates"
}
```
Response:
```json
{
  "flow": "C",
  "intendedPage": "templates",
  "entities": { "templateType": "DHF" },
  "confidence": 0.95
}
```

**POST /api/llm/extract-entities**
```json
{
  "query": "alerts for ventilators from June 2024"
}
```

### Person 6 - Authentication

**POST /api/auth/login**
```json
{
  "idToken": "firebase-id-token"
}
```

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Person 6 - User Management

**GET /api/user/profile**  
Headers: `Authorization: Bearer <token>`

**POST /api/user/orgForm**
```json
{
  "name": "BioMed Inc",
  "size": "50-200",
  "deviceCategories": ["Class II", "Class III"],
  "regulations": ["FDA 21 CFR 820", "ISO 13485"]
}
```

### Person 6 - Dashboard

**GET /api/dashboard/overview**
```json
{
  "complianceScore": 85,
  "urgentIssues": 3,
  "documents": [...],
  "recentQueries": [...],
  "products": [...]
}
```

### Person 6 - Products

**GET /api/products**  
**POST /api/products**  
**PUT /api/products/:id**  
**DELETE /api/products/:id**

### Person 6 - Monitoring

**POST /api/monitoring/preferences**
```json
{
  "productIds": ["prod_1", "prod_2"],
  "frequency": "weekly",
  "email": "user@example.com"
}
```

### Bridge - RAG Pipeline

**POST /api/rag/upload**  
Upload file → calls Python ingestion service

**POST /api/rag/analyze**  
```json
{
  "query": "Is this GMP compliant?",
  "docIds": ["doc_1", "doc_2"]
}
```
Calls Python vector search → returns results

## 🗄️ MongoDB Models

### User
```typescript
{
  uid: string,
  email: string,
  organizationId: ObjectId,
  createdAt: Date
}
```

### Organization
```typescript
{
  name: string,
  size: string,
  deviceCategories: string[],
  regulations: string[],
  createdAt: Date
}
```

### Product
```typescript
{
  userId: ObjectId,
  name: string,
  category: string,
  riskClass: string,
  complianceStatus: string,
  monitoringEnabled: boolean
}
```

### Alert
```typescript
{
  productId: ObjectId,
  regulation: string,
  date: Date,
  severity: 'low' | 'medium' | 'high' | 'critical',
  summary: string,
  source: string
}
```

## 🧪 Testing

```bash
npm run test
npm run test:watch
```

## 📦 Deployment (Render)

1. Push to GitHub
2. Create Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

Build command: `npm run build`  
Start command: `npm start`

## 🔗 Integration with Python RAG

Backend calls Python Flask API running on port 5001:

```typescript
// Example: Bridge service
const vectorSearchResponse = await fetch('http://localhost:5001/vector/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, k: 5 })
});
```

## 📝 Notes for Person 5 & 6

- **Person 5**: Focus on `routes/llm.ts` and `services/llm.service.ts`
- **Person 6**: Focus on authentication, MongoDB models, and dashboard APIs
- Use TypeScript for type safety
- Add JSDoc comments for all functions
- Follow RESTful API conventions
- Implement proper error handling
- Add request validation using Joi or Zod

## 🤝 Handoff Points

- **From Person 3**: Vector search API available at `http://localhost:5001`
- **From Person 4**: RAG orchestrator will provide structured responses
- **To Person 1**: Frontend consumes these APIs

---

**Status**: Ready for implementation  
**Last Updated**: December 2025

