---
'@leafygreen-ui/form-footer': major
---

- Updates `data-testid` on `<footer>` from `lg-form_footer-footer` to `lg-form_footer`.
- Adds `primaryButtonProps`. This prop is an object that accepts all `Button` props but `variant` is limited to `primary` and `danger`.
- Prop `primaryButton` is marked as `deprecated`. Please transition to `primaryButtonProps`.
- Removes `cancelButtonText`. Use `cancelButtonProps` and pass the `children` property.
  ```js
      cancelButtonProps: {{
        children: 'hi'
      }}
    ```
- Removes `onCancel`. Use `cancelButtonProps` and pass the `onClick` property.
  ```js
      cancelButtonProps: {{
        onClick: () => {}
      }}
    ```
- Removes `backButtonText`. Use `backButtonProps` and pass the `children` property.
  ```js
      backButtonProps: {{
        children: 'hi'
      }}
    ```
- Removes `onBackClick`. Use `backButtonProps` and pass the `onClick` property.
  ```js
      backButtonProps: {{
        onClick: () => {}
      }}
    ```

