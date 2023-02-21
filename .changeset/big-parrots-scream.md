---
'@leafygreen-ui/toast': major
---

Updates Toast design to align with Toast v3 in Figma. Minor API updates to prepare for multi-toast behavior.
- Makes `title` prop required (instead of `body`)
- Renames `body` to `description` to align with Figma component
- Renames `close` to `onClose` to align with other LeafyGreen React callback names
- Adds `dismissible` prop. Previously behavior prop was inferred by the existance of a `close` callback
