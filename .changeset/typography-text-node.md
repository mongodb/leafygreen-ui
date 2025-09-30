---
'@leafygreen-ui/typography': minor
---

Adds `TextNode` component. 

Wraps a string in the provided `as` component,
or renders the provided `ReactNode`.

Useful when rendering `children` props that can be any react node

```tsx
<TextNode as={h1}>Hello!</TextNode> 
// Renders: <h1>Hello!</h1>
```

```tsx
<TextNode>
  <h2>Hello!</h2>
</TextNode> 
// Renders: <h2>Hello!</h2>
```