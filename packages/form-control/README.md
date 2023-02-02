# Form Control

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/form-control.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/form-control
```

### NPM

```shell
npm install @leafygreen-ui/form-control
```

## Example

```js
import { useAccessibleFormField } from '@leafygreen-ui/form-control';

const TextInput = () => {
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
    useAccessibleFormField(label, isDescriptionShown, isErrorMessageShown, id);

  return (
    <>
      <label {...labelProps}>{label}</label>
      <div {...descriptionProps}>{description}</div>
      <input {...fieldProps} />
      {validationState === 'error' && (
        <div {...errorMessageProps}>{errorMessage}</div>
      )}
    </>
  );
};
```

**Output HTML**

## Properties

| Prop                  | Type     | Description                                                 | Default |
| --------------------- | -------- | ----------------------------------------------------------- | ------- |
| `label`               | `string` | Label for the input                                         |         |
| `aria-label`          | `string` | Aria label for the input                                    |         |
| `aria-labelledby`     | `string` | `id` that associates label to field                         |         |
| `id`                  | `string` | Assigns `id` to field                                       |         |
| `isDescriptionShown`  | boolean  | Lets hook know that there is a description for the input    |         |
| `isErrorMessageShown` | boolean  | Lets hook know that there is an error message for the input |         |
