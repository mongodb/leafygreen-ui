# Toast

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toast.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/toast/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/toast
```

### NPM

```shell
npm install @leafygreen-ui/toast
```

## Example

```js
import Toast from '@leafygreen-ui/toast';

const [toastOpen, setToastOpen] = useState(true);

return (
  <Toast
    variant="success"
    title="This is a title"
    body="This is a description"
    open={toastOpen}
    close={() => setToastOpen(false)}
  />
);
```

**Output HTML**

```html
<div role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
  <div class="leafygreen-ui-r1u4g0">
    <div class="leafygreen-ui-1lymiei">
      <svg
        class="leafygreen-ui-1b4llpu"
        height="30"
        width="30"
        aria-hidden="true"
        viewBox="0 0 16 16"
        role="img"
      >
        <title>Checkmark With Circle Icon</title>
        <g
          id="Glyphs-/-Checkmark-With-Circle"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path d="..." fill="currentColor"></path>
        </g>
      </svg>

      <div>
        <p class="leafygreen-ui-d2tjkm">This is a title</p>
        <p class="leafygreen-ui-10eu8wb">This is a description</p>
      </div>
    </div>

    <button
      tabindex="0"
      aria-disabled="false"
      aria-label="Close Message"
      class="leafygreen-ui-ptvv4q"
    >
      <div class="leafygreen-ui-xhlipt">
        <svg class="" height="16" width="16" viewBox="0 0 16 16" role="img">
          <g
            id="X-Copy"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="..."
              fill="currentColor"
              transform="translate(8.000000, 8.000000) rotate(45.000000) translate(-8.000000, -8.000000) "
            ></path>
          </g>
        </svg>
      </div>
    </button>
  </div>
</div>
```

## Properties

| Prop                 | Type                                                            | Description                                                                                                                                                       | Default |
| -------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `title`              | `ReactNode`                                                     | Optional text shown in bold above the body text.                                                                                                                  |         |
| `body` (Required)    | `ReactNode`                                                     | Main text for the Toast.                                                                                                                                          |         |
| `className`          | `string`                                                        | Optional className passed to the wrapping `<div />` for the toast.                                                                                                |         |
| `variant` (Required) | `'success'`, `'note'`, `'warning'`, `'important'`, `'progress'` | Style variant to render the Toast as.                                                                                                                             |         |
| `progress`           | `number` (0...1)                                                | Optional number between 0 and 1 that sets the progress bar's progress. Note that the progress bar is only rendered when the Toast variant is set to `'progress'`. | `1`     |
| `open`               | `boolean`                                                       | Optional boolean that renders the Toast and makes it visible when true.                                                                                           | `false` |
| `close`              | `function` (MouseEventHandler)                                  | Optional click event handler that, when set, renders a close button that receives the passed handler.                                                             |         |
| `darkMode`           | `boolean`                                                       | Determines if the component renders in dark theme                                                                                                                 | `false` |
