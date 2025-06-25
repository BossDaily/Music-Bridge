# 🎵 Music Bridge

A modern TypeScript monorepo built with Hono backend API and Astro frontend, featuring React components, Tailwind CSS, and Docker support.

## 🏗️ Architecture

This monorepo contains:

- **Backend (`apps/backend`)**: Hono-based TypeScript API server
- **Frontend (`apps/web`)**: Astro application with React and Tailwind CSS
- **Docker Support**: Full containerization with docker-compose

## 🚀 Quick Start

### Prerequisites

- Node.js 18.20.8+ or 20.3.0+
- pnpm (recommended package manager)
- Docker & Docker Compose (optional)

### Development Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development servers**:
   ```bash
   pnpm dev
   ```
   This runs both backend (port 8000) and frontend (port 4321) concurrently.

3. **Open your browser**:
   - Frontend: http://localhost:4321
   - Backend API: http://localhost:8000

### Individual App Commands

**Backend**:
```bash
cd apps/backend
pnpm dev    # Development server
pnpm build  # Build for production
pnpm start  # Start production server
```

**Frontend**:
```bash
cd apps/web
pnpm dev      # Development server
pnpm build    # Build for production
pnpm preview  # Preview production build
```

## 🐳 Docker Support

### Development with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down
```

Services:
- Backend: http://localhost:8000
- Frontend: http://localhost:4321
- Nginx (reverse proxy): http://localhost:80

### Production Build

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Deploy to production
docker-compose -f docker-compose.yml up -d
```

## 📦 Tech Stack

### Backend (`apps/backend`)
- **Framework**: Hono (ultrafast web framework)
- **Runtime**: Node.js with @hono/node-server
- **Language**: TypeScript
- **Features**: CORS, logging, JSON API endpoints

### Frontend (`apps/web`)
- **Framework**: Astro (modern static site generator)
- **UI Components**: React 18
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Features**: Server-side rendering, static generation

### Infrastructure
- **Package Manager**: pnpm with workspace support
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx (optional)
- **Development**: Concurrent development servers

## 🔧 Project Structure

```
Music-Bridge/
├── apps/
│   ├── backend/                 # Hono API server
│   │   ├── src/
│   │   │   └── index.ts        # Main server file
│   │   ├── Dockerfile          # Backend container
│   │   ├── package.json        # Backend dependencies
│   │   └── tsconfig.json       # Backend TypeScript config
│   └── web/                    # Astro frontend
│       ├── src/
│       │   └── pages/
│       │       └── index.astro # Main page
│       ├── public/             # Static assets
│       ├── Dockerfile          # Frontend container
│       ├── astro.config.mjs    # Astro configuration
│       ├── package.json        # Frontend dependencies
│       ├── tailwind.config.mjs # Tailwind configuration
│       └── tsconfig.json       # Frontend TypeScript config
├── docker-compose.yml          # Multi-service orchestration
├── nginx.conf                  # Reverse proxy configuration
├── package.json               # Root workspace configuration
├── pnpm-workspace.yaml        # pnpm workspace definition
├── tsconfig.json              # Shared TypeScript configuration
└── .env.example               # Environment variables template
```

## 🔌 API Endpoints

The backend provides the following endpoints:

- `GET /` - API status and info
- `GET /api/health` - Health check endpoint
- `GET /api/tracks` - Get music tracks (sample data)
- `POST /api/tracks` - Create new track

## 🛠️ Development

### Adding New Features

1. **Backend APIs**: Add routes in `apps/backend/src/index.ts`
2. **Frontend Pages**: Add `.astro` files in `apps/web/src/pages/`
3. **React Components**: Create `.tsx` files for interactive components
4. **Styling**: Use Tailwind CSS classes or add custom CSS

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Backend Configuration
PORT=8000
NODE_ENV=development

# Web Configuration  
ASTRO_PORT=4321

# CORS Origins
CORS_ORIGINS=http://localhost:4321,http://localhost:3000
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both apps in development mode |
| `pnpm build` | Build both apps for production |
| `pnpm start` | Start backend in production mode |
| `pnpm clean` | Clean build artifacts |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint on both apps |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Backend (API)
- **Hono** - Ultra-fast web framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **Express-style** middleware support

### Frontend (Web)
- **Astro** - Modern static site generator
- **React** - UI components
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

### DevOps & Tooling
- **pnpm** - Fast, disk space efficient package manager
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (optional)
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
Music-Bridge/
├── apps/
│   ├── api/                    # Hono API backend
│   │   ├── src/
│   │   │   └── index.ts       # API entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   └── web/                    # Astro frontend
│       ├── src/
│       │   └── pages/
│       │       └── index.astro # Homepage
│       ├── public/
│       ├── package.json
│       ├── astro.config.mjs
│       ├── tailwind.config.mjs
│       └── Dockerfile
├── packages/                   # Shared packages (future)
├── docker-compose.yml          # Docker orchestration
├── nginx.conf                  # Nginx configuration
├── pnpm-workspace.yaml         # pnpm workspace config
├── package.json                # Root package.json
└── tsconfig.json              # Root TypeScript config
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Music-Bridge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

### Development

**Start both API and Web in development mode:**
```bash
pnpm dev
```

This will start:
- API server on `http://localhost:8000`
- Web server on `http://localhost:4321`

**Or start services individually:**

```bash
# Start API only
pnpm --filter api dev

# Start Web only  
pnpm --filter web dev
```

### Building

**Build all applications:**
```bash
pnpm build
```

**Build individually:**
```bash
# Build API
pnpm --filter api build

# Build Web
pnpm --filter web build
```

## 🐳 Docker Support

### Development with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

The Docker setup includes:
- **API service** - Hono backend on port 8000
- **Web service** - Astro frontend on port 4321  
- **Nginx** - Reverse proxy on port 80 (optional)

Access the application:
- With Nginx: `http://localhost`
- Direct access: `http://localhost:4321`
- API: `http://localhost:8000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Service health status

### Music Endpoints
- `GET /api/tracks` - Get all tracks
- `POST /api/tracks` - Create a new track

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Run tests (when added)
pnpm test
```

## 📝 Scripts

### Root Level
- `pnpm dev` - Start all services in development
- `pnpm build` - Build all applications
- `pnpm clean` - Clean all build outputs
- `pnpm type-check` - Type check all packages
- `pnpm lint` - Lint all packages

### API (`apps/api`)
- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm type-check` - Type check only
- `pnpm lint` - Lint only

### Web (`apps/web`)
- `pnpm dev` - Start Astro dev server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm type-check` - Type check only
- `pnpm lint` - Lint only

## 🚀 Deployment

### Using Docker
```bash
docker-compose up -d --build
```

### Manual Deployment
1. Build all applications: `pnpm build`
2. Deploy API to your Node.js hosting platform
3. Deploy Web to your static hosting platform (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication system
- [ ] Music streaming integration (Spotify, Apple Music)
- [ ] Real-time features with WebSockets
- [ ] Mobile app (React Native)
- [ ] CI/CD pipeline
- [ ] Monitoring and logging
- [ ] Unit and integration tests
Music Playlist manager (accross multiple services) 
