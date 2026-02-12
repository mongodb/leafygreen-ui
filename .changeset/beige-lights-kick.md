---
'@leafygreen-ui/drawer': minor
---

- Adds focus management to embedded drawers. Embedded drawers will now automatically focus the first focusable element when opened and restore focus to the previously focused element when closed. Overlay drawers use the native focus behavior of the dialog element.
- Adds visually hidden element to announce drawer state changes to screen readers.
- Removes CSS visibility check from the `isOpen` test utility since `opacity, `visibility` and `display` properties do not change when the drawer is opened or closed.