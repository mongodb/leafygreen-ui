---
'@leafygreen-ui/inline-definition': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `InlineDefinition` renders tooltip in the top layer using popover API. As a result, the following props are removed:
- `popoverZIndex`
- `portalClassName`
- `portalContainer`
- `portalRef`
- `scrollContainer`
- `usePortal`

Additional changes include:
- Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`
- Opens tooltip immediately on hover instead of default 500ms delay
- Reorganizes file structure

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<InlineDefinition popoverZIndex={9999} usePortal={false} />
<InlineDefinition portalClassName="portal-class" usePortal />
```

##### New
```js
<InlineDefinition />
<InlineDefinition />
```
