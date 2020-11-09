# Confirmation Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/confirmation-modal.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/confirmation-modal--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/confirmation-modal
```

### NPM

```shell
npm install @leafygreen-ui/confirmation-modal
```

## Example

```js
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        onConfirm={() => setOpen(false)}
        onClose={() => setOpen(false)}
        title="Confirm Title Here"
        buttonText="Confirm"
        requiredInputText="confirm"
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}
```

**Output HTML**

```html
<button>Open Modal</button>
<div aria-modal="true" role="dialog" tabindex="-1" class="leafygreen-ui-iiijf">
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
    </div>
  </button>
  <div class="leafygreen-ui-19fzdo8">
    <div class="leafygreen-ui-1dhn1u9">Confirm Title Here</div>
    This is some description text, and it is extra long so it fills up this
    modal. Another thing about the modals here. This is some description text,
    and it is extra long so it fills up this modal. Another thing about the
    modals here.
    <div class="leafygreen-ui-1dzzoy1">
      <label for="text-input-23" class="leafygreen-ui-1uh6n1l"
        >Type "confirm" to confirm your action</label
      >
      <div class="leafygreen-ui-lzja97">
        <input
          data-leafygreen-ui="input-selector"
          type="text"
          class="leafygreen-ui-om9pvn"
          required=""
          id="text-input-23"
          value=""
        />
        <div
          data-leafygreen-ui="icon-selector"
          class="leafygreen-ui-m329s1"
        ></div>
        <div class="leafygreen-ui-1andb55"></div>
      </div>
    </div>
  </div>
  <div class="leafygreen-ui-1ewqwyu undefined">
    <button
      type="button"
      class="leafygreen-ui-1fv4ilm"
      aria-disabled="true"
      disabled=""
    >
      <span class="leafygreen-ui-1cpk24m">Confirm</span></button
    ><button type="button" class="leafygreen-ui-moke9e" aria-disabled="false">
      <span class="leafygreen-ui-1cpk24m">Cancel</span>
    </button>
  </div>
</div>
```

## Properties

| Prop                | Type                      | Description                                                                                                                                           | Default     |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `open`              | `boolean`                 | Determines open state of `Modal` component                                                                                                            | `false`     |
| `onConfirm`         | `function`                | Callback that fires when the action is confirmed. This can be used to set the modal to be closed.                                                     | `() => {}`  |
| `onCancel`          | `function`                | Callback that fires when the cancel button, x button, or backdrop is clicked. This can be used to set the modal to be closed.                         | `() => {}`  |
| `title`             | `string`                  | Title text to display above the main content text.                                                                                                    |             |
| `children`          | `node`                    | Children that will be rendered inside `<ConfirmationModal />` component.                                                                              |             |
| `buttonText`        | `string`                  | Text content of the confirmation button.                                                                                                              |             |
| `variant`           | `'default'` \| `'danger'` | Sets the style variant.                                                                                                                               | `'default'` |
| `requiredInputText` | `string`                  | If provided, a text prompt will be displayed and the confirmation button will be disabled until the text prompt is filled out with the required text. |             |
| `className`         | `string`                  | Style to be applied to the container's root node.                                                                                                     |             |
