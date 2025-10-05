# AI Portfolio Generator - Architecture Documentation

## System Overview

The AI Portfolio Generator is a full-stack web application that enables users to create professional portfolios through an AI-powered conversational interface.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Landing    │  │     Chat     │  │   Builder    │         │
│  │     Page     │  │   Interface  │  │     Page     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐         │
│  │         Redux Store (State Management)            │         │
│  └──────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Chat   │  │ Portfolio│  │   User   │  │Analytics │       │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐         │
│  │          Controllers & Business Logic             │         │
│  └──────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                    │                        │
         ┌──────────┴────────┐      ┌───────┴────────┐
         ▼                   ▼      ▼                ▼
   ┌──────────┐       ┌──────────┐           ┌──────────┐
   │ MongoDB  │       │  OpenAI  │           │   AWS    │
   │ Database │       │  GPT-4   │           │    S3    │
   └──────────┘       └──────────┘           └──────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2

### Key Components

#### 1. Pages (App Router)
- `/` - Landing page with hero and features
- `/chat` - Onboarding chat interface
- `/templates` - Template selection carousel
- `/builder` - Split-view portfolio builder
- `/settings` - SEO and publishing settings
- `/dashboard` - Analytics dashboard
- `/login` - Authentication

#### 2. Core Components
- **ChatWindow**: Conversational interface with message history
- **TemplateCarousel**: Template selection with previews
- **PreviewPane**: Live HTML preview with toggle views
- **SettingsModal**: SEO and domain configuration

#### 3. State Management (Redux)

**Chat Slice**
```typescript
{
  messages: Message[],
  isLoading: boolean,
  currentStep: number,
  totalSteps: number
}
```

**Portfolio Slice**
```typescript
{
  data: PortfolioData,
  selectedTemplate: string,
  htmlPreview: string,
  publishedUrl: string,
  seoSettings: SEOSettings
}
```

**User Slice**
```typescript
{
  isAuthenticated: boolean,
  token: string,
  user: UserInfo
}
```

### Data Flow

1. User inputs message → ChatWindow
2. Message sent to backend → API call
3. AI response received → Redux store updated
4. Portfolio data extracted → Portfolio slice updated
5. HTML rendered → Preview pane updated

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **AI**: OpenAI GPT-4
- **Templates**: Handlebars

### API Structure

#### Route Hierarchy
```
/api
├── /chat
│   ├── POST /respond       - AI chat response
│   └── POST /session       - Create chat session
├── /templates
│   ├── GET /               - List all templates
│   └── GET /:id            - Get template by ID
├── /portfolio
│   ├── POST /render        - Render HTML from data
│   ├── POST /save          - Save portfolio [AUTH]
│   ├── POST /publish       - Publish portfolio [AUTH]
│   ├── GET /               - List user portfolios [AUTH]
│   └── GET /:id            - Get portfolio by ID
├── /user
│   ├── POST /signup        - Register user
│   ├── POST /login         - Login user
│   └── GET /profile        - Get user profile [AUTH]
└── /analytics
    └── GET /:portfolioId   - Get analytics [AUTH]
```

### Database Schema

#### User Model
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  portfolios: ObjectId[],
  createdAt: Date
}
```

#### Portfolio Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  name: string,
  role: string,
  bio: string,
  skills: string[],
  projects: Project[],
  experience: Experience[],
  education: Education[],
  contact: ContactInfo,
  template: string,
  htmlContent: string,
  publishedUrl: string,
  seoSettings: SEOSettings,
  analytics: Analytics,
  createdAt: Date,
  updatedAt: Date
}
```

#### ChatSession Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  portfolioId: ObjectId,
  messages: Message[],
  extractedData: ExtractedData,
  currentStep: number,
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### AI Integration Flow

1. **User Message Received**
   - Validate input
   - Load conversation history

2. **GPT-4 Processing**
   - Build context with system prompt
   - Send conversation to OpenAI API
   - Generate conversational response

3. **Data Extraction**
   - Second GPT call for structured data
   - Parse JSON response
   - Update portfolio data

4. **Response**
   - Return AI message
   - Return extracted data
   - Update chat session

### Template Rendering

**Process:**
1. Receive portfolio data
2. Select Handlebars template
3. Compile template with data
4. Return HTML string
5. Frontend displays in iframe

**Template Features:**
- Responsive design
- SEO-optimized meta tags
- Accessibility (WCAG AA)
- Print-friendly styles
- Social media previews

## Security Architecture

### Authentication Flow
```
1. User signup/login
2. Backend validates credentials
3. JWT token generated
4. Token sent to frontend
5. Frontend stores in Redux + localStorage
6. Subsequent requests include token in header
7. Backend middleware validates token
```

### Security Measures
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Signed with secret, 7-day expiry
- **CORS**: Configured for specific frontend origin
- **Helmet.js**: Security headers
- **Input Validation**: Express-validator
- **Rate Limiting**: (TODO: Implement)
- **SQL Injection Prevention**: Mongoose sanitization

## Deployment Architecture

### Frontend Deployment (Vercel)
- Auto-deploy on git push
- Edge network CDN
- Serverless functions
- Environment variables configured

### Backend Deployment (Railway/Heroku)
- Container-based deployment
- Environment variables
- MongoDB Atlas connection
- Health check endpoint

### Database (MongoDB Atlas)
- Cloud-hosted MongoDB
- Automatic backups
- Scaling capabilities
- Connection string in env vars

## Performance Optimizations

### Frontend
- Code splitting (Next.js automatic)
- Image optimization (next/image)
- Lazy loading components
- Redux selector memoization
- CSS purging (Tailwind)

### Backend
- Database indexing (email, userId)
- Caching chat sessions
- Compression middleware
- Pagination for list endpoints

## Monitoring & Analytics

### Application Monitoring
- Error tracking (TODO: Sentry)
- Performance monitoring
- API response times
- Database query performance

### User Analytics
- Portfolio view tracking
- Section engagement heatmaps
- User flow analytics
- Conversion tracking

## Scalability Considerations

### Current MVP
- Handles ~1000 concurrent users
- Single backend instance
- MongoDB with basic indexing

### Future Scaling
1. **Horizontal Scaling**
   - Load balancer (Nginx)
   - Multiple backend instances
   - Redis for session management

2. **Database Scaling**
   - MongoDB sharding
   - Read replicas
   - Caching layer (Redis)

3. **AI Optimization**
   - Response caching
   - Batch processing
   - Fine-tuned models

## Error Handling

### Frontend
- Try-catch blocks in async functions
- Error boundaries for React components
- User-friendly error messages
- Fallback UI states

### Backend
- Centralized error middleware
- Structured error responses
- Logging with timestamps
- Environment-specific error details

## Testing Strategy

### Frontend Testing
- Unit tests (Jest)
- Component tests (React Testing Library)
- E2E tests (Playwright)
- Visual regression tests

### Backend Testing
- Unit tests (Jest)
- Integration tests (Supertest)
- API endpoint tests
- Database tests

## Future Enhancements

### Phase 2
- Real-time collaboration
- Video/image uploads
- Advanced analytics
- A/B testing

### Phase 3
- Multi-language support
- Custom domains
- White-label solution
- API for integrations

---

Last Updated: 2025-10-05
