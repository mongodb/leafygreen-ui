---
'@leafygreen-ui/drawer': patch
---

- Fixes bug that cached `toolbarData`. This change ensures that the toolbar data is updated dynamically when the state changes, allowing the drawer to reflect the latest data.
- Adds a transition delay to the drawer content opacity to allow the drawer to open before showing the content.