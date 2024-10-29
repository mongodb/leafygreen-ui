---
'@leafygreen-ui/menu': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): Replaces `usePortal` prop with `renderMode` prop. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer. The old default was `usePortal=true`, and the new default is `renderMode="top-layer"`. 

See [@leafygreen-ui/popover package 12.0.0 changelog](https://github.com/mongodb/leafygreen-ui/blob/main/packages/popover/CHANGELOG.md#1200) for more info.

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<Menu popoverZIndex={9999} usePortal={false} />
<Menu portalClassName="portal-class" usePortal />
```

##### New
```js
<Menu popoverZIndex={9999} renderMode="inline" />
<Menu portalClassName="portal-class" renderMode="portal" />
```
