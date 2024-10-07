---
'@leafygreen-ui/hooks': patch
---

Removes `useMemo` from `useAvailableSpace`, which was preventing the hook from returning the correct value.

Previously, `useViewportSize` returned `null` initially, then re-rendered with the correct viewport size. However, with the recent changes, `useViewportSize` now immediately returns the correct viewport size. This caused issues in the `useAvailableSpace` hook, as the value returned from `useViewportSize` is a dependency for `useAvailableSpace`.

These changes should affect the following components:
- `Select`
- `Combobox`
- `Menu`
- `SearchInput`