# AI Chat Assistant

How to deploy a modern chat application built with a Next.js 15 (App Router) frontend and FastAPI backend, integrated with OpenAI and Toolhouse AI for advanced tool calling capabilities.

## Features

- 🎨 Modern, responsive chat interface built with Next.js 15 and Tailwind CSS
- 🚀 FastAPI backend with OpenAI GPT-4 integration
- 🛠️ Toolhouse AI integration for advanced tool calling
- 🐳 Single Docker container deployment
- 💬 Real-time chat with floating message bubbles
- 📱 Mobile-responsive design

## Architecture

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: FastAPI with Python 3.11
- **AI**: OpenAI GPT-4 with Toolhouse AI tool calling
- **Deployment**: Single Docker container with multi-stage build

## Quick Start

### Prerequisites

- Docker and Docker Compose
- OpenAI API key (YOUR KEY IN .env)
- Toolhouse AI API key (YOUR KEY IN .env)

### Local Setup

1. Create `.env` in the project root and add your API keys in:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   TOOLHOUSE_API_KEY=your_toolhouse_api_key_here
   ```

### Docker Deployment

Start Docker Desktop if you are running locally and build and run the application:

```bash
# Easiest way
docker-compose up --build
```

Or alternatively,

```bash
# Build the Docker image
docker build -t ai-chat-app .

# Run the container
docker run -p 3000:3000 -p 8000:8000 --env-file .env ai-chat-app
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Development Setup

If you want to run the application in development mode:

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend:
   ```bash
   cd backend
   python -m uvicorn main:app --reload --port 8000
   ```

4. Run the frontend (in another terminal):
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `POST /api/chat` - Chat endpoint

### Chat API Usage

```bash
curl -X POST "http://localhost:8000/api/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, how can you help me?"}'
```

## Project Structure

```
organized-ai-hack/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main chat page
│   └── globals.css        # Global styles
├── backend/               # FastAPI backend
│   ├── __init__.py
│   └── main.py           # Main FastAPI application
├── public/               # Static assets
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Node.js dependencies
├── requirements.txt      # Python dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `TOOLHOUSE_API_KEY`: Your Toolhouse AI API key

## Deployment to cloud

### Push repo to GitHub and connect to your cloud provider. The repo will instantly deploy as a web application. Be sure to add the ENVIRONMENT VARIABLES (API KEYS) for OpenAI and Toolhouse.