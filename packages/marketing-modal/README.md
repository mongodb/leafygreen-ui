# Marketing Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/marketing-modal/example/)

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
        onButtonClick={() => setOpen(false)}
        onLinkClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        title="Introducing New Feature!"
        graphic={
          <img alt="" src="examples/DataLake.png" width={275} height={220} />
        }
        graphicStyle={ImageStyle.Center}
        buttonText="Okay"
        linkText="Cancel"
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

| Prop             | Type                                          | Description                                                                                                                               | Default    |
| ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | -------- | -------------------------------------------------- | --- |
| `open`           | `boolean`                                     | Determines open state of `Modal` component                                                                                                | `false`    |
| `onButtonClick`  | `function`                                    | Callback that fires when the primary button is clicked. This can be used to set the modal to be closed.                                   | `() => {}` |
| `onLinkClick`    | `function`                                    | Callback that fires when the secondary link is clicked. This can be used to set the modal to be closed.                                   | `() => {}` |
| `onClose`        | `function`                                    | Callback that fires when the cancel button, x button, or backdrop is clicked. This can be used to set the modal to be closed.             | `() => {}` | `title` | `string` | Title text to display above the main content text. |     |
| `graphic`        | `React.ReactElement`                          | Element to be used as the main graphic of the modal.                                                                                      |            |
| `graphicStyle`   | `'center'`, `'fill'`                          | Determines how the main graphic should be displayed in the modal.                                                                         | `'center'` |
| `children`       | `node`                                        | Children that will be rendered inside `<ConfirmationModal />` component.                                                                  |            |
| `buttonText`     | `string`                                      | Text content of the confirmation button.                                                                                                  |            |
| `linkText`       | `string`                                      | Text content of the alternate action link.                                                                                                |            |
| `className`      | `string`                                      | Style to be applied to the container's root node.                                                                                         |            |
| `darkMode`       | `boolean`                                     | Determines if the component will appear in dark mode.                                                                                     | `false`    |
| `closeIconColor` | `'default'`, `'dark'`, `'light'`              | Determines the color of the close icon.                                                                                                   |
| `showBlob`       | `boolean`                                     | Determines if the blob illustration should appear in the background of the modal. Currently will only work if `darkMode` is set to false. | `false`    |
| `blobPosition`   | `'top left'`, `'top right'`, `'bottom right'` | Determines the position of the blob if `showBlob` is set to `true`.                                                                       | `top left` |
| `disclaimer`     | `React.ReactElement`                          | Disclaimer text to be rendered under the primary action button.                                                                           |            |
