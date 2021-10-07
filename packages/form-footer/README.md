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
  sticky={true}
  primaryButton={{
    text: 'Save Draft',
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

| Prop             | Type                               | Description                                                                                                       | Default  |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| sticky           | `boolean`                          | Defines whether the footer should be "stuck" to the bottom of the frame. Can also be customized using `className` | `false`  |
| primaryButton    | `<Button>` or `PrimaryButtonProps` | The primary (right-most) button. Defined as a `<Button>` element, or as an object with the shape below.           |          |
| cancelText       | `string`                           | Text for the cancel button. Defaults to 'Cancel'                                                                  | "Cancel" |
| onCancel         | `(event) => void`                  | onClick callback for the cancel button                                                                            |          |
| backButtonText   | `string`                           | Text for the back button.                                                                                         |          |
| onBackClick      | `(event) => void`                  | onClick callback for the back button                                                                              |          |
| errorMessage     | `string`                           | Text within the error banner                                                                                      |          |
| contentClassName | `string`                           | Styling prop for the content. Useful for setting left and right margins, or max-width                             |          |
| className        | `string`                           | Styling prop                                                                                                      |          |
