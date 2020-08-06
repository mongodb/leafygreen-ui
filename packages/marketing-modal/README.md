# Marketing Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/marketing-modal--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/marketing-modal
```

### NPM

```shell
npm install @leafygreen-ui/marketing-modal
```

## Example

```js
function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <MarketingModal
        open={open}
        setOpen={setOpen}
        title="Introducing New Feature!"
        cover={
          <img alt="" src="examples/DataLake.png" width={275} height={220} />
        }
        coverStyle="default"
        primaryActionProps={{
          label: 'Okay',
          onClick: () => setOpen(false),
        }}
        secondaryActionProps={{
          label: 'Cancel',
          onClick: () => setOpen(false),
        }}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here.
      </MarketingModal>
    </>
  );
}
```

**Output HTML**

```html
<button>Open Modal</button>
<div aria-modal="true" role="dialog" tabindex="-1" class="leafygreen-ui-4ltwxx">
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
  <div class="leafygreen-ui-ex1gyf">
    <img alt="" src="examples/DataLake.png" width="275" height="220" />
  </div>
  <div class="leafygreen-ui-8fcqkd">
    <div class="leafygreen-ui-1dhn1u9">Introducing New Feature!</div>
    This is some description text, and it is extra long so it fills up this
    modal. Another thing about the modals here.
  </div>
  <div class="leafygreen-ui-1xfya45">
    <button type="button" class="leafygreen-ui-1p9g0i2" aria-disabled="false">
      <span class="leafygreen-ui-1cpk24m">Okay</span></button
    ><span
      target="_blank"
      class="leafygreen-ui-1ouyicz"
      data-leafygreen-ui="anchor-container"
      tabindex="0"
      ><span class="leafygreen-ui-13nqixy">Cancel</span></span
    >
  </div>
</div>
```

## Properties

| Prop                   | Type                           | Description                                                                                                                                 | Default     |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `open`                 | `boolean`                      | Determines open state of `Modal` component                                                                                                  | `false`     |
| `setOpen`              | `function`                     | Callback to set open state of Modal component. `setOpen` accepts a boolean value, which will determine the open state of `Modal` component. | `() => {}`  |
| `title`                | `string`                       | Title text to display above the main content text.                                                                                          |             |
| `cover`                | `JSX.IntrinsicElements['img']` | Image element to be used as the cover image of the modal.                                                                                   |             |
| `coverStyle`           | `'default'`, `'cover'`         | Determines how the `cover` image should be displayed in the modal.                                                                          | `'default'` |
| `children`             | `node`                         | Children that will be rendered inside `<ConfirmationModal />` component.                                                                    |             |
| `primaryActionProps`   | `ActionProps`                  | Properties to pass to the primary action button. See below.                                                                                 |             |
| `secondaryActionProps` | `ActionProps`                  | Properties to pass to the secondary action button. See below.                                                                               |             |
| `className`            | `string`                       | Style to be applied to the container's root node.                                                                                           |             |

## ActionProps

| Property  | Type       | Description                   | Default    |
| --------- | ---------- | ----------------------------- | ---------- |
| `label`   | `string`   | Button text for the action.   |            |
| `onClick` | `function` | Click handler for the button. | `() => {}` |
