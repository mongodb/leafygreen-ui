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
import Button from '@leafygreen-ui/button';
import { ToastProvider, useToast, Variant } from '@leafygreen-ui/toast';

const { pushToast, clearStack, getStack, updateToast } = useToast();
const stack = getStack();

const createToast = () => {
  pushToast({
    title: 'Toast Title',
    description: 'Toast Description',
    variant: Variant.Success,
    timeout: null,
  });
};

return (
  <ToastProvider>
    <Button onClick={handleClick}>Create toast</Button>
  </ToastProvider>
);
```

## Properties, useToast

useToast is a React hook that enables a consumer to interact with a Toast stack. It may only be used inside of a `<ToastProvider />`. The hook takes no arguments and returns the following functions:

| Name        | Signature                                                                |
| ----------- | ------------------------------------------------------------------------ |
| pushToast   | `(payload: ToastProps) => ToastId`                                       |
| popToast    | `(payload: ToastId) => ToastProps \| undefined`                          |
| updateToast | `(id: ToastId, props: Partial<ToastProps>, ) => ToastProps \| undefined` |
| getToast    | `(id: ToastId) => ToastProps \| undefined`                               |
| getStack    | `() => ToastStack \|undefined`                                           |
| clearStack  | `() => void`                                                             |

## Properties, ToastProvider

| Prop            | Type                      | Default | Description                                           |
| --------------- | ------------------------- | ------- | ----------------------------------------------------- |
| initialValue    | Map<ToastId, ToastProps>; |         | The initial toasts in the stack.                      |
| portalClassName | `string`                  |         | Class name applied to the containing Portal component |

## Properties, Controlled Toast

| Prop             | Type                                                | Default | Description                                                                                                                                                                                                                                                                                       |
| ---------------- | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| actionElement    | `React.ReactNode `                                  |         | Optional action button, or other element. Only rendered if `variant === 'progress'`. This should be a shortcut only—and not the _only_ way to perform the action. The provided action element should have an `aria-description` attribute that describes how to alternatively perform the action. |
| darkMode         | `boolean`                                           | `false` | Renders the component with dark mode styles.                                                                                                                                                                                                                                                      |
| description      | `React.ReactNode `                                  |         | Additional body text                                                                                                                                                                                                                                                                              |
| dismissible      | `boolean`                                           | `true`  | Determines whether to render the close button. If `timeout === null`, then `dismissible` is forced to `true`.                                                                                                                                                                                     |
| onClose          | `(event: ToastCloseEvent) => void`                  |         | Fired either when the close button is clicked, or when timeout has elapsed. When triggered by button click, `event.type === "click"`. When triggered by timeout, `event.type === "timeout"`.                                                                                                      |
| open _required_  | `boolean`                                           |         | Required boolean that renders the Toast and makes it visible when true. Note: open is not a valid prop when rendering toasts programmatically                                                                                                                                                     |
| progress         | `number`                                            |         | Optional number between 0 and 1 that sets the progress bar's progress. Note: the progress bar is only rendered when the Toast variant is set to `'progress'`.                                                                                                                                     |
| timeout          | `number \| null `                                   | `6,000` | Dismiss the Toast after `timeout` milliseconds. If timeout is `null` or `0`, the Toast will never dismiss automatically. Note: Timeout timer will be paused when a user is interacting with a Toast.                                                                                              |
| title _required_ | `React.ReactNode`                                   |         | Primary text for the toast                                                                                                                                                                                                                                                                        |
| variant          | `'success' 'note' 'warning' 'progress' 'important'` | `note`  | Required style variant to render the Toast as. Progress variants will ignore the `timeout` prop.                                                                                                                                                                                                  |
