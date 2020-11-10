# Text Area

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/text-area.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/text-area--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/text-area
```

### NPM

```shell
npm install @leafygreen-ui/text-area
```

## Example

```js
import TextArea from '@leafygreen-ui/text-area';

const [value, setValue] = useState('');

return (
  <TextArea
    label="Text Area Label"
    description="This is the description for the text area"
    onChange={event => {
      /* Something to handle the change event */
    }}
    value={value}
  />
);
```

**Output HTML**

```html
<div class="leafygreen-ui-1iyoj2o">
  <label for="textarea-4" class="leafygreen-ui-1x9zy2h">Text Area Label</label>
  <p class="leafygreen-ui-1e6871j">This is the description for the text area</p>
  <div class="leafygreen-ui-lzja97">
    <textarea
      data-leafygreen-ui="area-selector"
      title="Text Area Label"
      id="textarea-4"
      class="leafygreen-ui-10h8b92"
    ></textarea>
    <div class="leafygreen-ui-19os2r6"></div>
  </div>
</div>
```

## Properties

| Prop          | Type                               | Description                                                       | Default  |
| ------------- | ---------------------------------- | ----------------------------------------------------------------- | -------- |
| `id`          | `string`                           | id to describe the `<textarea>` element                           |          |
| `darkMode`    | `boolean`                          | Determines whether or not the component will appear in dark mode. | `false`  |
| `optional`    | `boolean`                          | Determines whether or not the `<textarea>` is optional            | `true`   |
| `label`       | `string`                           | Label for `<textarea>`                                            |          |
| `description` | `string`                           | Description below label                                           |          |
| `state`       | `'none'` \| `'valid'` \| `'error'` | Determines the state of the `<textarea>`                          | `'none'` |
| `className`   | `string`                           | className applied to the `<textarea>` element                     |          |
| `disabled`    | `boolean`                          | Determines if the component is disabled                           | `false`  |
