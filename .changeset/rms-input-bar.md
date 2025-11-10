---
'@lg-chat/input-bar': major
---

- Removed deprecated `lgInputBarStyles` export.
- All chat components have been simplified by removing variant-specific conditional logic.
  - Removed props: `badgeText`, `shouldRenderGradient`, and `shouldRenderHotKeyIndicator`
- Added min-width of 150px to `textarea` element to ensure proper height calculation.
- Updated `react-textarea-autosize` from `^8.3.2` to `^8.5.9`.
