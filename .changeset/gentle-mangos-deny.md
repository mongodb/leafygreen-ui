---
'@leafygreen-ui/button': minor
---

Fix `Button` content justification bug by removing `justify-content: space-between;` that was getting added for `Button` instances with `darkMode={true}` and defined `rightGlyph`.
