---
'@leafygreen-ui/popover': minor
---

Popover sizes are now restricted to the available space in the viewport, based on the computed position, align & justify.

Adds `maxHeight` & `maxWidth` props to further restrict the popover size.
If the provided value is _greater than_ the available space above/below (for height), or left/right (for width) of the reference element,
the size will be restricted to the available space (i.e. the popover will not overflow the viewport).

Note: Any `max-height` value applied with additional CSS will take precedence, and will override the "available space" calculation

Exports `popoverCSSProperties` constant for use in components that extend popover
