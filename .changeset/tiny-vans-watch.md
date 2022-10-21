---
'@leafygreen-ui/leafygreen-provider': minor
---

Exposes a `setDarkMode` function form the `useDarkMode` hook.
Note that the value can still be controlled externally by the prop on LeafyGreenProvider. The value of the last update is used as the context state.

```jsx
<LeafyGreenProvider darkMode={true}>
  <MyComponent />
</LeafyGreenProvider>

...

const MyComponent = () => {
  const { setDarkMode } = useDarkMode()
  ... 

}
```