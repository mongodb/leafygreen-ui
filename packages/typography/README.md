# Typography

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/typography.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/typography/example/)

## Installation

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
import { H1, H2, Subtitle, Body, InlineCode, InlineKeyCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
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
```

**Output HTML**

```html
<h1 class="leafygreen-ui-wbskfk">Heading 1</h1>
<h2 class="leafygreen-ui-1t0mh6j">Heading 2</h2>
<h3 class="leafygreen-ui-1t0mh6j">Heading 3</h3>
<h6 class="leafygreen-ui-1dmxpt6">Subtitle</h6>
<div class="leafygreen-ui-wkgw79">Body</div>
<code class="leafygreen-ui-18bk0d8">Code</code>
<code class="leafygreen-ui-1vl51l4">CTRL</code
><code class="leafygreen-ui-1vl51l4">+</code
><code class="leafygreen-ui-1vl51l4">C</code>
<small class="leafygreen-ui-1cggyhz">Disclaimer</small>
<div class="leafygreen-ui-vezyzr">Overline</div>
<a
  href="http://mongodb.design"
  target="_blank"
  class="leafygreen-ui-1toaa4e"
  data-leafygreen-ui="anchor-container"
>
  <span>MongoDB.design</span>
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <title>Open in New Tab</title>
  </svg>
</a>
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

| Prop           | Type                | Description                                                                                        | Default                                       |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `weight`       | `'regular'          | 'medium'`                                                                                          | font-weight applied to typography element     | `'regular'` |
| `darkMode`     | `boolean`           | Determines if the component renders in dark mode                                                   | `false`                                       |
| `as`           | `React.ElementType` | Element to render the component as. **Note**: This will supersede the behavior of any other props. | `'p'`                                         |
| `baseFontSize` | `13` \| `16`        | font-size applied to typography element                                                            | Defaults to value set by LeafyGreen Provider. |

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
