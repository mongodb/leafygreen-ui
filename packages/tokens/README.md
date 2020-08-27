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

```shell
npm install @leafygreen-ui/tokens
```

## Spacing

```js
import { spacing } from '@leafygreen-ui/tokens';

/**
 * const spacing = {
 *  1: 4,
 *  2: 8,
 *  3: 16,
 *  4: 24,
 *  5: 32,
 *  6: 64,
 *  7: 88,
 * } as const;
 */

const example = () => <span style={{ margin: spacing[1] }}>Hello World</span>;
```
