# v10 to v11

This major version brings many changes to both the component's API and it's design. Below are the main changes that you may need to account for:

Breaking Changes to the API:

- Variant names have changed. We now support: `'default'`, `'primary'`, `'primaryOutline'`, `'danger'`, `'dangerOutline'`. The old variant, `'info'` has been renamed to `'primaryOutline'`, and the `'dark'` variant has been replaced by the addition of the `darkMode` prop.
- We have renamed the `normal` size to `default`. This is to be more consistent with our naming conventions across the library.
- The `glyph` prop has been replaced by two new props: `leftGlyph` and `rightGlyph`. While positioning a glyph relative on either side of text was possible before, we're adding more bespoke styles to icons passed into the component, so we encourage you to use these new props.

Minor Changes to the API:

- We now explicitly suppport icon-only buttons (different from our IconButton components). If you pass a glyph to either the `leftGlyph` or `rightGlyph` prop and do not pass any other children to the component, we will style the button accordingly.
- We now support a `darkMode` prop. Each of the variants mentioned above comes in both light an dark modes.

Breaking Changes to the Design:

The Button has been completely redesigned to be both more modern and more accessible. That being said, there are a few changes to the design in particular that are worth noting as they may have implications in your page layouts:

- Size:
  - Small buttons were 25px, they are now 28px.
  - Default buttons were 32px, they are now 36px.
