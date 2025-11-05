# MCP UI App

A Next.js application for the MCP UI, configured for iframe embedding with CORS and CSP headers.

## Getting Started

### 1. Environment Setup

Create a `.env.local` file in the app root with the following variables:

```bash
# Base URL for the application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Allowed parent origins for iframe embedding (comma-separated)
ALLOWED_IFRAME_ORIGINS=http://localhost:3000,http://localhost:3001,https://your-app.com
```

Configuration options:
- `NEXT_PUBLIC_BASE_URL`: The base URL of your application
- `ALLOWED_IFRAME_ORIGINS`: Comma-separated list of allowed parent origins for iframe embedding

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Base URL

The base URL is configured via the `NEXT_PUBLIC_BASE_URL` environment variable and can be accessed in your code:

```typescript
import config from '@/config';

console.log(config.baseUrl); // http://localhost:3000
```

### CORS and Iframe Embedding

The app is configured with:
- **CORS headers**: Allow cross-origin requests from specified origins
- **CSP headers**: Content Security Policy appropriate for iframe embedding
- **Frame ancestors**: Controls which domains can embed this app in an iframe

To allow your app to be embedded in an iframe from specific domains, add them to the `ALLOWED_IFRAME_ORIGINS` environment variable.

## Build

This app is excluded from the default `pnpm build` command in the workspace. To build this app specifically, run:

```bash
cd apps/mcp-ui-app
pnpm build
```

Or from the workspace root:

```bash
pnpm build:apps
```
