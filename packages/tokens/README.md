# Tokens

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tokens.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/tokens
```

### NPM

```shell
npm install @leafygreen-ui/tokens
```

## Example

```js
import { spacing, fontFamilies, breakpoints, transitionDuration } from '@leafygreen-ui/tokens';

const spacingExample = () => <span style={{ margin: spacing[1] }}>Hello World</span>;
const fontFamiliesExample = () => <span style={{ font-family: fontFamilies.default }}>Hello World</span>;
const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);
const transitionDurationExample = <span style={{ transition: transitionDuration.default }}>Hello World</span>;
```
