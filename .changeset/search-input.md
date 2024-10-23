---
'@leafygreen-ui/search-input': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `SearchInput` renders results menu in the top layer using popover API. As a result, the following props are removed:
- `portalClassName`
- `portalContainer`
- `portalRef`
- `scrollContainer`
- `usePortal`

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<SearchInput popoverZIndex={9999} usePortal={false} />
<SearchInput portalClassName="portal-class" usePortal />
```

##### New
```js
<SearchInput />
<SearchInput />
```
