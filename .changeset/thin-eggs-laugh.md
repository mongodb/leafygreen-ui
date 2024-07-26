---
'@leafygreen-ui/info-sprinkle': major
---

- Adds `triggerProps` prop. These props are passed to the trigger element.
```js
  triggerProps={{
    onMouseDown: () => {},
    onMouseOver: () => {},
    'aria-label': 'aria-label',
  }}>
```
- Removes `triggerAriaLabel` prop. Instead you can pass `aria-label` to `triggerProps`.