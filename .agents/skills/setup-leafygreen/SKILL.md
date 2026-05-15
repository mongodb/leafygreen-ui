---
name: setup-leafygreen
description: >-
  Use when setting up, installing, or scaffolding MongoDB's LeafyGreen UI
  design system in a Vite + React + TypeScript project.
source: mongodb/leafygreen-ui/.agent-/skills
when_to_use: user asks to set up, install, or scaffold LeafyGreen UI in a Vite + React + TypeScript project
license: MongoDB
mongodb:
  team: product-ux
  owner: kelsey.marshall@mongodb.com
disable-model-invocation: true
---

# LeafyGreen UI Setup

Configure a Vite + React + TypeScript project to use MongoDB's LeafyGreen design system. Run all steps in order. See [references/gotchas.md](references/gotchas.md) before troubleshooting any issues.

## Prerequisites Check

Before starting, verify the project is a Vite + React + TypeScript project:

```bash
# Must exist
ls package.json src/main.tsx src/App.tsx vite.config.ts
```

If these files are missing, scaffold the project first:

```bash
echo "y" | npm create vite@latest . -- --template react-ts
```

## Step 1 — Install Packages

```bash
npm install \
  @leafygreen-ui/leafygreen-provider \
  @leafygreen-ui/button \
  @leafygreen-ui/typography \
  @leafygreen-ui/tokens \
  @leafygreen-ui/icon \
  @leafygreen-ui/icon-button \
  @leafygreen-ui/logo
```

```bash
npm install --save-dev vite-plugin-node-polyfills
```

The polyfills package is required because some LeafyGreen packages reference Node.js built-ins (e.g. `Buffer`) that don't exist in the browser. Without it, the app renders a blank page with no visible error.

## Step 2 — Update vite.config.ts

Replace the full contents of `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
})
```

The `dedupe` + `alias` block is critical — LeafyGreen packages bundle their own React copy, which causes an "Invalid hook call" crash in the browser. This forces every package to use the single React instance in the project.

## Step 3 — Update src/main.tsx

Wrap the app in `LeafyGreenProvider`. **Important:** `LeafyGreenProvider` is a **default export**, not a named export.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeafyGreenProvider darkMode={true}>
      <App />
    </LeafyGreenProvider>
  </StrictMode>,
)
```

Keep the provider in `main.tsx` only — not in `App.tsx`.

## Step 4 — Replace src/index.css

Replace the **entire** contents of `src/index.css` with only this. The Vite template's default CSS overrides LeafyGreen colors and must be completely removed:

```css
@font-face {
  font-family: 'Euclid Circular A';
  src:
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff2') format('woff2'),
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular-WebXL.woff') format('woff'),
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/euclid-circular/EuclidCircularA-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'MongoDB Value Serif';
  src:
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff2') format('woff2'),
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.woff') format('woff'),
    url('https://d2va9gm4j17fy9.cloudfront.net/fonts/value-serif/MongoDBValueSerif-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background-color: #001E2B;
  font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

Do not add anything to `index.html` for fonts. Do not add other styles.

## Step 5 — Smoke Test src/App.tsx

Replace `src/App.tsx` with a smoke test to confirm components render:

```tsx
import { H1 } from '@leafygreen-ui/typography'
import { Button } from '@leafygreen-ui/button'

function App() {
  return (
    <div style={{ padding: 24 }}>
      <H1>LeafyGreen is working</H1>
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

Use **named imports only** — `{ H1 }` and `{ Button }`. Do not use default imports for these components.

Also clear `src/App.css` (keep the file but empty it) since the Vite template styles interfere.

## Step 6 — Create src/components/

```bash
mkdir -p src/components
```

## Step 7 — Verify

```bash
npm run dev
```

Open the browser. Confirm `H1` text and `Button` render with MongoDB styling (Euclid Circular A font, dark background). If the page is blank, see [references/gotchas.md](references/gotchas.md).

```bash
npm run build
```

Build must pass with zero errors. A chunk-size warning about LeafyGreen's bundle size is expected and harmless.

## Additional Resources

- **[references/gotchas.md](references/gotchas.md)** — React 19 type errors, multiple-React crash, darkMode quirks, and other known issues with fixes
- **leafygreen-authoring skill** — component mapping, import conventions, design tokens, Figma MCP workflow (auto-loaded when editing .tsx/.ts files)
