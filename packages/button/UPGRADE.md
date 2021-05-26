# v10 to v11

This major version brings many changes to both the component's API and its design. Below are the main changes that you may need to account for:

Breaking Changes to the API:

- Variant names have changed. We now support: `'default'`, `'primary'`, `'primaryOutline'`, `'danger'`, `'dangerOutline'`. The old variant, `'info'` has been renamed to `'primaryOutline'`, and the `'dark'` variant has been replaced by the addition of the `darkMode` prop. To get what was previously our `'dark'` button, set the `variant` to `'default'` and `darkMode` to `true`.
- We have renamed the `normal` size to `default`. This is to be more consistent with our naming conventions across the library.
- The `glyph` prop has been replaced by the `leftGlyph` prop, and we have added a `rightGlyph` prop. While positioning a glyph relative on either side of text was possible before, we're adding more specific styles to icons passed into the component, so we encourage you to use these new props.

Minor Changes to the API:

- We now explicitly suppport icon-only buttons (different from our IconButton components). If you pass a glyph to either the `leftGlyph` or `rightGlyph` prop and do not pass any other children to the component, we will style the button accordingly.
- We now support a `darkMode` prop. Each of the variants mentioned above comes in both light an dark modes.

Breaking Changes to the Design:

- Size:
  - XSmall buttons will grow in width. This is because the font-size has changed from `11px` to `12px`, and letter-spacing has been added where there previously was none.
  - Small buttons were 25px, they are now 28px in height.
  - Default buttons were 32px, they are now 36px in height.
