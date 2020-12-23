---
'@leafygreen-ui/toggle': major
'@leafygreen-ui/lib': minor
---

Refactors the Toggle component to resolve bugs, improve maintainability, and improve accessibility for sighted and non-sighted users.

- Refactors the internal DOM structure of the component to be as accessible as possible, and uses the appropriate role.
- Restructures how the styles are structured in the component to improve maintainability.
- Slightly increases contrast of the "ON" and "OFF" labels in the default size to meet WCAG AA contrast guidelines.
- Hides the "ON" and "OFF" labels for screen readers so that only the current state of the Toggle is read.
- Enforces use of `aria-label` and `aria-labelledby` so that Toggles always have screen reader accessible text associated with them.
- Fixes a bug with the rendering of the focus state on Windows machines.
- Uses the LeafyGreen Provider to conditionally show the focus state based on how the user is interacting with the page.

Please read our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/toggle/UPGRADE.md) for more information on these changes.

