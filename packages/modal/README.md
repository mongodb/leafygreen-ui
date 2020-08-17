# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/modal--default)

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

## Properties

| Prop                   | Type                        | Description                                                                                                                                 | Default      |
| ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open`                 | `boolean`                   | Determines open state of `Modal` component                                                                                                  | `false`      |
| `setOpen`              | `function`                  | Callback to set open state of Modal component. `setOpen` accepts a boolean value, which will determine the open state of `Modal` component. | `() => {}`   |
| `size`                 | `small`, `default`, `large` | Determines `Modal` size.                                                                                                                    | `default`    |
| `shouldClose`          | `function`                  | Callback to determine whether or not Modal should close when user tries to close it.                                                        | `() => true` |
| `children`             | `node`                      | Children that will be rendered inside `<Modal />` component.                                                                                |              |
| `className`            | `string`                    | Style to be applied to the container's root node.                                                                                           |              |
| `contentClassName`     | `string`                    | Style to be applied to the content div.                                                                                                     |              |
| `closeOnBackdropClick` | `boolean`                   | Determines whether or not a Modal should close when a user clicks outside the modal.                                                        | `true`       |

_Any other properties will be spread on the overlay container's root node._
