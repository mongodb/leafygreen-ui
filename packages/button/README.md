# Button

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/button.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/button/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/button
```

### Yarn

```shell
yarn add @leafygreen-ui/button
```

### NPM

```shell
npm install @leafygreen-ui/button
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```tsx
<Button
  variant={Variant.Default}
  darkMode={true}
  size={Size.default}
  disabled={false}
  leftGlyph={<Icon glyph={leftGlyph} />}
  rightGlyph={<Icon glyph={rightGlyph} />}
>
  Button Test Content
</Button>
```

## Properties

| Prop               | Type                                                                                       | Description                                                                                                                                                                                                     | Default     |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `variant`          | `'default'`, `'primary'`, `'primaryOutline'`, `'danger'`, `'dangerOutline'`, `'baseGreen'` | Sets the style variant of the button.                                                                                                                                                                           | `'default'` |
| `darkMode`         | `boolean`                                                                                  | Determines if the component renders in dark mode                                                                                                                                                                | `false`     |
| `size`             | `'xsmall'`, `'small'`, `'default'`, `'large'`                                              | Sets the size variant of the button.                                                                                                                                                                            | `'default'` |
| `children`         | `node`                                                                                     | The content that will appear inside of the `<Button />` component.                                                                                                                                              | `null`      |
| `className`        | `string`                                                                                   | Adds a className to the class attribute.                                                                                                                                                                        | `''`        |
| `disabled`         | `boolean`                                                                                  | Disables the button                                                                                                                                                                                             | `false`     |
| `as`               | `'a' \| 'button'`                                                                          | Determines the root element. An `a` tags can be supplied to replace `button` from being the DOM element that wraps the component.                                                                               | `button`    |
| `href`             | `string`                                                                                   | If a href is supplied it will change the `as` value, such that the component renders inside of an `a` tag instead of inside of a `button` tag.                                                                  |             |
| `leftGlyph`        | `React.ReactElement`                                                                       | Glyph that will appear to the left of text, if there is text provided via the children prop. If no children are supplied to the component, passing an Icon here will render the button as an icon-only button.  |             |
| `rightGlyph`       | `React.ReactElement`                                                                       | Glyph that will appear to the right of text, if there is text provided via the children prop. If no children are supplied to the component, passing an Icon here will render the button as an icon-only button. |
| `isLoading`        | `boolean`                                                                                  | Indicates whether the Button is in a loading state                                                                                                                                                              | `false`     |
| `loadingText`      | `string`                                                                                   | String displayed in place of `children` while the button is in a loading state                                                                                                                                  |             |
| `baseFontSize`     | `14`, `16`                                                                                 | Determines the base font-size of the component                                                                                                                                                                  | `14`        |
| `loadingIndicator` | `React.ReactElement`                                                                       | Element to be rendered as loading indicator                                                                                                                                                                     |             |
| ...                | native attributes of component passed to as prop                                           | Any other properties will be spread on the root element                                                                                                                                                         |             |

_Note: In order to make this Component act as a submit button, the recommended approach is to pass `submit` as the `type` prop. Note it is also valid to pass `input` to the `as` prop, and the button's content's to the `value` prop -- in this case, do not supply children to the component._

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Button` in a product test suite. If the `Button` component cannot be found, an error will be thrown.

### Usage

```tsx
import Button, { getTestUtils } from '@leafygreen-ui/button';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Button`. It defaults to 'lg-button' if left empty.
```

#### Single `Button`

```tsx
import { render } from '@testing-library/react';
import Button, { getTestUtils } from '@leafygreen-ui/button';

...

test('button', () => {
  render(<Button>Click me</Button>);
  const { getButton } = getTestUtils();

  expect(getButton()).toBeInTheDocument();
});
```

#### Multiple `Button` components

When testing multiple `Button` components it is recommended to add the custom `data-lgid` attribute to each `Button`.

```tsx
import { render } from '@testing-library/react';
import Button, { getTestUtils } from '@leafygreen-ui/button';

...

test('button', () => {
  render(
    <>
      <Button data-lgid="button-1">Click 1</Button>
      <Button data-lgid="button-2" disabled>Click 2</Button>
    </>,
  );
  const utilsOne = getTestUtils('button-1'); // data-lgid
  const utilsTwo = getTestUtils('button-2'); // data-lgid
  // First Button
  expect(utilsOne.getButton()).toBeInTheDocument();
  expect(utilsOne.isDisabled()).toBe(false);

  // Second Button
  expect(utilsTwo.getButton()).toBeInTheDocument();
  expect(utilsTwo.isDisabled()).toBe(true);
});
```

### Test Utils

```tsx
const { getButton, isDisabled } = getTestUtils();
```

| Util         | Description                           | Returns             |
| ------------ | ------------------------------------- | ------------------- |
| `getButton`  | Returns the input node                | `HTMLButtonElement` |
| `isDisabled` | Returns whether the input is disabled | `boolean`           |

# Loading Props

## Props

### isLoading

When `isLoading` is `true`, it should always be coupled with `loadingText` and/or `loadingIndicator`. By itself, setting the `isLoading` prop to `true` simply makes the Button un-clickable, and hides the otherwise rendered content from the Button.

### loadingIndicator

The `loadingIndicator` prop expects a `React.ReactNode` that will be rendered within the button. Usually, this will be a `Spinner` from the LeafyGreen `@leafygreen-ui/loading-indicator` package.

### loadingText

The `loadingText` property determines what text content will be rendered inside of the Button, when `isLoading` is true.

## Examples

### Kitchen Sink

```js
<Button
  isLoading={true}
  loadingIndicator={<Spinner />}
  loadingText="loading..."
/>
```

### Just text

```js
<Button isLoading={true} loadingText="loading..." />
```

### Just indicator

```js
<Button isLoading={true} loadingIndicator={<Spinner />} />
```
