# Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/modal.svg)

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
<div>
  <div class="leafygreen-ui-13zb3fo">
    <div class="leafygreen-ui-11dtmbs">
      <div class="leafygreen-ui-1uro5pf">
        <svg
          width="24"
          height="24"
          role="img"
          viewBox="0 0 16 16"
          fill="#5D6C74"
          class="leafygreen-ui-1ucc7mh"
          data-dismiss="modal"
          aria-hidden="true"
          size="24"
        >
          <title>X Icon</title>
          <path
            d="M9.414 8l3.182 3.182-1.414 1.414L8 9.414l-3.182 3.182-1.414-1.414L6.586 8 3.404 4.818l1.414-1.414L8 6.586l3.182-3.182 1.414 1.414L9.414 8z"
            fill="#5D6C74"
            fill-rule="evenodd"
          ></path>
        </svg>
        Modal Content goes here.
      </div>
    </div>
  </div>
</div>
```

## Properties

### open

**Type:** `boolean`

**Default:** `false`

Determines open state of `Modal` component

### setOpen

**Type:** `function`

**Default:** `(bool) => {}`

Callback to set open state of Modal component. `setOpen` accepts a boolean value, which will determine the open state of `Modal` component.

### size

**Type:** `string`

**Default:** `default`

Determines `Modal` size. Options: `['small', 'default', 'large']`

### shouldClose

**Type:** `function`

**Default:** `() => true`

Callback to determine whether or not Modal should close when user tries to close it.

### children

**Type:** `node`

**Default:** `null`

Children that will be rendered inside `Modal` component.

### className

**Type:** `string`

**Default:** ``

Style to be applied to the overlay container's root node.

#### Any other properties will be spread on the overlay container's root node.
