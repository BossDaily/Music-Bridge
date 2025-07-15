# Root Dockerfile for the entire Music-Bridge project
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace configuration and package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml tsconfig.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/web/package.json ./apps/web/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY apps/ ./apps/

# Build both applications using workspace script
RUN pnpm build

# Expose both ports
EXPOSE 8000 4321

# Health check for backend (since web runs in preview mode, it should be available quickly)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1

# Set production environment
ENV NODE_ENV=production

# Start both applications using the production script
CMD ["pnpm", "start:prod"]
