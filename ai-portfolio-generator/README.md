# AI Portfolio Generator

A modern, AI-powered portfolio generator that creates professional portfolios through conversational chat interface. Built with Next.js, React, Redux, Express.js, and OpenAI GPT-4.

## 🚀 Features

- **Conversational AI Interface**: Chat with AI to build your portfolio step-by-step
- **Live Preview**: See your portfolio update in real-time as you chat
- **Professional Templates**: Choose from multiple industry-specific templates
- **AI-Powered Content**: GPT-4 generates personalized content based on your profession
- **Mobile Responsive**: Looks perfect on all devices
- **Analytics Dashboard**: Track portfolio performance with detailed insights
- **Instant Publishing**: Deploy your portfolio with a single click
- **SEO Optimization**: Built-in SEO tools for better discoverability

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Redux** - React bindings for Redux

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **OpenAI GPT-4** - AI content generation
- **AWS S3** - File storage and hosting
- **JWT** - Authentication

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB
- OpenAI API key
- AWS account (for S3 storage)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ai-portfolio
   OPENAI_API_KEY=your_openai_api_key_here
   JWT_SECRET=your_jwt_secret_here
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=ai-portfolio-bucket
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### 1. Landing Page
- Visit the homepage to see the hero section and features
- Click "Start AI Chat" to begin portfolio creation

### 2. Chat Interface
- Answer AI questions about your profession, skills, and experience
- Watch your portfolio update in real-time in the preview pane
- Progress through 5 steps to complete your profile

### 3. Template Selection
- Choose from professional templates tailored to your industry
- Preview templates before selection
- AI suggests templates based on your profile

### 4. Portfolio Builder
- Customize sections and content
- Add or remove portfolio sections
- Regenerate content with AI
- Preview on different device sizes

### 5. Publishing
- Publish your portfolio with one click
- Get a shareable link instantly
- Configure SEO settings
- Set up custom domain (optional)

### 6. Analytics Dashboard
- Track portfolio views and engagement
- Get AI-powered improvement suggestions
- Monitor performance metrics

## 🏗️ Project Structure

```
ai-portfolio-generator/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── App.tsx         # Main app component
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   ├── sections/      # Page sections
│   │   ├── chat/          # Chat interface
│   │   └── portfolio/     # Portfolio components
│   ├── pages/             # Page components
│   ├── store/             # Redux store
│   │   └── slices/        # Redux slices
│   └── types/             # TypeScript types
├── backend/
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── server.js      # Express server
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Chat API
- `POST /api/chat/respond` - Send message to AI
- `GET /api/chat/history/:userId` - Get chat history
- `POST /api/chat/clear/:userId` - Clear chat history

### Portfolio API
- `POST /api/portfolio/render` - Render portfolio HTML/CSS
- `POST /api/portfolio/publish` - Publish portfolio
- `GET /api/portfolio/:id` - Get portfolio
- `PUT /api/portfolio/:id` - Update portfolio
- `DELETE /api/portfolio/:id` - Delete portfolio

### Templates API
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get specific template
- `POST /api/templates` - Create new template

### Analytics API
- `GET /api/analytics/:portfolioId` - Get portfolio analytics
- `POST /api/analytics/track` - Track events

## 🎨 Design System

### Colors
- **Primary**: #1E3A8A (Deep Blue)
- **Accent**: #F59E0B (Amber)
- **Background**: #F3F4F6 (Light Gray)

### Typography
- **Font**: Inter
- **Headings**: 36px, Bold
- **Body**: 16px, Regular

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the database solution

## 📞 Support

For support, email support@aiportfolio.com or join our Discord community.

---

**Built with ❤️ by the AI Portfolio Generator team**
