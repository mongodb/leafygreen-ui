# Form Footer

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/form-footer.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/form-footer/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/form-footer
```

### NPM

```shell
npm install @leafygreen-ui/form-footer
```

## Example

```js
<FormFooter
  primaryButton={{
    text: 'Save Draft',
    onClick: (e) => {...}
  }}
  errorMessage={'There is an error in this form'}
/>
```

**Output HTML**

```html
<footer>
  <div>
    <div role="alert">
      <svg aria-label="Warning Icon"></svg>
      <div>There is an error in this form</div>
    </div>
    <button type="button" aria-disabled="false">
      <div>Cancel</div>
    </button>
    <button aria-disabled="false">
      <div>Save Draft</div>
    </button>
  </div>
</footer>
```

## Properties

| Prop             | Type                                | Description                                                                                             | Default  |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| primaryButton    | `<Button>` or `PrimaryButtonProps`  | The primary (right-most) button. Defined as a `<Button>` element, or as an object with the shape below. |          |
| cancelButtonText | `string`                            | Text for the cancel button. A cancel button will only appear if this text is defined.                   | "Cancel" |
| onCancel         | `(event: React.MouseEvent) => void` | onClick callback for the cancel button.                                                                 |          |
| backButtonText   | `string`                            | Text for the back button. A back button will only appear if text is defined.                            |          |
| onBackClick      | `(event: React.MouseEvent) => void` | onClick callback for the back button                                                                    |          |
| errorMessage     | `string`                            | Text within the error banner. The banner will only appear if an error message is defined.               |          |
| contentClassName | `string`                            | Styling prop for the content. Useful for setting left and right margins, or max-width                   |          |
| className        | `string`                            | Styling prop                                                                                            |          |

# Primary Button

## Properties

| Prop     | Type                                | Description                                                                                    | Default     |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| text     | `string`                            | Text for the primary button. Required if the prop is defined as an object                      |             |
| onClick  | `(event: React.MouseEvent) => void` | onClick callback for the primary button                                                        |             |
| variant  | `'primary'` or `'danger'`           | Visual variant of the primary button. Define the button as JSX to further customize the button | `"primary"` |
| disabled | `boolean`                           | Whether the button is disabled                                                                 | `false`     |
| type     | `'button'` or `'submit'`            | HTML type of the button                                                                        |             |
