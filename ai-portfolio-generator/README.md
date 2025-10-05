# AI Portfolio Generator

A comprehensive AI-powered portfolio generator that creates stunning professional portfolios through conversational chat interface.

## 🌟 Features

- **AI-Powered Chat Interface**: Chat with AI to build your portfolio naturally
- **Real-Time Preview**: See your portfolio come to life as you chat
- **Multiple Templates**: Choose from 5 professionally designed templates
- **SEO Optimization**: Built-in SEO settings for better visibility
- **Analytics Dashboard**: Track views, engagement, and get AI-powered improvement suggestions
- **One-Click Publishing**: Deploy your portfolio with a custom URL
- **Responsive Design**: Works perfectly on all devices

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **Framer Motion** - Animations
- **Chart.js** - Analytics visualizations

### Backend
- **Node.js & Express** - REST API server
- **TypeScript** - Type safety
- **MongoDB & Mongoose** - Database
- **OpenAI GPT-4** - AI conversational engine
- **JWT** - Authentication
- **Handlebars** - Template rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-portfolio-generator
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Setup Environment Variables**

Backend `.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ai-portfolio
JWT_SECRET=your-secret-key-change-in-production
OPENAI_API_KEY=your-openai-api-key
FRONTEND_URL=http://localhost:3000
```

Frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Start Backend Server**
```bash
cd backend
npm run dev
```

7. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
```

8. **Open Application**
```
Frontend: http://localhost:3000
Backend API: http://localhost:5001
```

## 📁 Project Structure

```
ai-portfolio-generator/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── store/         # Redux store & slices
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Express backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   └── server.ts      # Entry point
│   └── package.json
│
└── README.md
```

## 🎯 User Flow

1. **Landing Page** → User clicks "Start Creating"
2. **Onboarding Chat** → AI collects: name, role, projects, skills, experience
3. **Template Selection** → Choose from 5 templates
4. **Live Builder** → Real-time editing with split view (chat + preview)
5. **Settings & SEO** → Customize meta tags and domain
6. **Publish** → Deploy to custom URL
7. **Analytics** → View engagement metrics and AI suggestions

## 🔌 API Endpoints

### Chat
- `POST /api/chat/respond` - Send message and get AI response
- `POST /api/chat/session` - Create new chat session

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID

### Portfolio
- `POST /api/portfolio/render` - Render portfolio HTML
- `POST /api/portfolio/save` - Save portfolio (auth required)
- `POST /api/portfolio/publish` - Publish portfolio (auth required)
- `GET /api/portfolio` - Get user's portfolios (auth required)
- `GET /api/portfolio/:id` - Get portfolio by ID

### User
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Login user
- `GET /api/user/profile` - Get user profile (auth required)

### Analytics
- `GET /api/analytics/:portfolioId` - Get portfolio analytics (auth required)

## 🎨 Design Language

### Colors
- **Accent**: #1E3A8A (Deep Blue)
- **CTA**: #F59E0B (Amber)
- **Background**: #F3F4F6 (Light Gray)

### Typography
- **Headings**: Inter Bold, 36px
- **Body**: Inter Regular, 16px

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
npm run build
npm start
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy
```

### Backend (Heroku/Railway)
```bash
cd backend
# Follow platform-specific deployment instructions
```

## 🔐 Environment Variables

### Required
- `OPENAI_API_KEY` - OpenAI API key for GPT-4
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation

### Optional
- `AWS_ACCESS_KEY_ID` - For S3 portfolio hosting
- `AWS_SECRET_ACCESS_KEY` - For S3 portfolio hosting
- `AWS_S3_BUCKET` - S3 bucket name

## 📊 Features Roadmap

### Phase 1 (MVP) ✅
- [x] Chat interface with GPT-4
- [x] Template selection
- [x] Real-time preview
- [x] Basic authentication
- [x] Portfolio generation

### Phase 2 (Enhancements)
- [ ] AWS S3 integration for hosting
- [ ] Real Google Analytics integration
- [ ] PDF export functionality
- [ ] Image upload for projects
- [ ] Custom CSS editing
- [ ] More templates

### Phase 3 (Advanced)
- [ ] Multi-language support
- [ ] A/B testing for templates
- [ ] AI-powered content suggestions
- [ ] Collaboration features
- [ ] Version control for portfolios

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- All open-source contributors

## 📞 Contact

For questions or support, please reach out to [your-email@example.com]

---

**Built with ❤️ using AI**
