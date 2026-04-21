# Blogbook - Full Stack Blog Application

A modern, full-stack blogging platform built with React, Cloudflare Workers, and PostgreSQL. Share your thoughts, read great stories, and connect with other writers.

![Tech Stack](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=flat-square) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-blue?style=flat-square) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=flat-square)

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Blog Management**: Create, read, and publish blog posts
- **Image Upload**: Integrated Cloudinary image uploading
- **Responsive Design**: Tailwind CSS for modern UI
- **Real-time Updates**: Recoil state management for reactive UI
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Serverless Backend**: Cloudflare Workers for scalable, edge-first deployment
- **Database**: PostgreSQL with Prisma ORM for robust data management

## 📋 Tech Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling framework
- **React Router** - Routing
- **Recoil** - State management
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Cloudflare Workers** - Edge computing platform
- **Hono** - Fast web framework
- **Prisma** - ORM with Accelerate support
- **PostgreSQL** - Database
- **JWT** - Authentication

### Shared
- **Common Package** - Shared types and utilities

## 📁 Project Structure

```
medium-blog/
├── frontend/              # React + Vite frontend application
│   ├── src/
│   │   ├── pages/        # Page components (Blog, Home, Publish, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # Recoil atoms and state
│   │   └── App.tsx       # Main app component
│   ├── config.ts         # Environment configuration
│   └── vite.config.ts    # Vite configuration
│
├── backend/              # Cloudflare Workers backend
│   ├── src/
│   │   ├── routes/       # API routes (user, blog)
│   │   └── index.ts      # Worker entry point
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── migrations/   # Database migrations
│   └── wrangler.jsonc    # Cloudflare configuration
│
└── common/               # Shared types and utilities
    └── src/
        └── index.ts      # Shared exports
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Cloudflare account (for backend deployment)
- Cloudinary account (for image uploads)

### Step 1: Clone the repository
```bash
git clone <repository-url>
cd medium-blog
```

### Step 2: Install dependencies

**Install all packages (root level):**
```bash
npm install
```

**Or install individually:**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Common
cd ../common
npm install
```

### Step 3: Environment Setup

#### Frontend (.env file)
```env
VITE_baseurl=https://your-backend-url
VITE_cloudName=your-cloudinary-name
VITE_uploadPreset=your-upload-preset
```

#### Backend (.env file)
```env
DATABASE_URL=postgresql://user:password@host:port/database
DIRECT_DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
```

## 🚀 Getting Started

### Development Mode

**Frontend:**
```bash
cd frontend
npm run dev
```
The app will start at `http://localhost:5173`

**Backend:**
```bash
cd backend
npm run dev
```
The API will be available locally via wrangler

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm run deploy
```

## 📚 API Documentation

### User Routes
- `POST /api/v1/user/signup` - Register new user
- `POST /api/v1/user/signin` - Login user
- `GET /api/v1/user/profile` - Get user profile (requires auth)

### Blog Routes
- `POST /api/v1/blog` - Create new blog post (requires auth)
- `GET /api/v1/blog` - Get all published blog posts
- `GET /api/v1/blog/:id` - Get specific blog post
- `PUT /api/v1/blog/:id` - Update blog post (requires auth)
- `DELETE /api/v1/blog/:id` - Delete blog post (requires auth)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User signs up/in and receives a JWT token
2. Token is stored in local storage
3. Token is sent in `Authorization: Bearer <token>` header for protected routes
4. Backend verifies token using JWT_SECRET

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String?
  password String
  posts    Post[]
}
```

### Post Model
```prisma
model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  image     String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

## 🔄 Database Migrations

### Create a new migration
```bash
cd backend
npx prisma migrate dev --name migration_name
```

### Apply migrations
```bash
cd backend
npx prisma migrate deploy
```

### Generate Cloudflare types
```bash
cd backend
npm run cf-typegen
```

## 📦 Shared Package

The `common` package contains shared types used across frontend and backend:

```bash
cd common
npm publish  # To publish to npm registry
```

Import in frontend/backend:
```typescript
import { type Post, type User } from '@ayushdevinfer1/medium-common'
```

## 🎨 UI Components

### Available Components
- **Appbar** - Navigation header
- **Blogcards** - Blog post cards
- **Skeleton** - Loading skeleton
- **Spinner** - Loading spinner
- **Form** - Form components
- **Bio** - User bio section
- **mainblog** - Main blog content display

## 🧭 Pages

- **Home** - Landing page
- **Blogs** - Browse all published blogs
- **Blog** - Read individual blog post
- **Publish** - Create/edit blog post
- **Dashboard** - User dashboard (drafts, published posts)
- **Signin/Signup** - Authentication pages
- **Pagenotfound** - 404 page

## 🐛 Troubleshooting

### "process is not defined" error
This occurs in Vite frontend. Use `import.meta.env.VITE_*` instead of `process.env`:

```typescript
// ❌ Wrong
const baseurl = process.env.baseurl

// ✅ Correct
const baseurl = import.meta.env.VITE_baseurl
```

### Database Connection Issues
- Verify `DATABASE_URL` and `DIRECT_DATABASE_URL` are set correctly
- Ensure PostgreSQL server is running
- Check database credentials and permissions

### JWT Authentication Failing
- Verify `JWT_SECRET` is set in backend `.env`
- Check token is properly sent in Authorization header
- Ensure token hasn't expired

## 📝 Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Scripts
```bash
npm run dev          # Start local development
npm run deploy       # Deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare types
```

## 🚢 Deployment

### Deploy Backend to Cloudflare Workers
```bash
cd backend
npm run deploy
```

### Deploy Frontend
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy `dist/` folder to your hosting platform (Vercel, Netlify, etc.)

## 📖 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributors

Created by Ayush Pandey

## 🤝 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy Blogging! 📝**
