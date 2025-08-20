# Multi-stage build for AdBid project
# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY . .

# Build the project (if using Vite)
RUN npm run build || echo "No build step required"

# Stage 2: Production stage with Nginx
FROM nginx:alpine

# Install nodejs for any runtime requirements
RUN apk add --no-cache nodejs npm

# Copy built files from builder
COPY --from=builder /app /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.docker.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]