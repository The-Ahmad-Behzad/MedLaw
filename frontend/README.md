# Frontend - Person 1

Next.js web application for MedLaw Regulatory Copilot.

## 📋 Status

**Ready for Implementation**

Existing frontend structure is in place. Person 1 needs to add:
- New home page with Google-like search
- AI Assistant chat page
- Document upload functionality
- Smart routing for templates/alerts
- Dashboard integrations

## 🎯 Responsibilities (Person 1)

### Phase 2: Home & Assistant Pages
1. **New Home Page** (`src/app/home/page.tsx`)
   - Center search bar: "How can I help you?"
   - Minimalistic Google-like design
   - Auto-focus, quick suggestions
   - Redirect to `/assistant?q={query}` on submit

2. **AI Assistant Chat Page** (`src/app/assistant/page.tsx`)
   - Chat interface with message history
   - Display AI responses with "Read More" truncation
   - Follow-up options (Upload Docs, Create Org, View Dashboard)
   - Citation display

3. **Document Upload Modal** (`src/components/ui/UploadModal.tsx`)
   - Drag & drop or file picker
   - Support PDF, DOCX, TXT
   - Progress indicator
   - Upload to `/api/rag/upload`

4. **API Integration** (`src/lib/api.ts`)
   - `sendQuery()`, `uploadDocument()`, `classifyQuery()`

### Phase 3: Organization & Dashboard
1. **Organization Form** (modify `src/app/onboarding/page.tsx`)
   - Add fields: org name, size, device categories, regulations
   - Submit to `/api/user/orgForm`

2. **Dashboard Modifications** (modify `src/app/dashboard/page.tsx`)
   - Compliance overview stats
   - Recent AI interactions
   - Uploaded documents list
   - Quick actions

3. **Product Management** (modify `src/app/dashboard/products/page.tsx`)
   - Product compliance status
   - Monitor toggle

### Phase 4: Smart Routing
1. **Templates Page** (modify `src/app/dashboard/templates/page.tsx`)
   - Auto-fill search bar from query classification
   - Local template search

2. **Alerts Page** (modify `src/app/dashboard/alerts/page.tsx`)
   - Date range, device, regulation filters
   - Auto-applied from classification

## 🏗️ Existing Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx                     # Landing page (existing)
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx          # ✅ Login (existing)
│   │   │   └── signup/page.tsx         # ✅ Signup (existing)
│   │   ├── onboarding/page.tsx         # 🔄 Modify for org form
│   │   ├── dashboard/
│   │   │   ├── page.tsx                # 🔄 Modify for compliance stats
│   │   │   ├── ai-assistant/page.tsx   # ✅ Existing chat (reference)
│   │   │   ├── products/page.tsx       # 🔄 Add monitoring
│   │   │   ├── templates/page.tsx      # 🔄 Add smart routing
│   │   │   ├── alerts/page.tsx         # 🔄 Add filters
│   │   │   └── ...
│   │   ├── home/                       # ⭐ NEW: Create this
│   │   │   └── page.tsx
│   │   └── assistant/                  # ⭐ NEW: Create this
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx              # ✅ Existing
│   │   │   ├── Input.tsx               # ✅ Existing
│   │   │   ├── Modal.tsx               # ✅ Existing
│   │   │   └── UploadModal.tsx         # ⭐ NEW: Create this
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # ✅ Existing
│   │   │   └── Sidebar.tsx             # ✅ Existing
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts                      # ⭐ NEW: API client
│   │   └── firebase.ts                 # ⭐ NEW: Firebase config
│   └── context/
│       └── ProjectContext.tsx          # ✅ Existing
├── public/
├── .env.local                          # ⭐ Add environment variables
├── package.json
└── README.md
```

## 🚀 Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 3. Run Development Server
```bash
npm run dev
```

Open `http://localhost:3000`

## 📋 Implementation Checklist

### Phase 2: Home & Assistant
- [ ] Create `src/app/home/page.tsx` with center search bar
- [ ] Create `src/app/assistant/page.tsx` with chat UI
- [ ] Create `src/components/ui/UploadModal.tsx`
- [ ] Create `src/lib/api.ts` with backend API calls
- [ ] Create `src/lib/firebase.ts` with Firebase config
- [ ] Test: Home → Search → Assistant → AI Response
- [ ] Test: Upload document → Re-analyze

### Phase 3: Organization & Dashboard
- [ ] Modify `src/app/onboarding/page.tsx` with org form
- [ ] Modify `src/app/dashboard/page.tsx` with compliance stats
- [ ] Modify `src/app/dashboard/products/page.tsx` with monitoring
- [ ] Test: Onboarding → Dashboard → Add Product

### Phase 4: Smart Routing
- [ ] Add classification logic to `src/lib/api.ts`
- [ ] Modify `src/app/assistant/page.tsx` with routing logic
- [ ] Modify `src/app/dashboard/templates/page.tsx` with auto-fill
- [ ] Modify `src/app/dashboard/alerts/page.tsx` with filters
- [ ] Test: Template query → Auto-route
- [ ] Test: Alert query → Auto-route with filters

## 🎨 Design Guidelines

### Visual Style
- **Minimalistic, Google-like** interface
- **Color Palette**:
  - `forestGreen`: #065F46
  - `deepTeal`: #0F766E
  - `freshGreen`: #10B981
  - `paleAqua`: #ECFDF5
  - `slateGray`: #64748B
- **Typography**: Clean, modern fonts (existing Helvetica Neue)
- **Spacing**: Generous whitespace

### Component Patterns
```tsx
// Example: Home Search Bar
export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    router.push(`/assistant?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6">
        <h1 className="text-5xl font-bold text-center mb-8 text-forestGreen">
          How can I help you?
        </h1>
        <div className="flex gap-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Ask about FDA, ISO, EU MDR..."
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
    </div>
  );
}
```

## 📡 API Integration Examples

### Send Query
```typescript
// src/lib/api.ts
export async function sendQuery(query: string, docIds?: string[]) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rag/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, docIds })
  });
  return response.json();
}
```

### Upload Document
```typescript
export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rag/upload`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}
```

### Classify Query
```typescript
export async function classifyQuery(query: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return response.json();
}
```

## 🧪 Testing

### Component Tests
```bash
npm run test
```

### E2E Tests (Playwright)
```bash
npx playwright test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

Or connect GitHub repo to Vercel for auto-deployment.

## 🔗 Backend Integration

Frontend calls backend APIs:

1. **Auth**: Firebase Auth SDK → Backend verifies token
2. **Queries**: `/api/rag/analyze` → Backend → Python RAG pipeline
3. **Upload**: `/api/rag/upload` → Backend → Python ingestion
4. **Classification**: `/api/classify` → Backend → LLM
5. **Dashboard**: `/api/dashboard/overview` → Backend → MongoDB

## 🤝 Collaboration Notes

**Dependencies**:
- Person 5 & 6: Backend APIs must be ready
- Person 4: RAG orchestrator for structured responses
- Person 3: Vector search for document retrieval

**Handoff**:
- Frontend consumes backend APIs via REST
- Use TypeScript interfaces for API responses
- Handle loading states, errors gracefully

## 📝 Notes for Person 1

- Reuse existing UI components (`Button`, `Input`, `Modal`)
- Follow existing Tailwind CSS patterns
- Maintain responsive design (mobile + desktop)
- Add loading spinners for async operations
- Handle API errors with user-friendly messages
- Use React hooks for state management
- Consider React Query for API calls (optional)

---

**Status**: Ready for Person 1 implementation  
**Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS  
**Last Updated**: December 2025
