# Emotion

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/emotion.svg)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/emotion
```

### Yarn

```shell
yarn add @leafygreen-ui/emotion
```

### NPM

```shell
npm install @leafygreen-ui/emotion
```

# LeafyGreen Internal Emotion Instance

This package should be used _only_ in LeafyGreen components (i.e. `@leafygreen-ui/*` packages).

For external applications, prefer using `@emotion/react` (or similar), or an app-specific [custom instance](https://emotion.sh/docs/@emotion/css#custom-instances) of Emotion.

> **Why?** If _any_ `@leafygreen-ui/*` dependencies are not up to date, this could cause multiple copies of `@leafygreen-ui/emotion` to be installed, resulting in unpredictable styling.

## Server-side Rendering

Because we use a custom instance of Emotion to allow for styles defined in LeafyGreen to be easily overwritten, there's an additional step that must be taken to use our components when performing server-side rendering.

We expose three methods as named exports that are also exposed by the base `emotion-server` package: `renderStylesToString`, `renderStylesToNodeStream`, and `extractCritical`. You can find documentation on usage of each of the methods in the [official Emotion documentation](https://emotion.sh/docs/ssr#api-reference).

> **NOTE:** If you are already server-side rendering an application using Emotion, you will use the methods exposed in `@leafygreen-ui/emotion` instead of, NOT in addition to the methods exposed by `emotion-server`.

### Example

```js
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@leafygreen-ui/emotion';
import App from './App';

const html = renderStylesToString(renderToString(<App />));
```

## SSR

Emotion generates styles at runtime and injects them into the DOM. With Next.js App Router and Server Components, styles need to be extracted during server rendering and inserted into the HTML before it's sent to the client. Without proper configuration, you'll see a flash of unstyled content (FOUC) or styles won't apply at all.

> Note: Emotion does not [currently support React Server Components](https://github.com/emotion-js/emotion/issues/2978), so you will need to use `use client`

> Note: Leafygreen UI components are not all guaranteed to work out of the box even when the Emotion package has been configured correctly.

### Next.JS (App Router)

#### Step 1: Create the Emotion Registry

Create a new file at `src/app/EmotionRegistry.tsx`:

```tsx
'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { cache } from '@leafygreen-ui/emotion';
import { CacheProvider } from '@emotion/react';

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) return null;

    let styles = '';
    for (const name of names) {
      const style = cache.inserted[name];
      if (typeof style === 'string') {
        styles += style;
      }
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
```

#### Step 2: Add the Registry to Your Root Layout

Wrap your application with the `EmotionRegistry` in `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import EmotionRegistry from './EmotionRegistry';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My application description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
```

#### Usage

#### Important: Client Components Only

The `css` function from `@leafygreen-ui/emotion` only works in **Client Components**. You must add the `'use client'` directive to any component that uses Emotion styling.

```tsx
'use client';

import { css } from '@leafygreen-ui/emotion';

export default function Home() {
  return (
    <h1
      className={css`
        color: red;
        font-size: 2rem;
      `}
    >
      Hello World
    </h1>
  );
}
```

### Next.js (Pages Router)

In the `_document` file, import `extractCritical` from the emotion package, and add that into a style tag.

```tsx
import { extractCritical } from '@leafygreen-ui/emotion'
export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    // Extract critical CSS from Emotion for SSR
    const {css, ids} = extractCritical(initialProps.html || '')

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`css ${ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </>
      ),
    }
  }
...
}
```
