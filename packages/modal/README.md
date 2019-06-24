# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

## Example

```js
import Modal, { ModalSize, useModalState } from '@leafygreen-ui/Menu';

function ExampleComponent() {
  const { active, setActive } = useModalState();

  return (
    <>
      <button onClick={() => setActive(active => !active)}>Open Modal</button>
      <Modal
        active={active}
        setActive={setActive}
        usePortal
        title="Modal Title"
      >
        Modal Content goes here
      </Modal>
    </>
  );
}
```

**Output HTML**

```html
<button>Open Modal</button>
<div class="leafygreen-ui-np1ghg">
  <div class="leafygreen-ui-zbhk5h" tabindex="-1">
    <svg
      width="24"
      height="24"
      role="img"
      viewBox="0 0 16 16"
      fill="#000"
      class="leafygreen-ui-eg8nsy"
      data-dismiss="modal"
      aria-hidden="true"
      size="24"
    >
      <title>X Icon</title>
      <path
        d="M9.414 8l3.182 3.182-1.414 1.414L8 9.414l-3.182 3.182-1.414-1.414L6.586 8 3.404 4.818l1.414-1.414L8 6.586l3.182-3.182 1.414 1.414L9.414 8z"
        fill="#000"
        fill-rule="evenodd"
      ></path>
    </svg>
    <header>
      <h3 class="leafygreen-ui-1uk1gs8">Modal Title</h3>
      <hr />
    </header>

    <div class="leafygreen-ui-j88j89">Modal Content goes here</div>
  </div>
</div>
```

## Properties

### active

**Type:** `boolean`

**Default:** `false`

Determines active state of `Modal` component

### setActive

**Type:** `function`

**Default:** `(bool) => {}`

Callback to set active state of Modal component. `setActive` optionally accepts a boolean value, which will determine the active state of `Modal` component.

### size

**Type:** `string`

**Default:** `default`

Determines `Modal` size. Options: `['xxsmall', 'xsmall', 'small', 'default', 'large', 'xlarge']`

### title

**Type:** `string`

**Default:** ``

Determines whether or not a header will appear inside `Modal` component, containing title information displayed.

### children

**Type:** `node`

**Default:** `null`

Children that will be rendered inside `Modal` component.

### modalShouldClose

**Type:** `function`

**Default:** `() => bool`

Callback invoked when user tries to close modal. If function returns false, the modal will not close.

### className

**Type:** `string`

**Default:** ``

Style to be applied to the overlay container's root node.

### usePortal

**Type:** `boolean`

**Default:** `true`

Will position `Modal` children relative to its parent without using a Portal if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.

#### Any other properties will be spread on the overlay container's root node.
