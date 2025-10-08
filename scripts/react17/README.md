# React 17 Testing Environment

This directory contains scripts and Docker configuration for testing the LeafyGreen UI codebase in a React 17 environment.

## Overview

The Docker-based testing environment allows you to test the entire codebase with React 17 dependencies without affecting your local development environment or existing `node_modules`.

## Files

- **`Dockerfile`** - Docker image configuration based on Ubuntu with Node.js and pnpm
- **`test-react17.sh`** - Main script that orchestrates the Docker container and test execution
- **`init.mjs`** - Initializes React 17 environment by updating package versions and TypeScript configs
- **`r17-packages.json`** - React 17 package version overrides
- **`r17-tsconfig.json`** - TypeScript configuration overrides for React 17
- **`reset.mjs`** - Resets the environment back from React 17 to React 18

**Note**: A temporary `.dockerignore` file is created at runtime (in the project root) to exclude nested `node_modules` and `dist` directories from the Docker build. It is automatically cleaned up after the script completes.

## Usage

### Running Tests in Docker

To run the full React 17 test suite in a clean Docker environment:

```bash
./scripts/react17/test-react17.sh
```

This script will:

1. 🐳 Build a Docker image with Ubuntu, Node.js, and pnpm
2. 📦 Copy the codebase (excluding nested `node_modules` and `dist` directories)
3. ⚛️ Initialize React 17 environment (`npx node ./scripts/react17/init.mjs`)
4. 📦 Install and build packages (`pnpm run init`)
5. 🧪 Run tests with React 17 (`pnpm run test --react17`)
6. 📚 Build Storybook (`pnpm build-storybook`)
7. 🧹 Clean up the container

### Container Configuration

The Docker container is configured with:

- **Memory**: 8GB RAM
- **Swap**: 8GB
- **Shared Memory**: 2GB
- **Base Image**: ubuntu:latest
- **Node.js**: 18.20.8
- **pnpm**: 9.15.0

### Local Testing (Without Docker)

If you want to test React 17 locally without Docker, you can use the existing script:

```bash
pnpm run init:react17
```

To reset back to React 18:

```bash
pnpm run reset:react17
```

⚠️ **Warning**: Local testing modifies your package files and `pnpm-lock.yaml`. The Docker approach is recommended as it doesn't affect your local environment.

## How It Works

### 1. Environment Initialization (`init.mjs`)

The initialization script:

- Removes `pnpm-lock.yaml` to start fresh
- Merges React 17 package versions from `r17-packages.json` into the root `package.json`
- Updates TypeScript configurations in all packages with settings from `r17-tsconfig.json`

### 2. Docker Build Process

The Docker build:

- Creates a temporary `.dockerignore` file at runtime to exclude nested `node_modules` and `dist` directories
- Backs up any existing `.dockerignore` file before creating the temporary one
- Installs system dependencies and Node.js
- Copies the entire codebase structure
- Sets up the working directory at `/workspace`
- Automatically removes the temporary `.dockerignore` and restores the original (if any) after completion

### 3. Test Execution

Inside the container:

1. React 17 dependencies are installed via the init script
2. All packages are built with the new dependencies
3. Tests run with the `--react17` flag
4. Storybook builds to ensure UI component compatibility

## Troubleshooting

### Out of Memory Errors

If the container runs out of memory, you can increase the memory limits in `test-react17.sh`:

```bash
--memory="16g" \
--memory-swap="16g" \
```

### Failed Tests

If tests fail in the Docker environment:

1. Check the console output for specific test failures
2. You can run the container interactively to debug:

```bash
docker run -it --rm \
    --memory="8g" \
    -v "$(pwd):/workspace" \
    leafygreen-react17-test \
    /bin/bash
```

### Docker Build Issues

If the Docker build fails:

1. Ensure Docker is running: `docker info`
2. Check disk space: `docker system df`
3. Clean up old images: `docker system prune -a`

## Development

To modify the React 17 test environment:

1. **Update package versions**: Edit `r17-packages.json`
2. **Update TypeScript config**: Edit `r17-tsconfig.json`
3. **Modify Docker setup**: Edit `Dockerfile` or `test-react17.sh`
4. **Add/modify exclusions**: Edit the `.dockerignore` content in the `test-react17.sh` script (search for the `cat > .dockerignore` section)

## CI/CD Integration

This script can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Test React 17 Compatibility
  run: |
    ./scripts/react17/test-react17.sh
```

The script exits with code 0 on success and non-zero on failure, making it suitable for automated testing.
