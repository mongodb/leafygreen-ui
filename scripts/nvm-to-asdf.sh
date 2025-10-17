#!/usr/bin/env bash

# 1. Disable and clear corepack,
if command -v corepack >/dev/null 2>&1; then
  echo "Disabling corepack"
  corepack cache clean
  corepack disable
fi

# 1b Disable nvm
if grep -q 'export NVM_DIR="\$HOME/.nvm"' ~/.zshrc; then
  echo "Disabling nvm in ~/.zshrc..."
  awk '
    BEGIN { skip = 0 }
    {
      if ($0 ~ /export NVM_DIR="\$HOME\/\.nvm"/) {
        skip = 1
      }
      if (skip && $0 ~ /^$/) {
        skip = 0
      }
      if (skip && $0 !~ /^#/) {
        print "#" $0
      } else {
        print $0
      }
    }
  ' ~/.zshrc > ~/.zshrc.tmp && mv ~/.zshrc.tmp ~/.zshrc
fi

# 1c Disable pnpm
if grep -q 'export PNPM_HOME=' ~/.zshrc; then
  echo "Disabling PNPM in ~/.zshrc..."
  awk '
    BEGIN { skip = 0 }
    {
      if ($0 ~ /export PNPM_HOME=/) {
        skip = 1
      }
      if (skip && $0 ~ /^$/) {
        skip = 0
      }
      if (skip && $0 !~ /^#/) {
        print "#" $0
      } else {
        print $0
      }
    }
  ' ~/.zshrc > ~/.zshrc.tmp && mv ~/.zshrc.tmp ~/.zshrc
fi

# 2. Install ASDF (if not already installed)
if ! command -v asdf >/dev/null 2>&1; then
  echo "Installing asdf"
  brew install asdf
  # ... and add to path
  echo 'export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"' >> ~/.zshrc
fi

# 3 Enable asdf
echo "Setting up asdf"
asdf install
