# Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/card/example/)

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

```js
import Card from '@leafygreen-ui/card';

<Card className="card-styles" as="article">
  This is my card component
</Card>;
```

**Output HTML**

```html
<div class="leafygreen-ui-1lu17q2 card-styles">This is my card component</div>
```

## Properties

Card is a styled wrapper for the Box component. Any properties you would pass to Box can also be passed to Card.

| Prop           | Type                    | Description                                                       | Default                                                                 |
| -------------- | ----------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `className`    | `string`                | Adds a className to the class attribute                           |                                                                         |
| `contentStyle` | `'none'`, `'clickable'` | Whether the card should display as a visually clickable element.  | `'clickable'` when a valid `onClick` handler or `href` link is provided |
| `darkMode`     | `boolean`               | Determines whether or not the component will appear in dark mode. | `false`                                                                 |

_Any other properties will be spread on the Box element._
