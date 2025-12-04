---
'@leafygreen-ui/loading-indicator': minor
---

Adds `description` and `direction` props to the `Spinner` component to support text rendering alongside the spinner.

- `description`: Optional text to display alongside the spinner
- `direction`: Controls the layout of the spinner and description (`vertical` or `horizontal`)
- `baseFontSize`: Controls the font size of the description text
- `svgProps`: Pass-through props for the SVG element

The Spinner component now always wraps in a `<div>` element. The `className` and other props are passed to the wrapper `div`.

