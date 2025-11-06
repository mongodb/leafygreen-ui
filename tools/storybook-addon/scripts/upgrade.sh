#!/bin/bash
set -e

version="${1:-latest}"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ADDON_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(cd "$ADDON_DIR/../../.." && pwd)"

echo "Upgrading Storybook packages to version: $version"
echo "============================================"

# -- Addon
echo ""
echo "1. Updating Storybook packages in addon..."
cd "$ADDON_DIR"

# Extract @storybook/* packages from dependencies and devDependencies
ADDON_PACKAGES=$(cat package.json | \
  jq -r '[.dependencies // {}, .devDependencies // {}] | add | keys[] | select(startswith("@storybook/"))' | \
  tr '\n' ' ')

if [ -n "$ADDON_PACKAGES" ]; then
  echo "   Installing: $ADDON_PACKAGES"
  for pkg in $ADDON_PACKAGES; do
    pnpm install "$pkg@$version"
  done
fi

# Update peerDependencies versions in package.json
echo "   Updating peerDependencies..."
PEER_PACKAGES=$(cat package.json | \
  jq -r '.peerDependencies // {} | keys[] | select(startswith("@storybook/") or . == "storybook")' | \
  tr '\n' ' ')

if [ -n "$PEER_PACKAGES" ]; then
  for pkg in $PEER_PACKAGES; do
    # If version is "latest", get the actual version from node_modules
    if [ "$version" = "latest" ]; then
      if [ -d "node_modules/$pkg" ]; then
        actual_version=$(cat "node_modules/$pkg/package.json" | jq -r '.version')
        echo "     Setting $pkg to $actual_version"
        cat package.json | jq ".peerDependencies[\"$pkg\"] = \"$actual_version\"" > package.json.tmp
        mv package.json.tmp package.json
      fi
    else
      echo "     Setting $pkg to $version"
      cat package.json | jq ".peerDependencies[\"$pkg\"] = \"$version\"" > package.json.tmp
      mv package.json.tmp package.json
    fi
  done
fi

pnpm install

# -- Global
echo ""
echo "2. Updating Storybook packages in root..."
cd "$REPO_ROOT"

# Extract all @storybook/* packages and storybook from root package.json
ROOT_PACKAGES=$(cat package.json | \
  jq -r '[.dependencies // {}, .devDependencies // {}] | add | keys[] | select(startswith("@storybook/") or . == "storybook")' | \
  tr '\n' ' ')

if [ -n "$ROOT_PACKAGES" ]; then
  echo "   Installing: $ROOT_PACKAGES"
  for pkg in $ROOT_PACKAGES; do
    pnpm install -W "$pkg@$version"
  done
fi

# -- Package dependencies
echo ""
echo "3. Updating Storybook packages in all workspace packages..."
cd "$REPO_ROOT"

# Find all package.json files (excluding node_modules)
find . -name "package.json" -not -path "*/node_modules/*" | while read -r pkg_file; do
  # Check if this package.json has any storybook dependencies
  HAS_STORYBOOK=$(cat "$pkg_file" | \
    jq -r '[.dependencies // {}, .devDependencies // {}, .peerDependencies // {}] | add | keys[] | select(startswith("@storybook/") or . == "storybook")' | \
    wc -l | tr -d ' ')
  
  if [ "$HAS_STORYBOOK" -gt 0 ]; then
    echo "   Updating $pkg_file"
    PKG_DIR=$(dirname "$pkg_file")
    
    # Update each storybook package version
    PACKAGES_TO_UPDATE=$(cat "$pkg_file" | \
      jq -r '[.dependencies // {}, .devDependencies // {}, .peerDependencies // {}] | add | keys[] | select(startswith("@storybook/") or . == "storybook")' | \
      tr '\n' ' ')
    
    for pkg in $PACKAGES_TO_UPDATE; do
      # Determine which section the package is in and update accordingly
      for section in dependencies devDependencies peerDependencies; do
        HAS_IN_SECTION=$(cat "$pkg_file" | jq -r ".$section // {} | has(\"$pkg\")")
        if [ "$HAS_IN_SECTION" = "true" ]; then
          # If version is "latest", try to get the actual version from root node_modules
          if [ "$version" = "latest" ] && [ -d "$REPO_ROOT/node_modules/$pkg" ]; then
            actual_version=$(cat "$REPO_ROOT/node_modules/$pkg/package.json" | jq -r '.version')
            # Check if it's a workspace dependency
            CURRENT_VALUE=$(cat "$pkg_file" | jq -r ".$section[\"$pkg\"]")
            if [[ "$CURRENT_VALUE" == workspace:* ]]; then
              continue
            fi
            cat "$pkg_file" | jq ".$section[\"$pkg\"] = \"$actual_version\"" > "$pkg_file.tmp"
            mv "$pkg_file.tmp" "$pkg_file"
          else
            # Check if it's a workspace dependency
            CURRENT_VALUE=$(cat "$pkg_file" | jq -r ".$section[\"$pkg\"]")
            if [[ "$CURRENT_VALUE" == workspace:* ]]; then
              continue
            fi
            cat "$pkg_file" | jq ".$section[\"$pkg\"] = \"$version\"" > "$pkg_file.tmp"
            mv "$pkg_file.tmp" "$pkg_file"
          fi
        fi
      done
    done
  fi
done

# Final install to sync everything
echo ""
echo "4. Running final pnpm install..."
cd "$REPO_ROOT"
pnpm install

echo ""
echo "✓ Storybook packages upgraded successfully to version: $version"