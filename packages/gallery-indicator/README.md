# Gallery Indicator

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/gallery-indicator.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/dots/live-example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/gallery-indicator
```

### NPM

```shell
npm install @leafygreen-ui/gallery-indicator
```

## Example

```js
import { GalleryIndicator } from `@leafygreen-ui/gallery-indicator`;

<GalleryIndicator
  length={4}
  activeIndex={0}
  darkMode
/>

```

## Properties

| Prop          | Type      | Description                                          | Default |
| ------------- | --------- | ---------------------------------------------------- | ------- |
| `length`      | `number`  | The total number of dots to render                   |         |
| `activeIndex` | `number`  | The index of the active dot                          |         |
| `darkMode`    | `boolean` | Determines if the component will render in dark mode | `false` |

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with LG `GalleryIndicator` in a product test suite. If the `GalleryIndicator` component cannot be found, an error will be thrown.

### Usage

```tsx
import { getTestUtils } from '@leafygreen-ui/gallery-indicator';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `GalleryIndicator`. It defaults to 'lg-gallery_indicator' if left empty.
```

#### Single `GalleryIndicator` component

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalleryIndicator, getTestUtils } from '@leafygreen-ui/gallery-indicator';

...

test('Gallery Indicator', () => {
  render(
    <GalleryIndicator
      length={4}
      activeIndex={0}
      darkMode
    />
  );

  const { getIndicatorlength, getActiveIndex } = getTestUtils();

  expect(getIndicatorlength()).toBe(4);
  expect(getActiveIndex()).toBe(0);
});
```

#### Multiple `GalleryIndicator` components

When testing multiple `GalleryIndicator` components, it is recommended to add the custom `data-lgid` attribute to each `GalleryIndicator`.

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalleryIndicator, getTestUtils } from '@leafygreen-ui/gallery-indicator';

...

test('GalleryIndicator', () => {
  render(
    <>
      <GalleryIndicator
        length={4}
        activeIndex={0}
        darkMode
        data-lgid="gallery-indicator-abc"
      />
      <GalleryIndicator
        length={5}
        activeIndex={1}
        darkMode
        data-lgid="gallery-indicator-xyz"
      />
    </>
  );

  const testUtils1 = getTestUtils('gallery-indicator-abc');
  const testUtils2 = getTestUtils('gallery-indicator-xy');

  // First GalleryIndicator
  expect(testUtils1.getIndicatorlength()).toBe(4);
  expect(testUtils1.getActiveIndex()).toBe(1);

  // Second GalleryIndicator
  expect(testUtils2.getIndicatorlength()).toBe(5);
  expect(testUtils2.getActiveIndex()).toBe(0);
});
```

### Test Utils

```tsx
const { getIndicatorlength, getActiveIndex } = getTestUtils();
```

| Util                   | Description                           | Returns  |
| ---------------------- | ------------------------------------- | -------- |
| `getIndicatorlength()` | Returns the number of indicators/dots | `number` |
| `getActiveIndex()`     | Returns the active indicator index    | `number` |
