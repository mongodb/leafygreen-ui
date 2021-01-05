---
'@leafygreen-ui/code': major
---

Fixes various bugs, makes accessibility improvements, tweaks the design, and improves maintainability of the `Code` component.

Design changes:
- Updates the syntax highlighting theme to improve contrast between comments and regular code, as well as making several optimizations for red-green colorblindness.
- Tightens the top and bottom padding for the code component, especially for single line code examples.
- Significantly tightens the left padding when line numbers are shown.
- Right-aligns line numbers in their column to improve readability.

Bug fixes:
- Fixes an issue where iOS browsers would render code examples at a `20px` size, rather than the `13px` font size they're supposed to render as.
- Sometimes code that's written as multi-line statements wouldn't have line numbers applied to each line of the statement. That should now be fixed.
- Fixes an issue where line highlight gradients in dark mode in Safari would render multiple gradients when line numbers were shown.

Under the hood updates:
- Removes the Syntax component. This component was extremely tightly coupled with the code component to a point where it wasn't a feasible component when used independently. All functionality is now self-contained within the Code component code.
- Line highlighting definitions written with tuples expressing ranges are no longer expanded, making for a more efficient implementation, and allowing us to remove an arbitrary restriction on the number of lines possible to highlight.
- Tokens can now have multiple classNames expressing their "kind", allowing for more precise code highlighting.
