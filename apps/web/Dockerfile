# Web Dockerfile
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY tsconfig.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy Web source code
COPY apps/web/ ./apps/web/

# Build the web app
WORKDIR /app/apps/web
RUN pnpm build

# Expose port
EXPOSE 4321

# Start the web server
CMD ["pnpm", "preview", "--host", "0.0.0.0"]
