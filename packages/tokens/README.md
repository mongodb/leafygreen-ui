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

### Usage

## Spacing

```js
import { spacing } from '@leafygreen-ui/tokens';

const example = () => <span style={{ margin: spacing[1] }}>Hello World</span>;
```

## Fonts

```js
import { fontFamilies } from '@leafygreen-ui/tokens';

const example = () => <span style={{ font-family: fontFamilies.default }}>Hello World</span>;
```

## Breakpoints

```js
import { breakpoints } from '@leafygreen-ui/tokens';

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);
```
