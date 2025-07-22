---
'@leafygreen-ui/typography': patch
---

- Updates usages of `bold` weight token to `semiBold`.
- Updates the `weight` prop of `Body` to accurately reflect weight tokens.

Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just updates the token used to better align with the font-face and Figma component.
