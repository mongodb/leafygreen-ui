#!/bin/bash

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

# Docker configuration
IMAGE_NAME="leafygreen-react17-test"
CONTAINER_NAME="leafygreen-react17-test-container"

# Track dockerignore backup for cleanup
DOCKERIGNORE_BACKUP=""
DOCKERIGNORE_CREATED=false

# Cleanup function
cleanup_dockerignore() {
    cd "${PROJECT_ROOT}"
    
    # Remove the .dockerignore if we created it
    if [ "${DOCKERIGNORE_CREATED}" = true ] && [ -f ".dockerignore" ]; then
        rm .dockerignore
    fi
    
    # Restore original dockerignore if we backed it up
    if [ -n "${DOCKERIGNORE_BACKUP}" ] && [ -f "${DOCKERIGNORE_BACKUP}" ]; then
        mv "${DOCKERIGNORE_BACKUP}" .dockerignore
    fi
}

# Set trap to ensure cleanup happens even on error
trap cleanup_dockerignore EXIT

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   LeafyGreen UI - React 17 Docker Test Environment        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Clean up any existing container
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

# Build Docker image
cd "${PROJECT_ROOT}"

# Backup existing .dockerignore if present
if [ -f ".dockerignore" ]; then
    DOCKERIGNORE_BACKUP=".dockerignore.backup.$(date +%s%N)"
    mv .dockerignore "${DOCKERIGNORE_BACKUP}"
fi

# Create temporary .dockerignore for React 17 testing
cat > .dockerignore << 'EOF'
# Ignore nested node_modules directories
**/node_modules

# Ignore nested dist directories
**/dist

# Ignore coverage and test artifacts
**/coverage
**/.turbo

# Ignore storybook output
storybook-static

# Ignore IDE and system files
.DS_Store
.idea
.vscode
*.swp
*.swo

# Note: NOT excluding .git because meta tools need it
EOF

DOCKERIGNORE_CREATED=true

# Build the image (cleanup handled by trap on exit)
docker build -f "${SCRIPT_DIR}/Dockerfile" -t "${IMAGE_NAME}" .

# Run container with all commands
# Note: Commands are run via `docker run` rather than in the Dockerfile because:
# - Image is built once, tests can be run multiple times without rebuilding
# - Real-time output allows monitoring progress as it happens
# - Failed tests don't require rebuilding the entire image
# - Better separation between environment setup (Dockerfile) and task execution
docker run --name "${CONTAINER_NAME}" \
    --memory="8g" \
    --memory-swap="8g" \
    --shm-size="2g" \
    "${IMAGE_NAME}" \
    /bin/bash -c '
        set -e
        npx node ./scripts/react17/init.mjs
        pnpm install
        pnpm run build:packages
        pnpm run test --react17 -- --testTimeout=120000
        pnpm build-storybook
    '

# Capture the exit code
EXIT_CODE=$?

# Clean up container
docker rm -f "${CONTAINER_NAME}" 2>/dev/null || true

# Report results
echo
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✅ React 17 tests completed successfully!                ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║   ❌ React 17 tests failed!                                ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════╝${NC}"
fi

exit $EXIT_CODE
