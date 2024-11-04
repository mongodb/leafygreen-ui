# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/modal/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/modal
```

### NPM

```shell
npm install @leafygreen-ui/modal
```

## Example

```js
import Modal from '@leafygreen-ui/modal';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(curr => !curr)}>Open Modal</button>
      <Modal open={open} setOpen={setOpen}>
        Modal Content goes here.
      </Modal>
    </>
  );
}
```

**Output HTML**

```html
<button>Open Modal</button>
<div aria-modal="true" role="dialog" tabindex="-1" class="leafygreen-ui-2e4yhj">
  <button
    tabindex="0"
    aria-disabled="false"
    aria-label="Close modal"
    class="leafygreen-ui-zndd6x"
  >
    <div class="leafygreen-ui-xhlipt">
      <svg
        class="leafygreen-ui-19fdo3o"
        height="20"
        width="20"
        viewBox="0 0 16 16"
        role="img"
      >
        <g
          id="X-Copy"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M9,7 L13.5,7 L13.5,9 L9,9 L9,13.5 L7,13.5 L7,9 L2.5,9 L2.5,7 L7,7 L7,2.5 L9,2.5 L9,7 Z"
            id="Combined-Shape-Copy"
            fill="currentColor"
            transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "
          ></path>
        </g>
      </svg>
    </div></button
  >Modal Content goes here.
</div>
```

## Notes

It is HIGHLY encouraged that any children inside of `Modal` should refrain from using `usePortal={false}` because this can cause stacking context/z-indexing issues since the popover element will render relative to the parent rather than rendering in a `React portal` which is automatically appended to the `Modal`. By default any component that can use a `React portal`, like `Tooltip` or `Select`, will have `usePortal` set to `true`.

## Properties

| Prop               | Type                              | Description                                                                                                                                          | Default      |
| ------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open`             | `boolean`                         | Determines open state of `Modal` component                                                                                                           | `false`      |
| `setOpen`          | `function`                        | Callback to set open state of Modal component. `setOpen` accepts a boolean value, which will determine the open state of `Modal` component.          | `() => {}`   |
| `size`             | `'small'`, `'default'`, `'large'` | Determines `Modal` size.                                                                                                                             | `'default'`  |
| `shouldClose`      | `function`                        | Callback to determine whether or not Modal should close when user tries to close it.                                                                 | `() => true` |
| `children`         | `node`                            | Children that will be rendered inside `<Modal />` component.                                                                                         |              |
| `className`        | `string`                          | Style to be applied to the container's root node.                                                                                                    |              |
| `contentClassName` | `string`                          | Style to be applied to the content div.                                                                                                              |              |
| `initialFocus`     | `string`                          | A selector string for the element to move focus to when the modal is opened. The first focusable element in the modal will receive focus by default. |              |
| `darkMode`         | `boolean`                         | Determines if the component will appear in dark mode.                                                                                                | `false`      |
| `closeIconColor`   | `'default'`, `'dark'`, `'light'`  | Determines the color of the close icon.                                                                                                              | `default`    |

## Using `Clipboard.js` inside `Modal`

To directly use the `Clipboard.js` library inside of `Modal`, rather than using the `Copyable` component, the reference value of the `Modal` should be used as the `container` when `Clipboard.js` is instantiated. You can get the reference value by consuming the `usePopoverPortalContainer` hook:

```
  const { portalContainer } = usePopoverPortalContainer();

  const clipboard = new ClipboardJS(buttonRef, {
    container: portalContainer,
  });
```
