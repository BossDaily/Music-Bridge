# API Dockerfile
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY tsconfig.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy API source code
COPY apps/api/ ./apps/api/

# Build the API
WORKDIR /app/apps/api
RUN pnpm build

# Expose port
EXPOSE 8000

# Start the API
CMD ["pnpm", "start"]
