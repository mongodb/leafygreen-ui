# Expandable Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/expandable-card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/expandable-card/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/expandable-card
```

### Yarn

```shell
yarn add @leafygreen-ui/expandable-card
```

### NPM

```shell
npm install @leafygreen-ui/expandable-card
```

## Example

```js
import ExpandableCard from '@leafygreen-ui/expandable-card';

<ExpandableCard
  title="Lorem Ipsum"
  description="Donec id elit non mi porta gravida at eget metus"
  flagText="optional"
  darkMode={false}
>
  Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
  fermentum massa justo sit amet risus.
</ExpandableCard>;
```

## Properties

| Prop             | Type                                    | Description                                                                             | Default     |
| ---------------- | --------------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| title            | `React.ReactNode`                       | The title of the card (Required)                                                        |             |
| description      | `string`                                | Description text below the title                                                        |             |
| flagText         | `string`                                | Text in parentheses immediately following the title. Typically 'optional' or 'required' |             |
| darkMode         | `boolean`                               | Toggles dark mode                                                                       | `false`     |
| defaultOpen      | `boolean`                               | Defines the default state of the card                                                   | `false`     |
| isOpen           | `boolean`                               | Forces the card state                                                                   | `undefined` |
| onClick          | `(event: React.SyntheticEvent) => void` | Callback fired when a user clicks the card header                                       |             |
| id               | `string`                                | Unique id for the card                                                                  |             |
| className        | `string`                                | Styling prop                                                                            |             |
| contentClassName | `string`                                | Styling prop for children                                                               |             |
