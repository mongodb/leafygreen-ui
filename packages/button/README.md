# Button

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/button.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/button/example/)

## Installation

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

```js
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

**Output HTML**

```html
<button type="button" class="leafygreen-ui-1m13q2j" aria-disabled="false">
  <div class="leafygreen-ui-1igr8p9">
    <svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      class="leafygreen-ui-1s3nqii"
      role="presentation"
      aria-hidden="true"
      alt=""
    >
      <path
        d="M10.623 1a.886.886 0 01.041 1.772V5.34c0 .114.035.239.095.343l3.516 5.647.002.003c.232.387.356.818.356 1.254 0 .4-.106.804-.318 1.17l-.003.006-.004.007-.095.158A2.36 2.36 0 0112.217 15h-8.4c-.44 0-.86-.118-1.22-.333a2.448 2.448 0 01-.875-.904l-.001-.003a2.428 2.428 0 01-.301-1.163c0-.438.123-.877.367-1.268l3.53-5.647a.695.695 0 00.094-.343V2.772A.885.885 0 015.452 1zM8.904 2.774H7.185V5.34c0 .457-.136.892-.365 1.27l-.001.001-3.522 5.657a.644.644 0 00-.103.343c0 .102.026.2.081.296l.003.005a.62.62 0 00.553.329h8.4c.12 0 .223-.031.316-.087a.675.675 0 00.238-.898L9.272 6.612a2.324 2.324 0 01-.368-1.273V2.774zm.606 6.633l1.553 2.49a.227.227 0 01.01.243.223.223 0 01-.206.122H5.195c-.122 0-.187-.075-.206-.122-.028-.056-.056-.15.01-.243l1.553-2.49H9.51z"
        fill="currentColor"
      ></path></svg
    >Button Test Content<svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      class="leafygreen-ui-voftg9"
      role="presentation"
      aria-hidden="true"
      alt=""
    >
      <path
        d="M14 4v7H2V4c0-1.102.898-2 2-2h8c1.102 0 2 .898 2 2zm-2 5V4H4v5h8zM0 12h16v1c0 .555-.445 1-1 1H1c-.555 0-1-.445-1-1v-1z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  </div>
</button>
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
