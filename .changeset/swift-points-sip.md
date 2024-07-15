---
'@leafygreen-ui/descendants': major
---

Updates `useInitDescendants` signature to require a Context value, and return a `Provider` component.

Eliminates the need to destructure `descendants` and `dispatch` from the hook's return value just to pass into the provider. Instead, the hook will construct a pre-populated provider unique to the Context value given.

Note: `descendants`, `dispatch` and `getDescendants` are still returned by the hook for use in the parent component if necessary.

Before:
```tsx
const MyDescendantContext = createDescendantsContext();
const { descendants, dispatch } = useInitDescendants();

return (
  <DescendantsProvider
    context={MyDescendantContext}
    descendants={descendants}
    dispatch={dispatch}
  >
    <MyDescendantItem />
  </DescendantsProvider>
)
```

After:
```tsx
const MyDescendantContext = createDescendantsContext();
const { Provider } = useInitDescendants(MyDescendantContext);

return (
  <Provider>
    <MyDescendantItem />
  </Provider>
)
```
