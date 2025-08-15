# Typography

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/typography.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/typography/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/typography
```

### Yarn

```shell
yarn add @leafygreen-ui/typography
```

### NPM

```shell
npm install @leafygreen-ui/typography
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import { H1, H2, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline, Link, BackLink } from '@leafygreen-ui/typography';
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<Subtitle>Subtitle</Subtitle>
<Body weight="medium">Body</Body>
<InlineCode>Code</InlineCode>
<>
  <InlineKeyCode>CTRL</InlineKeyCode>
  <InlineCode>+</InlineCode>
  <InlineKeyCode>C</InlineKeyCode>
</>
<Disclaimer>Disclaimer</Disclaimer>
<Overline>Overline</Overline>
<Link href="http://mongodb.design">MongoDB.design</Link>
<BackLink href="/home">MongoDB.design</BackLink>
```

## Properties

All props extend the HTMLElementProps of their root tag, however the below components accept extra props

| Component       | Root    |
| --------------- | ------- |
| `H1`            | `h1`    |
| `H2`            | `h2`    |
| `H3`            | `h3`    |
| `Subtitle`      | `h6`    |
| `Body`          | `p`     |
| `InlineCode`    | `code`  |
| `InlineKeyCode` | `code`  |
| `Disclaimer`    | `small` |
| `Overline`      | `p`     |
| `Link`          | `a`     |
| `BackLink`      | `a`     |
| `Label`         | `label` |
| `Description`   | `p`     |
| `Label`         | `p`     |

# H1

| Prop       | Type                | Description                                                                                        | Default |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `darkMode` | `boolean`           | Determines if the component renders in dark mode                                                   | `false` |
| `as`       | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'h1'`  |

# H2

| Prop       | Type                | Description                                                                                        | Default |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `darkMode` | `boolean`           | Determines if the component renders in dark mode                                                   | `false` |
| `as`       | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'h2'`  |

# H3

| Prop       | Type                | Description                                                                                        | Default |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `darkMode` | `boolean`           | Determines if the component renders in dark mode                                                   | `false` |
| `as`       | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'h3'`  |

# Subtitle

| Prop       | Type                | Description                                                                                        | Default |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `darkMode` | `boolean`           | Determines if the component renders in dark mode                                                   | `false` |
| `as`       | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'h6'`  |

# Body

| Prop           | Type                                      | Description                                                                                        | Default                                       |
| -------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `weight`       | `'regular'` \| `'medium'` \| `'semiBold'` | font-weight applied to typography element                                                          | `'regular'`                                   |
| `darkMode`     | `boolean`                                 | Determines if the component renders in dark mode                                                   | `false`                                       |
| `as`           | `React.ElementType`                       | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'p'`                                         |
| `baseFontSize` | `13` \| `16`                              | font-size applied to typography element                                                            | Defaults to value set by LeafyGreen Provider. |

# InlineCode

| Prop           | Type                  | Description                                                                                                                                              | Default                                       |
| -------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `href`         | `string \| undefined` | If an `href` prop is passed to `InlineCode` it will be rendered with an `a` tag wrapping the `code` tag. Otherwise, it'll simply render as a `code` tag. |                                               |
| `darkMode`     | `boolean`             | Determines if the component renders in dark mode                                                                                                         |                                               |
| `baseFontSize` | `13` \| `16`          | font-size applied to typography element                                                                                                                  | Defaults to value set by LeafyGreen Provider. |

# InlineKeyCode

| Prop           | Type         | Description                                      | Default                                       |
| -------------- | ------------ | ------------------------------------------------ | --------------------------------------------- |
| `darkMode`     | `boolean`    | Determines if the component renders in dark mode |                                               |
| `baseFontSize` | `13` \| `16` | font-size applied to typography element          | Defaults to value set by LeafyGreen Provider. |

# Disclaimer

| Prop       | Type      | Description                                      | Default |
| ---------- | --------- | ------------------------------------------------ | ------- |
| `darkMode` | `boolean` | Determines if the component renders in dark mode | `false` |

# Error

| Prop       | Type      | Description                                      | Default |
| ---------- | --------- | ------------------------------------------------ | ------- |
| `darkMode` | `boolean` | Determines if the component renders in dark mode | `false` |

# Overline

| Prop       | Type                | Description                                                                                                         | Default |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- | ------- |
| `as`       | `React.ElementType` | The component or Element to render the component as. **Note**: This will supersede the behavior of any other props. | `p`     |
| `darkMode` | `boolean`           | Determines if the component renders in dark mode                                                                    | `false` |

# Link

| Prop               | Type                             | Description                                                                                                                                                                              | Default                                       |
| ------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `arrowAppearance`  | `'hover'`, `'persist'`, `'none'` | Displays a right arrow adjacent to the anchor tag. When set to `persist` the arrow will always be present. When set to `hover`, the arrow will only appear when hovering over the arrow. | `'none'`                                      |
| `hideExternalIcon` | `boolean`                        | Hides the external icon when the current host name is different from the host of the destination URL                                                                                     | `false`                                       |
| `darkMode`         | `boolean`                        | Determines if the component renders in dark mode                                                                                                                                         | `false`                                       |
| `as`               | `React.ElementType`              | Element to render the component as. **Note**: This will supersede the behavior of any other props.                                                                                       | `'a'`                                         |
| `baseFontSize`     | `13` \| `16`                     | font-size applied to typography element                                                                                                                                                  | Defaults to value set by LeafyGreen Provider. |

# BackLink

_Note_: `BackLink` is intended for internal linking only

| Prop           | Type                | Description                                                                                        | Default                                       |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `darkMode`     | `boolean`           | Determines if the component renders in dark mode                                                   | `false`                                       |
| `as`           | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'a'`                                         |
| `baseFontSize` | `13` \| `16`        | font-size applied to typography element                                                            | Defaults to value set by LeafyGreen Provider. |

# Label

| Prop           | Type                | Description                                                                                                         | Default                                       |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `darkMode`     | `boolean`           | Determines if the component renders in dark mode                                                                    | `false`                                       |
| `disabled`     | `boolean`           | Determines whether the component should appear disabled                                                             | `false`                                       |
| `baseFontSize` | `13` \| `16`        | font-size applied to typography element                                                                             | Defaults to value set by LeafyGreen Provider. |
| `as`           | `React.ElementType` | The component or Element to render the component as. **Note**: This will supersede the behavior of any other props. | `label`                                       |

# Description

| Prop           | Type         | Description                                      | Default                                       |
| -------------- | ------------ | ------------------------------------------------ | --------------------------------------------- |
| `darkMode`     | `boolean`    | Determines if the component renders in dark mode | `false`                                       |
| `baseFontSize` | `13` \| `16` | font-size applied to typography element          | Defaults to value set by LeafyGreen Provider. |
