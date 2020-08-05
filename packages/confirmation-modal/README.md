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
        title="Confirm Title Here"
        primaryActionProps={{
          label: 'Confirm',
          onClick: () => setOpen(false),
        }}
        secondaryActionProps={{
          label: 'Cancel',
          onClick: () => setOpen(false),
        }}
        requireTextEntryConfirmation
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
  <div class="leafygreen-ui-19fzdo8">
    <div class="leafygreen-ui-1dhn1u9">Confirm Title Here</div>
    This is some description text, and it is extra long so it fills up this
    modal. Another thing about the modals here. This is some description text,
    and it is extra long so it fills up this modal. Another thing about the
    modals here.
    <div>
      <div class="leafygreen-ui-8r5n5">
        <label for="text-input-5667573" class="leafygreen-ui-1uh6n1l"
          >Type "confirm" to confirm your action</label
        >
        <div class="leafygreen-ui-lzja97">
          <input
            data-leafygreen-ui="input-selector"
            type="text"
            class="leafygreen-ui-om9pvn"
            required=""
            id="text-input-5667573"
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
  </div>
  <div class="leafygreen-ui-1hbabbe">
    <div class="leafygreen-ui-v227u3">
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
</div>
```

## Properties

| Prop                           | Type          | Description                                                                                                    | Default |
| ------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| `open`                         | `boolean`     | Determines open state of `Modal` component                                                                     | `false` |
| `title`                        | `string`      | Title text to display above the main content text.                                                             |         |
| `children`                     | `node`        | Children that will be rendered inside `<ConfirmationModal />` component.                                       |         |
| `primaryActionProps`           | `ActionProps` | Properties to pass to the primary action button. See below.                                                    |         |
| `secondaryActionProps`         | `ActionProps` | Properties to pass to the secondary action button. See below.                                                  |         |
| `requireTextEntryConfirmation` | `boolean`     | Whether to show a text prompt. The primary action button will be disabled until the text prompt is filled out. | `false` |
| `className`                    | `string`      | Style to be applied to the container's root node.                                                              |         |

## ActionProps

| Property  | Type                                                     | Description                   | Default     |
| --------- | -------------------------------------------------------- | ----------------------------- | ----------- |
| `label`   | `string`                                                 | Button text for the action.   |             |
| `onClick` | `function`                                               | Click handler for the button. | `() => {}`  |
| `variant` | `'default'`, `'primary'`, `'info'`, `'danger'`, `'dark'` | Style variant of the button.  | `'default'` |
