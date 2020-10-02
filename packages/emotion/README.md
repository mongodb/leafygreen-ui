# Emotion

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/emotion.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/emotion
```

### NPM

```shell
npm install @leafygreen-ui/emotion
```

## Server-side Rendering

Because we use a custom instance of Emotion to allow for styles defined in LeafyGreen to be easily overwritten, there's an additional step that must be taken to use our components when performing server-side rendering.

We expose three methods as named exports that are also exposed by the base `emotion-server` package: `renderStylesToString`, `renderStylesToNodeStream`, and `extractCritical`. You can find documentation on usage of each of the methods in the [official Emotion documentation](https://emotion.sh/docs/ssr#api-reference).

> **NOTE:** If you are already server-side rendering an application using Emotion, you will use the methods exposed in `@leafygreenui/emotion` instead of, NOT in addition to the methods exposed by `emotion-server`.

### Example

```js
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from '@leafygreen-ui/emotion';
import App from './App';

const html = renderStylesToString(renderToString(<App />));
```
