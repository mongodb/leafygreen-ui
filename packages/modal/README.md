# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/modal/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/modal
```

### Yarn

```shell
yarn add @leafygreen-ui/modal
```

### NPM

```shell
npm install @leafygreen-ui/modal
```

## Example

### v20+

```tsx
import { css } from '@leafygreen-ui/emotion';
import Modal from '@leafygreen-ui/modal';

const customModalStyles = css`
  // modal root styles

  &::backdrop {
    // modal backdrop styles
  }
`;

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(curr => !curr)}>Open Modal</button>
      <Modal open={open} setOpen={setOpen} className={customModalStyles}>
        <h2>Modal title</h2>
        <p>More modal content</p>
        <button onClick={() => {}} autoFocus>
          Modal action
        </button>
      </Modal>
    </>
  );
}
```

### Pre-v20

```tsx
import { css } from '@leafygreen-ui/emotion';
import Modal from '@leafygreen-ui/modal';

const customModalRootStyles = css`
  // modal root styles
`;

const customBackdropStyles = css`
  // modal backdrop styles
`;

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(curr => !curr)}>Open Modal</button>
      <Modal
        open={open}
        setOpen={setOpen}
        className={customBackdropStyles}
        contentClassName={customModalRootStyles}
        initialFocus="#init-focus-el"
      >
        <h2>Modal title</h2>
        <p>More modal content</p>
        <button id="init-focus-el" onClick={() => {}}>
          Modal action
        </button>
      </Modal>
    </>
  );
}
```

## Properties

| Prop                          | Type                                                                 | Description                                                                                                                           | Default      |
| ----------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `children`                    | `ReactNode`                                                          | Content that will appear inside of the Modal component.                                                                               |              |
| `closeIconColor` _(optional)_ | `'default' \| 'dark' \| 'light'`                                     | Determines the color of the close icon.                                                                                               | `'default'`  |
| `darkMode` _(optional)_       | `boolean`                                                            | Determines if the component will appear in dark mode.                                                                                 | `false`      |
| `id` _(optional)_             | `string`                                                             | Unique identifier for the Modal.                                                                                                      |              |
| `initialFocus` _(optional)_   | `'auto' \| string \| React.RefObject<HTMLElement> \| null`           | Specifies which element should receive focus when the modal opens. See [Initial focus behavior](#initial-focus-behavior) for details. | `'auto'`     |
| `open` _(optional)_           | `boolean`                                                            | Determines the open state of the modal.                                                                                               | `false`      |
| `setOpen` _(optional)_        | `(open: boolean) => void \| React.Dispatch<SetStateAction<boolean>>` | Callback to change the open state of the Modal.                                                                                       | `() => {}`   |
| `shouldClose` _(optional)_    | `() => boolean`                                                      | Callback to determine whether or not Modal should close when user tries to close it.                                                  | `() => true` |
| `size` _(optional)_           | `'small' \| 'default' \| 'large'`                                    | Specifies the size of the Modal.                                                                                                      | `'default'`  |

### v20+

| Prop                             | Type     | Description                                                                                                                                                         | Default |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `className` _(optional)_         | `string` | Applies a className to the Modal root element.                                                                                                                      |         |
| `backdropClassName` _(optional)_ | `string` | **@deprecated** _(optional)_ Applies a className to the Modal backdrop. Use CSS `::backdrop` pseudo-element instead. This prop will be removed in a future version. |         |

### pre-v20

| Prop                            | Type     | Description                                              | Default |
| ------------------------------- | -------- | -------------------------------------------------------- | ------- |
| `className` _(optional)_        | `string` | Applies a className to the Modal backdrop.               |         |
| `contentClassName` _(optional)_ | `string` | Applies a className to the Modal content wrapper element |         |

## Additional notes

### Popover children elements

When using popover elements (tooltips, selects, etc.) inside a Modal, it is recommended that they use the top layer to ensure proper stacking and avoid rendering issues.

For LeafyGreen UI popover components, this is handled automatically in the latest versions as they default to `renderMode="top-layer"`. If you're using custom popover implementations or need to explicitly set the render mode, ensure they use the top layer.

### Initial focus behavior

When a Modal opens, it automatically manages focus to ensure proper accessibility. You can control this behavior using the `initialFocus` prop.

#### Focus Priority Order

1. **`initialFocus` prop**: The specified element receives focus
   - String selector: `initialFocus="#submit-button"`
   - React ref: `initialFocus={submitButtonRef}` (recommended over string selector for better type safety)
2. **`autoFocus` attribute**: If any child element has the `autoFocus` attribute, that element receives focus
3. **First focusable element**: If `initialFocus` is `"auto"` and no child element has the `autoFocus` attribute, the first focusable element receives focus
4. **No focus**: If `initialFocus` is `null`, no automatic focus occurs

### Using `Clipboard.js` inside `Modal`

To directly use the `Clipboard.js` library inside of `Modal`, rather than using the `Copyable` component, the reference value of the `Modal` should be used as the `container` when `Clipboard.js` is instantiated. You can get the reference value by consuming the `usePopoverPortalContainer` hook:

```tsx
import { usePopoverPortalContainer } from '@leafygreen-ui/leafygreen-provider';

function ExampleComponent() {
  const { portalContainer } = usePopoverPortalContainer();

  const clipboard = new ClipboardJS(buttonRef, {
    container: portalContainer,
  });
}
```

### Backdrop styling

The preferred approach for styling the modal backdrop is to use the native CSS `::backdrop` pseudo-element:

```css
.my-modal::backdrop {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}
```

The deprecated `backdropClassName` prop exists only to ease migration from previous Modal implementations and will be removed in a future version.

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Modal` in a product test suite. If the `Modal` component cannot be found, an error will be thrown.

### Usage

```tsx
import {Modal} from '@leafygreen-ui/modal';
import { getTestUtils } from '@leafygreen-ui/modal/testing';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Modal`. It defaults to 'lg-modal' if left empty.
```

#### Single `Modal`

```tsx
import { render } from '@testing-library/react';
import {Modal} from '@leafygreen-ui/modal';
import { getTestUtils } from '@leafygreen-ui/modal/testing';

...

test('modal', () => {
  render(
    <Modal open>
      <p>Modal content</p>
    </Modal>
    );
  const { getModal } = getTestUtils();
  expect(getModal()).toBeInTheDocument();
});
```

### Test Utils

```tsx
const { findModal, getModal, queryModal } = getTestUtils();
```

| Util         | Description                                                                                           | Returns       |
| ------------ | ----------------------------------------------------------------------------------------------------- | ------------- |
| `findModal`  | Returns a promise that resolves to the modal element                                                  | `HTMLElement` |
| `getModal`   | Returns the modal element. Will throw if no elements match.                                           | `HTMLElement` |
| `queryModal` | Returns the modal element or `null` if no elements match. Will throw if more than one match is found. | `HTMLElement` |

## Testing Considerations

The `Modal` component uses the native `HTMLDialogElement` API for better accessibility and browser-native behavior. However, `JSDOM` (used by `Jest` and other test runners) does not fully support this API. You'll need to mock the `show`, `showModal`, and `close` methods in your test setup:

```tsx
beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = false;
  });
});
```

This mock can be placed in a `beforeAll` block in your test file, or in a global test setup file.
