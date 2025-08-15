# Form Footer

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/form-footer.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/form-footer/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/form-footer
```

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
  primaryButtonProps={{
    children: 'Save Draft',
    onClick: (e) => {...}
  }}
  errorMessage="There is an error in this form"
/>
```

## Properties

| Prop               | Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default |
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| backButtonProps    | `ButtonProps` | The back button, the left-most button, will only appear if backButtonProps is defined. An object that accepts one of the following: <br>_ [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `'default'` and `'dangerOutline'` <br>_ [SplitButton props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/split-button/README.md#properties) but `variant` is limited to `'default'` and `'danger'`                 |
| cancelButtonProps  | `ButtonProps` | The cancel button, to the left of the primary button, will only appear if cancelButtonProps is defined. An object that accepts one of the following: <br>_ [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) except for the `variant` prop. The variant is `'default'` <br>_ [SplitButton props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/split-button/README.md#properties) except for the `variant` prop. The variant is `'default'` |         |
| className          | `string`      | Styling prop                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |         |
| contentClassName   | `string`      | Styling prop for the content. Useful for setting left and right margins, or max-width                                                                                                                                                                                                                                                                                                                                                                                                                           |         |
| errorMessage       | `string`      | Text within the error banner. The banner will only appear if an error message is defined.                                                                                                                                                                                                                                                                                                                                                                                                                       |         |
| primaryButtonProps | `ButtonProps` | The primary (right-most) button. An object that accepts one of the following: <br>_ [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `'primary'` and `'danger'` <br>_ [SplitButton props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/split-button/README.md#properties) but `variant` is limited to `'primary'` and `'danger'`                                                                              |         |
