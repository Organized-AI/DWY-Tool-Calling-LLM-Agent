#!/bin/bash

# DWY Tool-Calling LLM Agent - macOS Setup Script
# This script sets up the complete development environment for the hackathon

set -e

echo "🚀 DWY Tool-Calling LLM Agent - macOS Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is designed for macOS. Please use the appropriate setup script for your operating system."
    exit 1
fi

# Check for Homebrew and install if not present
print_status "Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    print_status "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    print_success "Homebrew already installed"
fi

# Update Homebrew
print_status "Updating Homebrew..."
brew update

# Install essential tools
print_status "Installing essential development tools..."
brew install git node python@3.11 curl wget

# Install VS Code if not present
print_status "Checking for VS Code..."
if ! command -v code &> /dev/null; then
    print_status "Installing Visual Studio Code..."
    brew install --cask visual-studio-code
else
    print_success "VS Code already installed"
fi

# Install Claude Desktop if not present
print_status "Checking for Claude Desktop..."
if [ ! -d "/Applications/Claude.app" ]; then
    print_status "Installing Claude Desktop..."
    brew install --cask claude
else
    print_success "Claude Desktop already installed"
fi

# Install additional useful tools
print_status "Installing additional development tools..."
brew install jq tree htop

# Clone the DWY repository
print_status "Setting up DWY Tool-Calling LLM Agent project..."
PROJECT_DIR="$HOME/dwy-hackathon"

if [ -d "$PROJECT_DIR" ]; then
    print_warning "Project directory already exists. Updating..."
    cd "$PROJECT_DIR"
    git pull origin main
else
    print_status "Cloning repository..."
    git clone https://github.com/Organized-AI/DWY-Tool-Calling-LLM-Agent.git "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
if [ -f "package.json" ]; then
    npm install
fi

# Install Python dependencies
print_status "Setting up Python environment..."
if [ -f "requirements.txt" ]; then
    python3 -m pip install --upgrade pip
    python3 -m pip install -r requirements.txt
fi

# Install VS Code extensions
print_status "Installing VS Code extensions..."
VSCODE_EXTENSIONS=(
    "ms-python.python"
    "ms-vscode.vscode-typescript-next"
    "bradlc.vscode-tailwindcss"
    "esbenp.prettier-vscode"
    "ms-vscode.vscode-json"
    "ms-python.black-formatter"
    "ms-python.isort"
    "GitHub.copilot"
    "ms-vscode-remote.remote-containers"
    "ms-azuretools.vscode-docker"
)

for extension in "${VSCODE_EXTENSIONS[@]}"; do
    print_status "Installing VS Code extension: $extension"
    code --install-extension "$extension" --force
done

# Create development environment configuration
print_status "Creating development environment configuration..."

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
    cat > .env.example << EOF
# DWY Tool-Calling LLM Agent Environment Variables
# Copy this file to .env and fill in your values

# API Keys
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dwy_agent

# Development
NODE_ENV=development
PORT=3000
DEBUG=true

# Tool Calling Configuration
ENABLE_TOOL_CALLING=true
MAX_TOOL_CALLS=10

# MCP Configuration
MCP_SERVER_URL=http://localhost:8000
EOF
fi

# Create VS Code workspace settings
mkdir -p .vscode
cat > .vscode/settings.json << EOF
{
    "python.defaultInterpreterPath": "/usr/local/bin/python3",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "python.formatting.provider": "black",
    "typescript.preferences.quoteStyle": "single",
    "javascript.preferences.quoteStyle": "single",
    "editor.tabSize": 2,
    "files.associations": {
        "*.env.*": "dotenv"
    }
}
EOF

# Set up Git configuration if not already configured
print_status "Checking Git configuration..."
if [ -z "$(git config --global user.name)" ]; then
    echo "Please enter your Git username:"
    read -r git_username
    git config --global user.name "$git_username"
fi

if [ -z "$(git config --global user.email)" ]; then
    echo "Please enter your Git email:"
    read -r git_email
    git config --global user.email "$git_email"
fi

# Create initial project structure if needed
print_status "Setting up project structure..."
mkdir -p {\
    src/{frontend,backend,database,shared},\
    docs,\
    templates,\
    tests,\
    scripts,\
    data\
}

# Final verification
print_status "Verifying installation..."
echo ""
echo "=== Installation Verification ==="
echo "Git: $(git --version 2>/dev/null || echo 'Not found')"
echo "Node.js: $(node --version 2>/dev/null || echo 'Not found')"
echo "npm: $(npm --version 2>/dev/null || echo 'Not found')"
echo "Python: $(python3 --version 2>/dev/null || echo 'Not found')"
echo "VS Code: $(code --version 2>/dev/null | head -1 || echo 'Not found')"
echo "Homebrew: $(brew --version 2>/dev/null | head -1 || echo 'Not found')"
echo ""

print_success "🎉 Setup completed successfully!"
echo ""
echo "📁 Project location: $PROJECT_DIR"
echo "🚀 Next steps:"
echo "   1. Copy .env.example to .env and add your API keys"
echo "   2. Open the project in VS Code: code $PROJECT_DIR"
echo "   3. Start with Workshop 1: workshops/workshop1_project_planning_systems.md"
echo ""
echo "💡 Quick start:"
echo "   cd $PROJECT_DIR"
echo "   code ."
echo ""
print_success "Happy coding! 🚀"

# Open the project in VS Code
if command -v code &> /dev/null; then
    print_status "Opening project in VS Code..."
    code "$PROJECT_DIR"
fi