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

## SSR Compatibility

Emotion generates styles at runtime and injects them into the DOM. For server-side rendering, styles must be extracted during rendering and inserted into the HTML before it's sent to the client. Without proper configuration, you'll see a flash of unstyled content (FOUC).

> ⚠️ **Important:**
>
> - Emotion does not [currently support React Server Components](https://github.com/emotion-js/emotion/issues/2978). You must use `'use client'` directive in Next.js.
> - Ensure you're using the latest version of any `emotion` packages alongside this package.
> - LeafyGreen UI components may require additional configuration beyond what's documented here.

### Framework Guides

- [Next.js (App Router)](#nextjs-app-router)
- [Next.js (Pages Router)](#nextjs-pages-router)
- [React Router v7+](#react-router-v7)
- [Gatsby.js](#gatsbyjs)

---

### Next.js (App Router)

#### 1. Create the Emotion Registry

Create a new file at `src/app/EmotionRegistry.tsx`:

```jsx
'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { cache, CacheProvider } from '@leafygreen-ui/emotion';

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode,
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

#### 2. Add the Registry to Your Root Layout

Wrap your application in `src/app/layout.tsx`:

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

#### 3. Use in Client Components

> The `css` function only works in **Client Components**:

```tsx
'use client';

import { css } from '@leafygreen-ui/emotion';

export default function MyComponent() {
  return (
    <h1
      className={css`
        color: red;
      `}
    >
      Hello World
    </h1>
  );
}
```

---

### Next.js (Pages Router)

Add Emotion's critical CSS extraction to your `_document` file:

```tsx
import { extractCritical } from '@leafygreen-ui/emotion';

export default class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, ids } = extractCritical(initialProps.html || '');

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
    };
    // ...
  }
}
```

---

### React Router v7+

This guide covers [Framework mode](https://reactrouter.com/start/modes#framework) for React Router.

#### 1. Configure Server Entry

```tsx
Update `entry.server.tsx`:

import { PassThrough } from 'node:stream';
import type { EntryContext } from 'react-router';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter } from 'react-router';
import { renderToPipeableStream } from 'react-dom/server';
import { cache, extractCritical, CacheProvider } from '@leafygreen-ui/emotion';

const ABORT_DELAY = 5_000;

export default function handleRequest(
request: Request,
responseStatusCode: number,
responseHeaders: Headers,
routerContext: EntryContext,
) {
  return new Promise<Response>((resolve, reject) => {
  let statusCode = responseStatusCode;
  const chunks: Buffer[] = [];

      const { pipe, abort } = renderToPipeableStream(
        <CacheProvider value={cache}>
          <ServerRouter context={routerContext} url={request.url} />
        </CacheProvider>,
      );

      const collectStream = new PassThrough();
      collectStream.on('data', chunk => chunks.push(chunk));

      collectStream.on('end', () => {
        const html = Buffer.concat(chunks).toString('utf-8');
        const { css, ids } = extractCritical(html);
        const emotionStyleTag = `<style data-emotion="css ${ids.join(' ')}">${css}</style>`;
        const htmlWithStyles = html.replace('</head>', `${emotionStyleTag}</head>`);

        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);

        responseHeaders.set('Content-Type', 'text/html');
        resolve(
          new Response(stream, {
            headers: responseHeaders,
            status: statusCode,
          }),
        );

        body.write(htmlWithStyles);
        body.end();
      });

      collectStream.on('error', reject);
      pipe(collectStream);
      setTimeout(abort, ABORT_DELAY);

  });
}
```

#### 2. Configure Client Entry

Update `entry.client.tsx`:

```tsx
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { CacheProvider, cache } from '@leafygreen-ui/emotion';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <CacheProvider value={cache}>
        <HydratedRouter />
      </CacheProvider>
    </StrictMode>,
  );
});
```

---

### Gatsby.js

> ⚠️ **Not Currently Supported**
>
> There is a peer dependency mismatch between `@leafygreen-ui/emotion` and `gatsby-plugin-emotion`. As a result, we do not currently support GatsbyJS projects out of the box. If you need Emotion in a Gatsby project, refer to the [Gatsby Emotion documentation](https://www.gatsbyjs.com/docs/how-to/styling/emotion/).
