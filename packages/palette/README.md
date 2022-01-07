# Palette

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/palette.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/palette/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/palette
```

### NPM

```shell
npm install @leafygreen-ui/palette
```

This package contains the brand-supported MongoDB UI color palette.

## UI Palette

### Usage

```shell
npm install @leafygreen-ui/palette
```

```js
import { palette } from '@leafygreen-ui/palette';

/**
 * palette = {
 * 	 black,
 *   white,
 *   gray: {
 *     dark3,
 *     dark2,
 *     dark1,
 *     base,
 *     light1,
 *     light2,
 *     light3,
 *   },
 *   green: {
 *     dark3,
 *     dark2,
 *     dark1,
 *     base,
 *     light1,
 *     light2,
 *     light3,
 *   },
 *   blue: {
 *     dark3,
 *     dark2,
 *     dark1,
 *     base,
 *     light1,
 *     light2,
 *     light3,
 *   },
 *   yellow: {
 *     dark3,
 *     dark2,
 *     base,
 *     light2,
 *     light3,
 *   },
 *   red: {
 *     dark3,
 *     dark2,
 *     base,
 *     light1,
 *     light2,
 *     light3,
 *   },
 * }
 */

const example = () => (
  <span style={{ color: palette.gray.dark1 }}>Hello World</span>
);
```

```less
@import '<path to node_modules>/@leafygreen-ui/palette/dist/palette.less';
```
