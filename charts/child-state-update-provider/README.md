# ChildStateUpdateProvider

Provides mechanism for letting parent components know of child state updates.

**Warning: This is meant to only be used in very specific situations. There's a large risk
of creating render loops if updates pushed up trigger renders on the parent.**

## Basic Example

Wrap tree in provider:

```ts
<ChildStateUpdateProvider>
  <Parent>
    <Child id="child">
  <Child>
</ChildStateUpdateProvider>
```

On `Child` state update:

```ts
function Child(id) {
  const [childState, setChildState] = useState();
  const { updateChildState } = useChildStateUpdateContext();

  useEffect(() => {
    updateChildState({ id: { childState }});
  }, [childState])
  .
  .
  .
}
```

In `Parent`:

```ts
const { childStateUpdates } = useChildStateUpdateContext();
```
