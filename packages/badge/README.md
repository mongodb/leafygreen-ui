# Badge

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/badge.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/badge--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/badge
```

### NPM

```shell
npm install @leafygreen-ui/badge
```

## Example

```Javascript
import Badge from '@leafygreen-ui/badge';

<Badge variant='blue' className='my-badge'>
  New
</Badge>
```

**Output HTML**

```HTML
  <div class="leafygreen-ui-rhgfxf my-badge">New</div>
```

## Properties

| Prop        | Type                                                                  | Description                                                       | Default       |
| ----------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `variant`   | `'lightgray'`, `'darkgray'`, `'red'`, `'blue'`, `'green'`, `'yellow'` | Sets the style variant of the badge.                              | `'lightgray'` |
| `className` | `string`                                                              | Adds a className to the class attribute                           |               |
| `children`  | `node`                                                                | The content that will appear inside of the `<Badge />` component. |               |

_Any other properties will be spread on the root element._

Note: Specifying the `onClick` attribute will change the cursor style to pointer.
