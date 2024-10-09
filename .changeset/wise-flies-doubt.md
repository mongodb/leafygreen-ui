---
'@leafygreen-ui/hooks': patch
---

Removes `useMemo` from `useAvailableSpace`, which was preventing the hook from returning the correct value.

On first render, the `triggerRef` is not available but `useViewportSize` is. When the menu is opened, the `triggerRef` is available but the viewport size remains the same so the memo callback is not triggered since refs do not trigger a re-render.

Previously, `useViewportSize` returned null and then re-rendered with the correct dimensions, which would trigger the memo callback.

These changes should affect the following components:
- `Select`
- `Combobox`
- `Menu`
- `SearchInput`