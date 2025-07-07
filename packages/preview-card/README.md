# Preview Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/preview-card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/preview-card/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/preview-card
```

### Yarn

```shell
yarn add @leafygreen-ui/preview-card
```

### NPM

```shell
npm install @leafygreen-ui/preview-card
```

## Description

The `PreviewCard` component is a container that can be expanded and collapsed to show or hide content. It's useful for displaying a preview of content that can be revealed in full by the user.

## Example

### Uncontrolled

```tsx
import { PreviewCard } from '@leafygreen-ui/preview-card';
import { Body } from '@leafygreen-ui/typography';

<PreviewCard>
  <Body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non
    mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
    tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
    Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
  </Body>
</PreviewCard>;
```

### Controlled

```tsx
import { useState } from 'react';
import { PreviewCard } from '@leafygreen-ui/preview-card';
import { Body } from '@leafygreen-ui/typography';

const [isOpen, setIsOpen] = useState(false);

<PreviewCard isOpen={isOpen} onOpenChange={setIsOpen}>
  <Body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non
    mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
    tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
    Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
  </Body>
</PreviewCard>;
```

## Properties

| Prop              | Type                          | Description                                                                                         | Default       |
| :---------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------- | :------------ |
| `children`        | `React.ReactNode`             | The content to be displayed inside the card.                                                        |               |
| `collapsedHeight` | `number \| string`            | The height of the card when it is collapsed. Can be a number (in pixels) or a string (e.g., '50%'). | `140`         |
| `defaultOpen`     | `boolean`                     | The default open state of the card when it is uncontrolled.                                         | `false`       |
| `isOpen`          | `boolean`                     | The open state of the card. Providing this prop will switch the component to controlled mode.       |               |
| `onOpenChange`    | `ChangeEventHandler<boolean>` | The event handler called when the open state of the card changes.                                   |               |
| `viewLessText`    | `React.ReactNode`             | The button text displayed when the card is expanded.                                                | `"View less"` |
| `viewMoreText`    | `React.ReactNode`             | The button text displayed when the card is collapsed.                                               | `"View more"` |

## Test Harnesses

### `getTestUtils`

`getTestUtils()` is a util that allows consumers to reliably interact with LG `PreviewCard` in a product test suite. If the `PreviewCard` instance cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/preview-card/testing';

const utils = getTestUtils(lgId?: `lg-${string}`); // lgId refers to the custom `data-lgid` attribute passed to a `PreviewCard` instance. It defaults to `lg-preview_card` if undefined.
```

#### Single `PreviewCard`

```tsx
import { getTestUtils, renderPreviewCard } from '@leafygreen-ui/preview-card/testing';

...

test('single preview card', () => {
  renderPreviewCard();
  const { getPreviewCard } = getTestUtils();

  expect(getPreviewCard()).toBeInTheDocument();
});
```

#### Multiple `PreviewCard` components

When testing multiple `PreviewCard` components it is recommended to add the custom `data-lgid` attribute to each `PreviewCard`.

```tsx
import { getTestUtils, renderMultiplePreviewCards } from '@leafygreen-ui/preview-card/testing';

...

test('multiple preview cards', () => {
  renderMultiplePreviewCards();
  const utilsOne = getTestUtils('lg-preview_card-1');
  const utilsTwo = getTestUtils('lg-preview_card-2');

  // First PreviewCard
  expect(utilsOne.getPreviewCard()).toBeInTheDocument();
  expect(utilsOne.isExpanded()).toBeFalsy();

  // Second PreviewCard
  expect(utilsTwo.getPreviewCard()).toBeInTheDocument();
  expect(utilsTwo.isExpanded()).toBeTruthy();
});
```

### Test Utils

```tsx
const {
  findPreviewCard,
  getContent,
  getPreviewCard,
  getToggle,
  isExpanded,
  queryPreviewCard,
} = getTestUtils();
```

| Util               | Description                                                      | Returns                   |
| ------------------ | ---------------------------------------------------------------- | ------------------------- |
| `findPreviewCard`  | Returns a promise that resolves to the component's root element. | `Promise<HTMLDivElement>` |
| `getContent`       | Returns the component's content element.                         | `HTMLDivElement`          |
| `getPreviewCard`   | Returns the component's root element.                            | `HTMLDivElement`          |
| `getToggle`        | Returns the component's toggle button element.                   | `HTMLButtonElement`       |
| `isExpanded`       | Returns a boolean indicating whether the card is expanded.       | `boolean`                 |
| `queryPreviewCard` | Returns the component's root element or null if not found.       | `HTMLDivElement \| null`  |
