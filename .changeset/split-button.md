---
'@leafygreen-ui/split-button': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): Replaces `usePortal` prop with `renderMode` prop with values of `'inline'`, `'portal'`, and `'top-layer'`. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer.

See [@leafygreen-ui/menu package 26.0.0 changelog](https://github.com/mongodb/leafygreen-ui/blob/main/packages/menu/CHANGELOG.md#2600) for more info.

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<SplitButton popoverZIndex={9999} usePortal={false} />
<SplitButton portalClassName="portal-class" usePortal />
```

##### New
```js
<SplitButton popoverZIndex={9999} renderMode="inline" />
<SplitButton portalClassName="portal-class" renderMode="portal" />
```
