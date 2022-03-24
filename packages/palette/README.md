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

/* 
 * @palette__white: #ffffff;
 * @palette__black: #001E2B;
 * 
 * @palette__gray--dark-3: #21313C;
 * @palette__gray--dark-2: #3D4F58;
 * @palette__gray--dark-1: #5C6C75;
 * @palette__gray--base: #889397;
 * @palette__gray--light-1: #C1C7C6;
 * @palette__gray--light-2: #E8EDEB;
 * @palette__gray--light-3: #F9FBFA;
 * 
 * @palette__green--dark-3: #023430;
 * @palette__green--dark-2: #00684A;
 * @palette__green--dark-1: #00A35C;
 * @palette__green--base: #00ED64;
 * @palette__green--light-1: #71F6BA;
 * @palette__green--light-2: #C0FAE6;
 * @palette__green--light-3: #E3FCF7;
 * 
 * @palette__purple--dark-3: #2D0B59;
 * @palette__purple--dark-2: #5E0C9E;
 * @palette__purple--base: #B45AF2;
 * @palette__purple--light-2: #F1D4FD;
 * @palette__purple--light-3: #F9EBFF;
 * 
 * @palette__blue--dark-3: #0C2657;
 * @palette__blue--dark-2: #083C90;
 * @palette__blue--dark-1: #1254B7;
 * @palette__blue--base: #016BF8;
 * @palette__blue--light-1: #0498EC;
 * @palette__blue--light-2: #C3E7FE;
 * @palette__blue--light-3: #E1F7FF;
 * 
 * @palette__yellow--dark-3: #4C2100;
 * @palette__yellow--dark-2: #944F01;
 * @palette__yellow--base: #FFC010;
 * @palette__yellow--light-2: #FFEC9E;
 * @palette__yellow--light-3: #FEF7DB;
 * 
 * @palette__red--dark-3: #5B0000;
 * @palette__red--dark-2: #970606;
 * @palette__red--base: #DB3030;
 * @palette__red--light-1: #EF5752;
 * @palette__red--light-2: #FFCDC7;
 * @palette__red--light-3: #FFEAE5;
*/
```
