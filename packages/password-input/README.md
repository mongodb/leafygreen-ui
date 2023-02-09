# Password Input

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/password-input.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/password-input/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/password-input
```

### NPM

```shell
npm install @leafygreen-ui/password-input
```

## Example

```js
import { PasswordInput } from '@leafygreen-ui/password-input';

// Multiple notifications
<PasswordInput
  label="New password"
  stateNotifications={[
    {
      notification: "i'm an error",
      state: 'error',
    },
    {
      notification: "i'm a warning",
      state: 'warning',
    },
    {
      notification: "i'm valid",
      state: 'valid',
    },
    {
      notification: "i'm waiting",
      state: 'none',
    },
  ]}
  autoComplete="new-password"
  id="new-password"
  onChange={() => console.log('onChange callback')}
/>;
```

```js
// Single notification
<PasswordInput
  label="Confirm Password"
  stateNotifications={[
    {
      notification: "i'm an error",
      state: 'error',
    },
  ]}
  autoComplete="new-password"
  id="new-password"
/>
```

```js
// Custom notification container
<PasswordInput
  label="Password"
  stateNotifications="error"
  aria-describedby="container-id"
  autoComplete="current-password"
  id="current-password"
/>
```

## Properties

| Prop                 | Type                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `id`                 | `string`                                                                                                                                                    | id associated with the password input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                |
| `label`              | `string`                                                                                                                                                    | Text shown above the password input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                |
| `aria`               | `string`                                                                                                                                                    | Text shown above the password input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                |
| `value`              | `string`                                                                                                                                                    | The controlled value of the password input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                |
| `disabled`           | `boolean`                                                                                                                                                   | Disables the password input but still allows you to toggle password visibility.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `false`        |
| `onChange`           | `function`                                                                                                                                                  | The event handler function for the 'onchange' event. Accepts the change event object as its argument and returns nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `onBlur`             | `function`                                                                                                                                                  | The event handler function for the 'onblur' event. Accepts the focus event object as its argument and returns nothing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |                |
| `placeholder`        | `string`                                                                                                                                                    | The placeholder text shown in the input field before the user begins typing.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                |
| `autoComplete`       | `string`                                                                                                                                                    | Specifies what permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field. More info can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `new-password` |
| `size`               | `'small'` \| `'default'` \| `'large'`                                                                                                                       | Determines the size of the input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `default`      |
| `stateNotifications` | `Array<{notification: string; state: 'error' \| 'warning' \| 'valid' \| 'none'}>` </br></br> or </br></br>`'error'` \| `'warning'` \| `'valid'` \| `'none'` | Determines what notifications will appear below the password input. <br /> <br />The array determines the overall input state. If at least one object has `'error'` \| `'warning'` as the `state` value, the input will display a red outline. If all objects have `valid` as the `state` value, then the input will display a green outline. If none of the conditions above are met, then the input will display a default state. </br></br>To use a custom error notification container rather than the default provided in this component, `stateNotifications` will only require a string with the appropriate `state` value. In addition, the `aria-describedby` attribute must be provided with the id of the custom notification container. You can read more about `aria-describedby` [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby). | `[]`           |
| `className`          | `string`                                                                                                                                                    | The className passed to the root element of the component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                |
| ...                  | native `input` attributes                                                                                                                                   | Any other props will be spread on the root `input` element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                |

## States

```js
const State = {
  Error: 'error', // red x icon, red text
  Warning: 'warning', // red warning icon, red text
  Valid: 'valid', // green checkmark, black text
  None: 'none', // gray checkmark, gray text
} as const;

```

## Special Case

### Aria Labels

Either `label` or `aria-labelledby` or `aria-label` must be provided a string, or there will be a console error. This is to ensure that screenreaders have a description for what the PAssword Input does.

### Aria Describedby

To use a custom error notification container rather than the default provided in this component, `stateNotifications` will only require a string with the appropriate `state` value. In addition, the `aria-describedby` attribute must be provided with the id of the custom notification container. You can read more about `aria-describedby` [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby).
