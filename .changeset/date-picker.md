---
'@leafygreen-ui/date-picker': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): `DatePicker` renders menu, month selector, and year selector in top layer using popover API. As a result, the following props are deprecated and removed:
- `popoverZIndex`
- `portalClassName`
- `portalContainer`
- `portalRef`
- `scrollContainer`

Additional changes include:
- Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`
- Removes unused `contentClassName` prop

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<DatePicker portalContainer={containerRef} scrollContainer={containerRef} />
<DatePicker portalClassName="portal-class" />
```

##### New
```js
<DatePicker />
<DatePicker />
```
