---
'@leafygreen-ui/leafygreen-provider': major
---

[LG-4446](https://jira.mongodb.org/browse/LG-4446): In order to consolidate popover-related contexts, the `PortalContext` values for `portalContainer` and `scrollContainer` are consolidated in the `PopoverContext`.

`usePopoverPortalContainer` is replaced by `usePopoverContext` and `PortalContextProvider` is replaced by `PopoverProvider`.

`usePopoverPortalContainer` (used internally) and `PortalContextProvider` are no longer exported. See below migration guidance.

#### Migration guide

##### Old
```js
<PortalContextProvider
  popover={{
    portalContainer: yourPortalContainer,
    scrollContainer: yourScrollContainer,
  }}
>
```

##### New
```js
<PopoverProvider
  portalContainer={yourPortalContainer}
  scrollContainer={yourScrollContainer}
>
```
