---
'@leafygreen-ui/chip': major
---

[LG-4121](https://jira.mongodb.org/browse/LG-4121): Removes `popoverZIndex` prop because the `InlineDefinition` component instance will now render in the top layer

#### Migration guide

##### Old
```js
<Chip popoverZIndex={9999} />
```

##### New
```js
<Chip />
```
