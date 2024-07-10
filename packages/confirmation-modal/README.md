# Confirmation Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/confirmation-modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/confirmation-modal/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/confirmation-modal
```

### NPM

```shell
npm install @leafygreen-ui/confirmation-modal
```

## Example

```js
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';

function ExampleComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        confirmButtonProps={{
          children: 'confirm',
          onClick: () => setOpen(false),
          disabled: true,
        }}
        cancelButtonProps={{
          onClick: () => setOpen(false),
          variant: 'default',
        }}
        title="Confirm Title Here"
        requiredInputText="confirm"
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}
```

## Properties

| Prop                         | Type                    | Description                                                                                                                                                                                                                                                                                                                                       | Default     |
| ---------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| confirmButtonProps           | `ButtonProps`           | The confirm button on the right. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) except `variant`. The variant of the confirm button is controlled by the `variant` prop. The text is `confirm` by default but can by overridden with the `children` property. |             |
| cancelButtonProps            | `ButtonProps`           | The cancel button on the left. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties). The `onClick` property will also fire when the `X` button, or backdrop is clicked.                                                                                             |             |
| open                         | `boolean`               | Determines open state of `Modal` component                                                                                                                                                                                                                                                                                                        | `false`     |
| title                        | `string`                | Title text to display above the main content text.                                                                                                                                                                                                                                                                                                |             |
| children                     | `node`                  | Children that will be rendered inside `<ConfirmationModal />` component.                                                                                                                                                                                                                                                                          |             |
| variant                      | `'default'`, `'danger'` | Sets the style variant.                                                                                                                                                                                                                                                                                                                           | `'default'` |
| requiredInputText            | `string`                | If provided, a text prompt will be displayed and the confirmation button will be disabled until the text prompt is filled out with the required text.                                                                                                                                                                                             |             |
| className                    | `string`                | Style to be applied to the container's root node.                                                                                                                                                                                                                                                                                                 |             |
| darkMode                     | `boolean`               | Determines if the component will appear in dark mode.                                                                                                                                                                                                                                                                                             | `false`     |
| onConfirm(`Deprecated`)      | `function`              | Callback that fires when the action is confirmed. This can be used to set the modal to be closed. `@deprecated` - use `confirmButtonProps` and pass the `onClick` property                                                                                                                                                                        | `() => {}`  |
| buttonText(`Deprecated`)     | `string`                | Text content of the confirmation button. `@deprecated` - use `confirmButtonProps` and pass the `children` property.                                                                                                                                                                                                                               |             |
| submitDisabled(`Deprecated`) | `boolean`               | Determines if the submit button should appear as disabled `@deprecated` - use `confirmButtonProps` and pass the `disabled` property                                                                                                                                                                                                               | `false`     |
| onCancel(`Deprecated`)       | `function`              | Callback that fires when the cancel button, x button, or backdrop is clicked. This can be used to set the modal to be closed. `@deprecated` - use `cancelButtonProps` and pass the `onClick` property                                                                                                                                             | `() => {}`  |
