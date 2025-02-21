---
'@leafygreen-ui/code': minor
---

Adds the `customKeywords` prop, which allows you to wrap custom keywords in a specified className for CSS customization. Reserved keywords will be ignored.

E.g.

```js
<Code customKeywords= {{'password': 'custom' }} >
 {snippet}
</Code>
```

Renders as 
```html
<span className="lg-highlight-custom">password</span>
```
