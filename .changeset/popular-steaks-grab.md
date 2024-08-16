---
'@leafygreen-ui/code': patch
'@leafygreen-ui/copyable': patch
'@leafygreen-ui/modal': patch
'@leafygreen-ui/popover': patch
---

[LG-4446](https://jira.mongodb.org/browse/LG-4446): In order to consolidate popover-related contexts, the `PortalContext` values for `portalContainer` and `scrollContainer` are consolidated in the `PopoverContext`.

`usePopoverPortalContainer` is replaced by `usePopoverContext` and `PortalContextProvider` is replaced by `PopoverProvider`. There are no functional changes.
