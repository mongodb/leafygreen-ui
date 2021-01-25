# v5 to #v6

This major version includes a complete redesign of visuals and the component API.

Changes that require action:

- `SideNav`
  - The styles used to position the side nav have changed significantly and will likely require updating your page's CSS styles to incorporate it. Please see the Storybook example as a reference. If you only need to support newer browsers, using CSS Grid may make this significantly easier.
- `SideNavItem`
  - The `active` prop has been removed. Instead, pass a unique `path` prop to each `SideNavItem` and provide the `path` of the active item as the `currentPath` prop to `SideNav`. This should reduce friction in using the component with web app routing solutions such as react-router.
  - The `ariaCurrentValue` prop has been removed. The `aria-current` attribute will automatically be set to `"page"` when the item is active and `"false"` otherwise. If the default behavior needs to be overridden, the `aria-current` prop can be set directly.
- `SideNavGroup`
  - The `header` prop is now named `label`.
