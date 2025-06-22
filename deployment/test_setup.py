#!/usr/bin/env python3
"""
Simple test script to verify the backend setup and dependencies.
"""

import sys
import importlib

def test_imports():
    """Test if all required packages can be imported."""
    required_packages = [
        'fastapi',
        'uvicorn',
        'openai',
        'toolhouse',
        'pydantic',
        'python_dotenv',
        'httpx'
    ]
    
    print("Testing package imports...")
    
    for package in required_packages:
        try:
            if package == 'python_dotenv':
                importlib.import_module('dotenv')
            else:
                importlib.import_module(package)
            print(f"✓ {package}")
        except ImportError as e:
            print(f"✗ {package}: {e}")
            return False
    
    return True

def test_backend_import():
    """Test if the backend module can be imported."""
    try:
        sys.path.append('.')
        from backend.main import app
        print("✓ Backend module imported successfully")
        return True
    except Exception as e:
        print(f"✗ Backend import failed: {e}")
        return False

if __name__ == "__main__":
    print("=== AI Chat App Setup Test ===\n")
    
    success = True
    success &= test_imports()
    print()
    success &= test_backend_import()
    
    print("\n" + "="*30)
    if success:
        print("✅ All tests passed! Setup looks good.")
        print("\nNext steps:")
        print("1. Copy env.example to .env and add your API keys")
        print("2. Build with: docker build -t ai-chat-app .")
        print("3. Run with: docker run -p 3000:3000 -p 8000:8000 --env-file .env ai-chat-app")
    else:
        print("❌ Some tests failed. Please check the setup.")
        sys.exit(1) 