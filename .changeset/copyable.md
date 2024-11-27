---
'@leafygreen-ui/copyable': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `Copyable` renders tooltip in the top layer using popover API. As a result, the `shouldTooltipUsePortal` prop is removed

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<Copyable shouldTooltipUsePortal={false} />
<Copyable shouldTooltipUsePortal />
```

##### New
```js
<Copyable />
<Copyable />
```
