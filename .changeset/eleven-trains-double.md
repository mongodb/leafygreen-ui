---
'@leafygreen-ui/card': patch
'@leafygreen-ui/checkbox': patch
'@leafygreen-ui/combobox': patch
---

Update to consume darkMode from `useDarkMode`. Some components were setting `darkMode = false` as a default which would override the default value provided by the `LeafyGreenProvider`.
