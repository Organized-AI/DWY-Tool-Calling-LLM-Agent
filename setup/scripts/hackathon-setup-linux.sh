#!/bin/bash

# DWY Tool-Calling LLM Agent - Linux Setup Script
# This script sets up the complete development environment for the hackathon
# Supports Ubuntu 20.04+, Debian 10+, and other Debian-based distributions

set -e

echo "🚀 DWY Tool-Calling LLM Agent - Linux Setup"
echo "==========================================="
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

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    print_error "Cannot detect Linux distribution. This script supports Ubuntu/Debian-based systems."
    exit 1
fi

print_status "Detected OS: $OS $VER"

# Check if running as root (not recommended)
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root is not recommended. Consider running as a regular user with sudo privileges."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Update package list
print_status "Updating package list..."
sudo apt update

# Install essential packages
print_status "Installing essential packages..."
sudo apt install -y curl wget git build-essential software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js via NodeSource
print_status "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
else
    print_success "Node.js already installed"
fi

# Install Python 3.9+ if not available
print_status "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    print_status "Installing Python 3..."
    sudo apt install -y python3 python3-pip python3-venv
else
    # Check Python version
    PYTHON_VERSION=$(python3 --version | cut -d" " -f2 | cut -d"." -f1,2)
    if (( $(echo "$PYTHON_VERSION < 3.8" | bc -l) )); then
        print_warning "Python version $PYTHON_VERSION detected. Installing Python 3.9+..."
        sudo apt install -y python3.9 python3.9-pip python3.9-venv
        sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1
    else
        print_success "Python 3 already installed (version $PYTHON_VERSION)"
    fi
fi

# Install pip if not available
if ! command -v pip3 &> /dev/null; then
    print_status "Installing pip..."
    sudo apt install -y python3-pip
fi

# Install VS Code
print_status "Installing Visual Studio Code..."
if ! command -v code &> /dev/null; then
    # Add Microsoft GPG key and repository
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
    sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
    sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
    
    sudo apt update
    sudo apt install -y code
else
    print_success "VS Code already installed"
fi

# Install additional useful tools
print_status "Installing additional development tools..."
sudo apt install -y jq tree htop neofetch

# Install Docker (optional but useful)
print_status "Installing Docker..."
if ! command -v docker &> /dev/null; then
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io
    
    # Add user to docker group
    sudo usermod -aG docker $USER
    
    print_warning "You'll need to log out and back in for Docker group changes to take effect."
else
    print_success "Docker already installed"
fi

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
    "python.defaultInterpreterPath": "/usr/bin/python3",
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

# Install Claude Desktop (manual instruction)
print_status "Claude Desktop installation..."
print_warning "Claude Desktop for Linux installation:"
echo "Please visit https://claude.ai/download to install Claude Desktop manually."
echo "Alternatively, you can use Claude via web browser at https://claude.ai"

# Final verification
print_status "Verifying installation..."
echo ""
echo "=== Installation Verification ==="
echo "Git: $(git --version 2>/dev/null || echo 'Not found')"
echo "Node.js: $(node --version 2>/dev/null || echo 'Not found')"
echo "npm: $(npm --version 2>/dev/null || echo 'Not found')"
echo "Python: $(python3 --version 2>/dev/null || echo 'Not found')"
echo "VS Code: $(code --version 2>/dev/null | head -1 || echo 'Not found')"
echo "Docker: $(docker --version 2>/dev/null || echo 'Not found')"
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
echo "⚠️  Important notes:"
echo "   - If you installed Docker, log out and back in for group changes to take effect"
echo "   - Install Claude Desktop manually from https://claude.ai/download"
echo ""
print_success "Happy coding! 🚀"

# Attempt to open the project in VS Code
if command -v code &> /dev/null; then
    print_status "Opening project in VS Code..."
    code "$PROJECT_DIR" 2>/dev/null &
fi