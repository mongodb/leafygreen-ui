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

/**
 * const spacing = {
 *  1: '4px',
 *  2: '8px',
 *  3: '16px',
 *  4: '24px',
 *  5: '32px',
 *  6: '64px',
 *  7: '88px',
 * };
 */

const example = () => <span style={{ margin: spacing[1] }}>Hello World</span>;
```

## Fonts

```js
import { fonts } from '@leafygreen-ui/tokens';

/**
 * const fonts = {
 *  default: `Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif`,
 *  code: `'Source Code Pro', monospace`,
 * };
 */

const example = () => <span style={{ font-family: fonts.default }}>Hello World</span>;
```
