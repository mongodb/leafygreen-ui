# Expandable Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/expandable-card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/expandable-card/example/)

## Installation

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

**Output HTML**

```html
<div id="expandable-card-1">
  <div
    role="button"
    aria-expanded="true"
    aria-controls="expandable-card-content-1"
    id="expandable-card-summary-1"
    tabindex="0"
  >
    <span>
      <h3>Lorem Ipsum</h3>
      <span>optional</span>
    </span>
    <div>Donec id elit non mi porta gravida at eget metus.</div>
    <svg
      width="16"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      role="img"
      aria-label="Chevron Up Icon"
    >
      ...
    </svg>
  </div>
  <div
    role="region"
    id="expandable-card-content-1"
    aria-labelledby="expandable-card-summary-1"
  >
    <div>
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
      ut fermentum massa justo sit amet risus.
    </div>
  </div>
</div>
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
