# Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/card/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/card
```

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

## Properties

Card is a styled wrapper for the Box component. Any properties you would pass to Box can also be passed to Card.

| Prop        | Type              | Description                                                       | Default |
| ----------- | ----------------- | ----------------------------------------------------------------- | ------- |
| `children`  | `React.ReactNode` | Content rendered inside of the `<Card />` component               |         |
| `className` | `string`          | Adds a className to the class attribute                           |         |
| `darkMode`  | `boolean`         | Determines whether or not the component will appear in dark mode. | `false` |

_Any other properties will be spread on the Box element._

## Usage and Interactivity

This component is designed to be a container for other elements and content. Adding `onClick` or `href` directly to the component is discouraged. Instead, we recommend adding interactive elements inside the component.

### DON'T

```js
<Card onClick={handleOnClick}>This is my card component</Card>
```

### DO

```js
<Card>
  <CustomCardHeader onClick={handleOnClick} />
</Card>
```
