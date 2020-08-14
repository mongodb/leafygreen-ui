---
'@leafygreen-ui/tooltip': patch
---

- `Tooltip` typography previously relied on consumer application's styles. Now, Tooltip children are wrapped in LeafyGreen Body component. 
- Setting `usePortal` to `false` no longer stops Tooltips from appearing on hover when the trigger is a LeafyGreen Button component.
