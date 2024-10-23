---
'@leafygreen-ui/guide-cue': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `GuideCue` renders beacon and tooltip using popover API. As a result, the following props are removed:
- `popoverZIndex`
- `portalClassName`
- `portalContainer`
- `portalRef`
- `scrollContainer`

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<GuideCue popoverZIndex={9999} usePortal={false} />
<GuideCue portalContainer={containerRef} scrollContainer={containerRef} usePortal />
```

##### New
```js
<GuideCue />
<GuideCue />
```
