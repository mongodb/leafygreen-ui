# React 17 Testing Environment

Test the LeafyGreen UI codebase with React 17 dependencies in an isolated Docker environment.

## Quick Start

```bash
# Run React 17 tests in Docker (recommended)
./scripts/react17/test-react17.sh

# Or test locally (modifies your files)
pnpm run init:react17
pnpm run test --react17
pnpm run reset:react17  # Reset to React 18
```

## Files

- `test-react17.sh` - Main Docker test script
- `init.mjs` - Switches to React 17 environment
- `reset.mjs` - Resets back to React 18
- `r17-packages.json` - React 17 package versions
- `r17-tsconfig.json` - TypeScript config overrides

## What It Does

The Docker script builds a container, installs React 17 dependencies, runs tests, and builds Storybook to verify compatibility.

⚠️ **Use Docker approach** - local testing modifies your `package.json` and `pnpm-lock.yaml`.
