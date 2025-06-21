# DWY Tool-Calling LLM Agent - Windows Setup Script
# This script sets up the complete development environment for the hackathon

Write-Host "🚀 DWY Tool-Calling LLM Agent - Windows Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error-Custom "This script requires Administrator privileges. Please run PowerShell as Administrator."
    Write-Host "Right-click PowerShell and select 'Run as Administrator', then run this script again."
    exit 1
}

# Set execution policy
Write-Status "Setting PowerShell execution policy..."
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Install Chocolatey if not present
Write-Status "Checking for Chocolatey..."
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Status "Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
} else {
    Write-Success "Chocolatey already installed"
}

# Update Chocolatey
Write-Status "Updating Chocolatey..."
choco upgrade chocolatey -y

# Install essential tools via Chocolatey
Write-Status "Installing essential development tools..."
$tools = @(
    "git",
    "nodejs",
    "python",
    "vscode",
    "curl",
    "wget",
    "7zip"
)

foreach ($tool in $tools) {
    Write-Status "Installing $tool..."
    choco install $tool -y
}

# Install Claude Desktop (if available via winget)
Write-Status "Checking for Claude Desktop..."
try {
    winget install --id Anthropic.Claude --silent --accept-package-agreements --accept-source-agreements
    Write-Success "Claude Desktop installed"
} catch {
    Write-Warning "Claude Desktop not available via winget. Please install manually from https://claude.ai/download"
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Clone the DWY repository
Write-Status "Setting up DWY Tool-Calling LLM Agent project..."
$ProjectDir = Join-Path $env:USERPROFILE "dwy-hackathon"

if (Test-Path $ProjectDir) {
    Write-Warning "Project directory already exists. Updating..."
    Set-Location $ProjectDir
    git pull origin main
} else {
    Write-Status "Cloning repository..."
    git clone https://github.com/Organized-AI/DWY-Tool-Calling-LLM-Agent.git $ProjectDir
    Set-Location $ProjectDir
}

# Install Node.js dependencies
Write-Status "Installing Node.js dependencies..."
if (Test-Path "package.json") {
    npm install
}

# Install Python dependencies
Write-Status "Setting up Python environment..."
if (Test-Path "requirements.txt") {
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
}

# Install VS Code extensions
Write-Status "Installing VS Code extensions..."
$VSCodeExtensions = @(
    "ms-python.python",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json",
    "ms-python.black-formatter",
    "ms-python.isort",
    "GitHub.copilot",
    "ms-vscode-remote.remote-containers",
    "ms-azuretools.vscode-docker"
)

foreach ($extension in $VSCodeExtensions) {
    Write-Status "Installing VS Code extension: $extension"
    code --install-extension $extension --force
}

# Create development environment configuration
Write-Status "Creating development environment configuration..."

# Create .env.example if it doesn't exist
if (!(Test-Path ".env.example")) {
    $envContent = @"
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
"@
    $envContent | Out-File -FilePath ".env.example" -Encoding UTF8
}

# Create VS Code workspace settings
if (!(Test-Path ".vscode")) {
    New-Item -ItemType Directory -Path ".vscode"
}

$vscodeSettings = @"
{
    "python.defaultInterpreterPath": "python",
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
"@
$vscodeSettings | Out-File -FilePath ".vscode/settings.json" -Encoding UTF8

# Set up Git configuration if not already configured
Write-Status "Checking Git configuration..."
$gitName = git config --global user.name
$gitEmail = git config --global user.email

if ([string]::IsNullOrWhiteSpace($gitName)) {
    $gitUsername = Read-Host "Please enter your Git username"
    git config --global user.name $gitUsername
}

if ([string]::IsNullOrWhiteSpace($gitEmail)) {
    $gitUserEmail = Read-Host "Please enter your Git email"
    git config --global user.email $gitUserEmail
}

# Create initial project structure if needed
Write-Status "Setting up project structure..."
$directories = @(
    "src/frontend",
    "src/backend",
    "src/database",
    "src/shared",
    "docs",
    "templates",
    "tests",
    "scripts",
    "data"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force
    }
}

# Final verification
Write-Status "Verifying installation..."
Write-Host ""
Write-Host "=== Installation Verification ===" -ForegroundColor Cyan

try { Write-Host "Git: $(git --version)" } catch { Write-Host "Git: Not found" -ForegroundColor Red }
try { Write-Host "Node.js: $(node --version)" } catch { Write-Host "Node.js: Not found" -ForegroundColor Red }
try { Write-Host "npm: $(npm --version)" } catch { Write-Host "npm: Not found" -ForegroundColor Red }
try { Write-Host "Python: $(python --version)" } catch { Write-Host "Python: Not found" -ForegroundColor Red }
try { Write-Host "VS Code: $(code --version | Select-Object -First 1)" } catch { Write-Host "VS Code: Not found" -ForegroundColor Red }
try { Write-Host "Chocolatey: $(choco --version)" } catch { Write-Host "Chocolatey: Not found" -ForegroundColor Red }

Write-Host ""
Write-Success "🎉 Setup completed successfully!"
Write-Host ""
Write-Host "📁 Project location: $ProjectDir" -ForegroundColor Yellow
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Copy .env.example to .env and add your API keys" -ForegroundColor White
Write-Host "   2. Open the project in VS Code: code $ProjectDir" -ForegroundColor White
Write-Host "   3. Start with Workshop 1: workshops/workshop1_project_planning_systems.md" -ForegroundColor White
Write-Host ""
Write-Host "💡 Quick start:" -ForegroundColor Yellow
Write-Host "   cd $ProjectDir" -ForegroundColor White
Write-Host "   code ." -ForegroundColor White
Write-Host ""
Write-Success "Happy coding! 🚀"

# Open the project in VS Code
try {
    Write-Status "Opening project in VS Code..."
    code $ProjectDir
} catch {
    Write-Warning "Could not automatically open VS Code. Please open manually."
}

Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")