---
'@leafygreen-ui/segmented-control': patch
'@leafygreen-ui/radio-box-group': patch
'@lg-tools/storybook-addon': patch
'@leafygreen-ui/date-picker': patch
'@leafygreen-ui/radio-group': patch
'@leafygreen-ui/section-nav': patch
'@leafygreen-ui/combobox': patch
'@leafygreen-ui/side-nav': patch
'@leafygreen-ui/banner': patch
'@leafygreen-ui/button': patch
'@leafygreen-ui/select': patch
'@leafygreen-ui/badge': patch
'@leafygreen-ui/toast': patch
'@leafygreen-ui/code': patch
'@leafygreen-ui/tabs': patch
'@lg-charts/core': patch
---

- Updates usages of `bold` weight token to `semiBold`.

Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just updates the token used to better align with the font-face and Figma component.
