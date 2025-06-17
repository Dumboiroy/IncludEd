# Set script to stop if any command fails
$ErrorActionPreference = "Stop"

Write-Host "🔧 Creating Python 3.10 virtual environment in /backend/api"

# Ensure Python 3.10 is installed
$python = Get-Command python3.10 -ErrorAction SilentlyContinue
if (-not $python) {
    Write-Error "❌ Python 3.10 is not installed or not added to PATH. Please install it from https://www.python.org/downloads/release/python-3100/"
    exit 1
}

# Navigate to the backend/api directory
Set-Location -Path ".\backend\api"

# Create virtual environment
python3.10 -m venv .venv

# Activate the virtual environment
.\.venv\Scripts\Activate.ps1

# Install requirements
Write-Host "📦 Installing Python dependencies from requirements.txt"
pip install -r requirements.txt

# Return to project root
Set-Location ../..

# yarn setup
Wirte-Host "Setting up Yarn dependencies"
yarn install
Write-Host "🛠 Running yarn build"
yarn build

Write-Host "`n✅ Setup complete."
