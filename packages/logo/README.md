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
import {
  Logo,
  LogoMark,
  AtlasLogo,
  AtlasLogoMark,
  ChartsLogo,
  ChartsLogoMark,
  CloudManagerLogo,
  CloudManagerLogoMark,
  CompassLogoMark,
  DriversConnectorsLogoMark,
  RealmLogo,
  RealmLogoMark,
  ServerLogoMark,
} from '@leafygreen-ui/logo';

return <Logo />;
```

**Output HTML**

```html
<div>
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
</div>
```

## Properties

| Prop       | Type                                                         | Description                                                                                            | Default     |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----------- |
| `height`   | `number`                                                     | Height of the `<Logo />` component                                                                     | `40`        |
| `knockout` | `boolean`                                                    | Determines whether or not a `knockout` version of the Logo will be used                                | `false`     |
| `product`  | `'none'`, `'atlas'`, `'charts'`, `'cloudManager'`, `'realm'` | Determines what text will appear next to Logomark. When 'none' it will appear as a MongoDB logo        | `'none'`    |
| `lockup`   | `'default'`, `'stacked'`                                     | Determines the orientation of the Logo. By default the Logomark and text will appear on the same line. | `'default'` |
| `darkMode` | `boolean`                                                    | Determines if Logo will appear in darkMode.                                                            | `false`     |

# LogoMark

## Properties

| Prop       | Type      | Description                                                              | Default |
| ---------- | --------- | ------------------------------------------------------------------------ | ------- |
| `height`   | `number`  | Height of the component                                                  | `40`    |
| `knockout` | `boolean` | Determines whether or not a `knockout` version of the Logo will be used. | `false` |
| `darkMode` | `boolean` | Determines if LogoMark will appear in darkMode.                          | `false` |

# Product Logos

## Properties

| Prop       | Type      | Description                                                                      | Default |
| ---------- | --------- | -------------------------------------------------------------------------------- | ------- |
| `size`     | `number`  | Height of the Product Logo                                                       | `18`    |
| `knockout` | `boolean` | Determines whether or not a `knockout` version of the Product Logo will be used. |         |
| `darkMode` | `boolean` | Determines if the logo will appear in darkMode or not.                           | `false` |

# Product LogoMarks

## Properties

| Prop       | Type      | Description                                                                      | Default |
| ---------- | --------- | -------------------------------------------------------------------------------- | ------- |
| `size`     | `number`  | Height of the Product Logo                                                       | `18`    |
| `knockout` | `boolean` | Determines whether or not a `knockout` version of the Product Logo will be used. |         |
| `darkMode` | `boolean` | Determines if the logo will appear in darkMode or not.                           | `false` |
