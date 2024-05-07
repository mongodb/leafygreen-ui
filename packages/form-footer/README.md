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

| Prop               | Type          | Description                                                                                                                                                                                                                                                                          | Default |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| primaryButtonProps | `ButtonProps` | The primary (right-most) button. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `primary` and `danger`.                                                              |         |
| backButtonProps    | `ButtonProps` | The back button, the left-most button, will only appear if backButtonProps is defined. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `default` and `dangerOutline`. |
| cancelButtonProps  | `ButtonProps` | The back button, the left-most button, will only appear if cancelButtonProps is defined. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) except for the `variant` prop. The variant is `default`. |         |
| errorMessage       | `string`      | Text within the error banner. The banner will only appear if an error message is defined.                                                                                                                                                                                            |         |
| contentClassName   | `string`      | Styling prop for the content. Useful for setting left and right margins, or max-width                                                                                                                                                                                                |         |
| className          | `string`      | Styling prop                                                                                                                                                                                                                                                                         |         |
