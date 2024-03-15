# Toggle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toggle.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/toggle/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/toggle
```

### NPM

```shell
npm install @leafygreen-ui/toggle
```

## Example

```js
import Toggle from '@leafygreen-ui/toggle';

return (
  <>
    <label id="label" htmlFor="toggle">
      Change setting
    </label>

    <Toggle
      id="toggle"
      aria-labelledby="label"
      onChange={(checked, event) => {
        /* Handle the change event */
      }}
    />
  </>
);
```

**Output HTML**

```html
<label for="toggle" id="label" class="leafygreen-ui-r8mbam"
  >Change setting</label
>

<div class="leafygreen-ui-19odf8z">
  <button
    id="toggle"
    aria-labelledby="label"
    role="switch"
    aria-checked="false"
    aria-disabled="false"
    class="leafygreen-ui-1vdkpyx"
    data-leafygreen-ui="toggle-button"
  >
    <span aria-hidden="true" class="leafygreen-ui-u8d1r2">On</span>
    <span aria-hidden="true" class="leafygreen-ui-1eonihm">Off</span>
    <div class="leafygreen-ui-uyx43a"></div>
  </button>

  <div data-leafygreen-ui="interaction-ring" class="leafygreen-ui-igvj0l"></div>
</div>
```

## Properties

| Prop        | Type                               | Description                                                                                                                                                                                        | Default     |
| ----------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `darkMode`  | `boolean`                          | Determines if the Toggle will render the dark mode styles.                                                                                                                                         | `false`     |
| `size`      | `'default'`, `'small'`, `'xsmall'` | Sets the size of the toggle.                                                                                                                                                                       | `'default'` |
| `checked`   | `boolean`                          | Set's the checked state of the Toggle.                                                                                                                                                             |             |
| `disabled`  | `boolean`                          | Disables the Toggle.                                                                                                                                                                               | `false`     |
| `onChange`  | `(checked, MouseEvent) => void`    | `onChange` fires when the `checked` state of the component is being updated. Receives the updated checked state of the toggle as its first argument, and the associated mouse event as the second. |             |
| `className` | `string`                           | Adds a className to the outermost element.                                                                                                                                                         | `''`        |
| ...         | HTML `button` attributes           | Any supported HTML button properties will be applied to the `button` element.                                                                                                                      |             |

## Accessibility

For the Toggle to be accessible to screen readers, you **must** pass either [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) to Toggle. Please note, if this is a part of a form, this is in addition to using `htmlFor` to associate a label with the Toggle. You will see TypeScript and console errors if this isn't done.

Please reach out if you would like further guidance on how to programmatically associate text with the Toggle component.

## getLGToggleUtils()

`getLGToggleUtils()` is a a util that allows consumers to reliably interact with `LG Toggle` in a product test suite. If the `Toggle` component cannot be found, an errror will be thrown.

### Usage

```tsx
import Toggle, { getLGToggleUtils } from '@leafygreen-ui/toggle';

const { elements, utils } = getLGToggleUtils(lgId?: string); // lgId defaults to 'lg-toggle' if left empty
```

#### Single `Toggle`

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleUtils } from '@leafygreen-ui/toggle';

...

test('toggle', () => {
  render(<Toggle aria-labelledby="label" />);
  const { elements, utils } = getLGToggleUtils();

  expect(elements.getInput()).toBeInTheDocument();
  expect(utils.inputValue()).toBe('false');
});
```

#### Multiple `Toggle`'s

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleUtils } from '@leafygreen-ui/toggle';

...

test('toggle', () => {
  render(
    <>
      <Toggle data-lgid="toggle-1" aria-labelledby="label 1" />
      <Toggle data-lgid="toggle-2" aria-labelledby="label 2" checked />
    </>,
  );
  const { elements: lgElementsToggle1, utils: lgUtilsToggle1 } =
    getLGToggleUtils('toggle-1');
  const { elements: lgElementsToggle2, utils: lgUtilsToggle2 } =
    getLGToggleUtils('toggle-2');

  // First toggle
  expect(lgElementsToggle1.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle1.inputValue()).toBe('false');

  // Second Toggle
  expect(lgElementsToggle2.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle2.inputValue()).toBe('true');
});
```

#### Multiple Form Elements

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleUtils } from '@leafygreen-ui/toggle';


...

test('Form', () => {
  render(
    <Form>
      <Toggle aria-labelledby="toggle label" />

    </Form>,
  );
  const { elements: lgElementsToggle, utils: lgUtilsToggle } = getLGToggleUtils();

  // First toggle
  expect(lgElementsToggle.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle.inputValue()).toBe('false');


});
```

### Test Utils

#### Elements

```tsx
const {
  elements: { getInput },
} = getLGToggleUtils();
```

| Util       | Description            | Returns             |
| ---------- | ---------------------- | ------------------- |
| `getInput` | Returns the input node | `HTMLButtonElement` |

#### Utils

```tsx
const {
  utils: { isDisabled, inputValue },
} = getLGToggleUtils();
```

| Util         | Description                           | Returns              |
| ------------ | ------------------------------------- | -------------------- |
| `isDisabled` | Returns whether the input is disabled | `boolean`            |
| `inputValue` | Returns the input value               | `'true'`\| `'false'` |
