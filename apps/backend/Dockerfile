# Backend Dockerfile
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY tsconfig.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy backend source code
COPY apps/backend/ ./apps/backend/

# Build the backend
WORKDIR /app/apps/backend
RUN pnpm build

# Expose port
EXPOSE 8000

# Start the backend
CMD ["pnpm", "start"]
