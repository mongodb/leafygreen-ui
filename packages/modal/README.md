# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/modal/live-example/)

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

## Notes

Popover Elements within a Modal

Recommended Approach: `renderMode="top-layer"`
When using any LeafyGreen components that wrap a LeafyGreen `Popover`, we recommend setting the `renderMode` prop to the value "top-layer". This is the browser's default way of handling hierarchy, without worrying about the DOM or z-index collisions.

Example:

```js
<Modal>
  <Select renderMode="top-layer" />
</Modal>
```

Fallback:
If for some reason you must use a Portal with an element rendered inside of a Modal component, you can access the Modal's DOM structure by passing a ref to the `portalRef` property in the Modal component. We will set the current value of your ref to an element inside of the Modal itself.

Example:

```js
const portalRef = useRef<HTMLDivElement | null>(null)
const [containerState, setContainerState] = useState<React.RefObject<HTMLDivElement>>(null)

useEffect(() => {
  if (portalRef.current) {
    setContainerState(portalRef)
  }
}, [portalRef])

<Modal portalRef={portalRef}>
  <Select renderMode="portal" portalContainer={containerState.current}/>
</Modal>
```

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
| `portalRef`        | `React.RefObject<HTMLDivElement>` | Current property gets set with an element inside the Modal, in order to safely portal elements inside of the dialog element                          |              |

## Using `Clipboard.js` inside `Modal`

To directly use the `Clipboard.js` library inside of `Modal`, rather than using the `Copyable` component, the reference value of the `Modal` should be used as the `container` when `Clipboard.js` is instantiated. You can get the reference value by consuming the `usePopoverPortalContainer` hook:

```
  const { portalContainer } = usePopoverPortalContainer();

  const clipboard = new ClipboardJS(buttonRef, {
    container: portalContainer,
  });
```
