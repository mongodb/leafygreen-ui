---
'@leafygreen-ui/code': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `Code` renders the copy button tooltip and language selector in the top layer using popover API. As a result, the following props are removed:
- `popoverZIndex`
- `portalClassName`
- `portalContainer`
- `scrollContainer`
- `usePortal`

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<Code popoverZIndex={9999} usePortal={false} />
<Code portalClassName="portal-class" usePortal />
```

##### New
```js
<Code />
<Code />
```
