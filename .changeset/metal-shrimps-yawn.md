---
'@leafygreen-ui/box': major
---

Box component now accepts `as` prop instead of `component` and exports generic `ExtendableBox` as helper type for components wrapping Box.

```js
Example Usage: 
function Example<ExtendableBox<ExampleProps>>(props: ExampleProps) {
  return <div>Example Component</div>
}
```
