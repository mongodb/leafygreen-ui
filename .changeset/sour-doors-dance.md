---
'@leafygreen-ui/tokens': minor
---

- Deprecates `bold` font-weight token
- Adds `semiBold` font-weight token
- Adds `FontWeight` enum-like constant and type

Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just creates a token that aligns correctly to the font-face and Figma component.
