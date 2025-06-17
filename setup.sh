#!/bin/bash

set -e

PYTHON_VERSION="3.10.0"
VENV_DIR="backend/api/.venv"
REQUIREMENTS="backend/api/requirements.txt"

# Check for pyenv, install if not present
if ! command -v pyenv &> /dev/null; then
  echo "📦 pyenv not found. Installing pyenv..."
  
  curl https://pyenv.run | bash
  
  # Load pyenv into shell session
  export PATH="$HOME/.pyenv/bin:$PATH"
  eval "$(pyenv init --path)"
  eval "$(pyenv virtualenv-init -)"
fi

# Install Python 3.10.0 if not already
if ! pyenv versions --bare | grep -q "^$PYTHON_VERSION$"; then
  echo "⬇️ Installing Python $PYTHON_VERSION with pyenv..."
  pyenv install $PYTHON_VERSION
fi

# Get full path to Python 3.10.0
PYTHON_PATH="$(pyenv root)/versions/$PYTHON_VERSION/bin/python"

# Create venv
echo "📦 Creating virtual environment at $VENV_DIR..."
$PYTHON_PATH -m venv $VENV_DIR

# Activate venv and install dependencies
source "$VENV_DIR/bin/activate"
pip install --upgrade pip
pip install -r "$REQUIREMENTS"
deactivate

# Run yarn build
echo "🔧 Setting up Yarn dependencies..."
yarn install
echo "🧶 Running yarn build..."
yarn build

echo "✅ Done!"
