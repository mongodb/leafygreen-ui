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
  primaryButtonProps={{
    children: 'Save Draft',
    onClick: (e) => {...}
  }}
  errorMessage={'There is an error in this form'}
/>
```

## Properties

| Prop                        | Type                               | Description                                                                                                                                                                                                                                                                          | Default |
| --------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| primaryButton(`Deprecated`) | `<Button>` or `PrimaryButtonProps` | The primary (right-most) button. Defined as a `<Button>` element, or as an object with the shape below. `darkMode` is handled internally so you do not have to pass the `darkMode` prop. `@deprecated` - use `primaryButtonProps`                                                    |         |
| primaryButtonProps          | `ButtonProps`                      | The primary (right-most) button. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `primary` and `danger`.                                                              |         |
| backButtonProps             | `ButtonProps`                      | The back button, the left-most button, will only appear if backButtonProps is defined. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) but `variant` is limited to `default` and `dangerOutline`. |
| cancelButtonProps           | `ButtonProps`                      | The back button, the left-most button, will only appear if cancelButtonProps is defined. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) except for the `variant` prop. The variant is `default`. |         |
| errorMessage                | `string`                           | Text within the error banner. The banner will only appear if an error message is defined.                                                                                                                                                                                            |         |
| contentClassName            | `string`                           | Styling prop for the content. Useful for setting left and right margins, or max-width                                                                                                                                                                                                |         |
| className                   | `string`                           | Styling prop                                                                                                                                                                                                                                                                         |         |

# Primary Button (`Deprecated`)

## Properties

| Prop     | Type                                | Description                                                                                    | Default     |
| -------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- | ----------- |
| text     | `string`                            | Text for the primary button. Required if the prop is defined as an object                      |             |
| onClick  | `(event: React.MouseEvent) => void` | onClick callback for the primary button                                                        |             |
| variant  | `'primary'` or `'danger'`           | Visual variant of the primary button. Define the button as JSX to further customize the button | `"primary"` |
| disabled | `boolean`                           | Whether the button is disabled                                                                 | `false`     |
| type     | `'button'` or `'submit'`            | HTML type of the button                                                                        |
