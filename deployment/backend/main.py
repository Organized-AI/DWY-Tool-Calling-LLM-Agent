from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import openai
from toolhouse import Toolhouse
import asyncio
from typing import Optional
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Chat API", version="1.0.0")

# Configure CORS - Allow all origins in production, specific origins in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check for required environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
TOOLHOUSE_API_KEY = os.getenv("TOOLHOUSE_API_KEY")

logger.info(f"OPENAI_API_KEY present: {bool(OPENAI_API_KEY)}")
logger.info(f"TOOLHOUSE_API_KEY present: {bool(TOOLHOUSE_API_KEY)}")

if not OPENAI_API_KEY:
    logger.warning("OPENAI_API_KEY environment variable not set")
if not TOOLHOUSE_API_KEY:
    logger.warning("TOOLHOUSE_API_KEY environment variable not set")

# Initialize clients with error handling
openai_client = None
toolhouse = None

try:
    if OPENAI_API_KEY:
        openai_client = openai.OpenAI(api_key=OPENAI_API_KEY)
        logger.info("OpenAI client initialized successfully")
    else:
        logger.error("OpenAI client not initialized - missing API key")
except Exception as e:
    logger.error(f"Failed to initialize OpenAI client: {e}")

try:
    if TOOLHOUSE_API_KEY:
        toolhouse = Toolhouse(
            api_key=TOOLHOUSE_API_KEY,
            provider="openai"
        )
        logger.info("Toolhouse client initialized successfully")
    else:
        logger.error("Toolhouse client not initialized - missing API key")
except Exception as e:
    logger.error(f"Failed to initialize Toolhouse client: {e}")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def root():
    return {"message": "AI Chat API is running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "ai-chat-api",
        "openai_configured": openai_client is not None,
        "toolhouse_configured": toolhouse is not None
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        logger.info(f"Received chat request: {request.message[:50]}...")
        
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if not openai_client:
            logger.error("OpenAI client not configured")
            raise HTTPException(status_code=503, detail="OpenAI client not configured - missing API key")
        
        if not toolhouse:
            logger.error("Toolhouse client not configured")
            # For now, let's try without Toolhouse if it's not available
            logger.info("Proceeding without Toolhouse...")
            
            # Simple OpenAI call without tools
            response = openai_client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": request.message}],
                max_tokens=1000,
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            if not content:
                content = "I apologize, but I couldn't generate a response. Please try again."
            
            logger.info("Response generated successfully (without tools)")
            return ChatResponse(response=content)
        
        # Create messages for OpenAI
        messages = [
            {
                "role": "user",
                "content": request.message
            }
        ]
        
        logger.info("Making initial OpenAI request with Toolhouse tools...")
        
        # Make initial request to OpenAI with Toolhouse tools from jordan-hack bundle
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=toolhouse.get_tools(bundle="jordan-hack"),
            max_tokens=1000,
            temperature=0.7
        )
        
        logger.info("Running Toolhouse tools...")
        
        # Run tools if needed and get the final response
        messages += toolhouse.run_tools(response)
        
        logger.info("Making final OpenAI request...")
        
        # Make final request to get the response with tool results
        final_response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=toolhouse.get_tools(bundle="jordan-hack"),
            max_tokens=1000,
            temperature=0.7
        )
        
        final_content = final_response.choices[0].message.content
        
        if not final_content:
            final_content = "I apologize, but I couldn't generate a response. Please try again."
        
        logger.info("Response generated successfully (with tools)")
        return ChatResponse(response=final_content)
        
    except openai.OpenAIError as e:
        logger.error(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 