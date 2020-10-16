# Logo

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/logo.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/logo--logo)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/logo
```

### NPM

```shell
npm install @leafygreen-ui/logo
```

## Example

```js
import { Logo } from '@leafygreen-ui/logo';

<Logo />;
```

**Output HTML**

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1112.61 300"
  height="40"
  width="100%"
>
  <title>MongoDB Logo</title>
  <path class="leafygreen-ui-17842x1"></path>
  <path class="leafygreen-ui-197s9ut"></path>
  <path class="leafygreen-ui-1wkd47u"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
  <path fill="#21313C"></path>
</svg>
```

## Properties

| Prop       | Type                | Description                                                             | Default  |
| ---------- | ------------------- | ----------------------------------------------------------------------- | -------- |
| `height`   | `number`            | Height of the `<Logo />` component                                      | `40`     |
| `knockout` | `boolean`           | Determines whether or not a `knockout` version of the Logo will be used | `false`  |
| `variant`  | `'light'`, `'dark'` | Determines if `<Logo />` will be white or dark gray                     | `'dark'` |

# LogoMark

## Example

```js
import { LogoMark } from '@leafygreen-ui/logo';

<LogoMark />;
```

**Output HTML**

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 216.56 448.5"
  height="40"
  width="auto"
>
  <title>MongoDB LogoMark</title>
  <path class="leafygreen-ui-17842x1"></path>
  <path class="leafygreen-ui-197s9ut"></path>
  <path class="leafygreen-ui-1wkd47u"></path>
</svg>
```

| Prop       | Type                | Description                                                                                                                         | Default |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `height`   | `number`            | Height of the `<Logo />` component                                                                                                  | `40`    |
| `knockout` | `boolean`           | Determines whether or not a `knockout` version of the Logo will be used.                                                            | `false` |
| `variant`  | `'light'`, `'dark'` | Determines if `<Logo />` will be white or dark gray. Do not pass a value to this prop, if you wish to render a full-color logomark. |         |

# Product Logos

## Example

```js
import {
  CloudManagerLogo,
  AtlasLogo,
  RealmLogo,
  ChartsLogo,
} from '@leafygreen-ui/logo';

<CloudManagerLogo />;
```

**Output HTML**

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 216.56 448.5"
  height="40"
  width="auto"
>
  <title>MongoDB LogoMark</title>
  <path class="leafygreen-ui-17842x1"></path>
  <path class="leafygreen-ui-197s9ut"></path>
  <path class="leafygreen-ui-1wkd47u"></path>
</svg>
```

| Prop       | Type      | Description                                                                      | Default |
| ---------- | --------- | -------------------------------------------------------------------------------- | ------- |
| `size`     | `number`  | Height of the Product Logo                                                       | `18`    |
| `knockout` | `boolean` | Determines whether or not a `knockout` version of the Product Logo will be used. |
