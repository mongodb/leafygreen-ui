# Typography

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/typography.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/typography
```

### NPM

```shell
npm install @leafygreen-ui/typography
```

# H1

## Example

```jsx
import { H1, H2, Subtitle, Body, InlineCode, Disclaimer, Overline } from '@leafygreen-ui/typography';
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<Subtitle>Subtitle</Subtitle>
<Body weight="medium">Body</Body>
<InlineCode>Code</InlineCode>
<Disclaimer>Disclaimer</Disclaimer>
<Overline>Overline</Overline>
```

**Output HTML**

```html
<h1 class="leafygreen-ui-wbskfk">Heading 1</h1>
<h2 class="leafygreen-ui-1t0mh6j">Heading 2</h2>
<h6 class="leafygreen-ui-1dmxpt6">Subtitle</h6>
<p class="leafygreen-ui-wkgw79">Body</p>
<code class="leafygreen-ui-18bk0d8">Code</code>
<small class="leafygreen-ui-1cggyhz">Disclaimer</small>
<div class="leafygreen-ui-vezyzr">Overline</div>
```

## Properties

All props extend the HTMLElementProps of their root tag, however `<Body />` and `<Overline/>` accept extra props

| Component    | Root    |
| ------------ | ------- |
| `H1`         | `h1`    |
| `H2`         | `h2`    |
| `Subtitle`   | `h6`    |
| `Body`       | `p`     |
| `InlineCode` | `code`  |
| `Disclaimer` | `small` |
| `Overline`   | `p`     |

## Body

| Prop     | Type                | Description                               | Default   |
| -------- | ------------------- | ----------------------------------------- | --------- |
| `weight` | `regular`, `medium` | font-weight applied to typography element | `regular` |

## Overline

| Prop        | Type                                  | Description                                                                                                                         | Default |
| ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `component` | `HTMLElement` or `React.ReactElement` | The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props. | `p`     |
