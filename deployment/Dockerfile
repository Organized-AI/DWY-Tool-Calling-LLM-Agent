# Stage 1: Build Next.js frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image with Python and Node.js
FROM python:3.11-slim

# Install Node.js
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy ALL frontend files from build stage
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/package.json ./package.json
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/next.config.js ./next.config.js
COPY --from=frontend-builder /app/app ./app
COPY --from=frontend-builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=frontend-builder /app/postcss.config.js ./postcss.config.js
COPY --from=frontend-builder /app/tsconfig.json ./tsconfig.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000
ENV PYTHONPATH=/app

# Expose port 8000 for Next.js frontend
EXPOSE 8000

# Start FastAPI on 0.0.0.0:3001, then Next.js on port 8000
CMD ["sh", "-c", "python -m uvicorn backend.main:app --host 0.0.0.0 --port 3001 & sleep 2 && npm start"]