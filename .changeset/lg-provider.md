---
'@leafygreen-ui/leafygreen-provider': major
---

[LG-4446](https://jira.mongodb.org/browse/LG-4446): Consolidates popover-related contexts

| Old | New |
| - | - |
| `PortalContext` | `PopoverContext` |
| `PortalContextProvider` | `PopoverProvider` |
| `usePopoverPortalContainer` (internal) | `usePopoverContext` (internal) |

Additional changes include:
- Adds `forceUseTopLayer` prop to forcibly set all LG popover elements to `renderMode="top-layer"`
- [Internal] `PopoverContext` values for `isPopoverOpen` and `setIsPopoverOpen` have been migrated to the `ModalPopoverContext` in the `@leafygreen-ui/modal` package

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
