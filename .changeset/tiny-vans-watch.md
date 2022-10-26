---
'@leafygreen-ui/leafygreen-provider': minor
---

Exposes a `setDarkMode` function form the `useDarkMode` hook.

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

Note: If the value of `darkMode` passed into LeafyGreenProvider changes between renders (e.g. from an external `useState` call) then this new value will be used until the next `setDarkMode` call.