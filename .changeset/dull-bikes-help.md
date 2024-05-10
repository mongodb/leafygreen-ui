---
'@leafygreen-ui/confirmation-modal': minor
---

- Adds new prop `confirmButtonProps`. This props is an object that accepts all `Button` props except for the `variant` prop. The variant is controlled by the `variant` prop.
- Adds new prop `cancelButtonProps`. This prop is an object that accepts all `Button` props. The `onClick` property will also fire when the `X` button, or backdrop is clicked.
- Prop `onConfirm` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `onClick` property.
  ```js
    confirmButtonProps: {{
      onClick: () => {}
    }}
  ```
- Prop `buttonText` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `children` property.
  ```js
      confirmButtonProps: {{
        children: 'hi'
      }}
    ```
- Prop `submitDisabled` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `disabled` property.
  ```js
      confirmButtonProps: {{
        disabled: true
      }}
    ```
- Prop `onCancel` is now marked as `deprecated`. Please transition to `cancelButtonProps` and pass the `onClick` property.
  ```js
      cancelButtonProps: {{
        onClick: () => {}
      }}
    ```