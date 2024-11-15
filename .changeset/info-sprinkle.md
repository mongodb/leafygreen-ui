---
'@leafygreen-ui/info-sprinkle': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `InfoSprinkle` renders tooltip in the top layer using popover API. As a result, the following props are removed:
- `popoverZIndex`
- `portalClassName`
- `portalContainer`
- `portalRef`
- `scrollContainer`
- `usePortal`

Additional changes include:
- Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`
- Opens tooltip immediately on hover instead of default 500ms delay

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<InfoSprinkle popoverZIndex={9999} usePortal={false} />
<InfoSprinkle portalClassName="portal-class" usePortal />
```

##### New
```js
<InfoSprinkle />
<InfoSprinkle />
```
