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

## Test Harnesses

### `getTestUtils`

`getTestUtils()` is a util that allows consumers to reliably interact with LG `ExpandableCard` in a product test suite. If the `ExpandableCard` instance cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/expandable-card/testing';

const utils = getTestUtils(lgId?: `lg-${string}`); // lgId refers to the custom `data-lgid` attribute passed to `ExpandableCard`. It defaults to 'lg-expandable_card' if left empty.
```

#### Single `ExpandableCard` component

```tsx
import { render } from '@testing-library/react';
import { ExpandableCard } from '@leafygreen-ui/expandable-card';
import { getTestUtils } from '@leafygreen-ui/expandable-card/testing';

test('expandable card', () => {
  render(
    <ExpandableCard
      title="Lorem Ipsum"
      description="Im leafy"
      flagText="optional"
      darkMode={false}
    >
      <p>We are all leafy</p>
    </ExpandableCard>,
  );
  const { getExpandableCard, isExpanded, getTitle, getDescription } =
    getTestUtils();

  expect(getExpandableCard()).toBeInTheDocument();
  expect(getTitle()).toHaveTextContent('Lorem Ipsum');
  expect(getDescription()).toHaveTextContent('Im leafy');
  expect(isExpanded()).toBeFalsy();
});
```

#### Multiple `ExpandableCard` components

When testing multiple `ExpandableCard` components it is recommended to add the custom `data-lgid` attribute to each `ExpandableCard`.

```tsx
import { render } from '@testing-library/react';
import { ExpandableCard } from '@leafygreen-ui/expandable-card';
import { getTestUtils } from '@leafygreen-ui/expandable-card/testing';

...

test('multiple expandable cards', () => {
  render(
    <>
      <ExpandableCard data-lgid="lg-expandable_card-1" title="Card 1 Title" description="Im leafy" flagText="optional" darkMode={false} >
        <p>We are all leafy</p>
      </ExpandableCard>
      <ExpandableCard data-lgid="lg-expandable_card-2" title="Card 2 Title" description="Im not leafy" flagText="boptional" darkMode={false} >
        <p>We are all not leafy</p>
      </ExpandableCard>
    </>
  );
  const utilsOne = getTestUtils('lg-expandable_card-1');
  const utilsTwo = getTestUtils('lg-expandable_card-2');

  expect(utilsOne.getTitle()).toHaveTextContent('Card 1 Title');
  expect(utilsTwo.getTitle()).toHaveTextContent('Card 2 Title');
```

### Test Utils

```tsx
const {
  findExpandableCard,
  getExpandableCard,
  queryExpandableCard,
  getToggle,
  isExpanded,
  getTitle,
  getDescription,
  getFlagText,
} = getTestUtils();
```

| Util                  | Description                                                                                               | Returns                        |
| --------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `findExpandableCard`  | Returns a promise that resolves to the component's root element.                                          | `Promise<HTMLDivElement>`      |
| `getExpandableCard`   | Returns the component's root element. Will throw if no elements match or if more than one match is found. | `HTMLDivElement`               |
| `queryExpandableCard` | Returns the component's root element or `null` if not found.                                              | `HTMLDivElement` \| `null`     |
| `getToggle`           | Returns the component's toggle button element.                                                            | `HTMLButtonElement`            |
| `isExpanded`          | Returns a boolean indicating whether the card is expanded.                                                | `boolean`                      |
| `getTitle`            | Returns the component's title element.                                                                    | `HTMLHeadingElement` \| `null` |
| `getDescription`      | Returns the component's description element.                                                              | `HTMLDivElement` \| `null`     |
| `getFlagText`         | Returns the component's flag text element.                                                                | `HTMLSpanElement` \| `null`    |
