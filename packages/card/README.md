# Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/card.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/card
```

### NPM

```shell
npm install @leafygreen-ui/card
```

## Example

```Javascript
import Card from '@leafygreen-ui/card';

<Card
  as='div'
  className='card-styles'
>
  This is my card component
</Card>
```

**Output HTML**

```HTML
 <div class="leafygreen-ui-1xf4bcx">This is a card component</div>
```

## Properties

| Prop        | Type                          | Description                                                                                                                                        | Default   |
| ----------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `as`        | `HTML Tag` or `React Element` | Determines the root element. For example, `Link` or `a` tags can be supplied to replace `div` from being the DOM element that wraps the component. | `section` |
| `className` | `string`                      | Adds a className to the class attribute                                                                                                            |           |
| `children`  | `node`                        | The children of the rendered inside of the `<Card/>` component.                                                                                    |           |

_Any other properties will be spread on the input element._
