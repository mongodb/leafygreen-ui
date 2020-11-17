---
'@leafygreen-ui/hooks': major
---

The `useElementNode` hook has been removed. It's recommended to use `useState` directly instead.

# Example

## Before
```tsx
const [node, setNode] = useElementNode<HTMLDivElement>();
```

## After
```tsx
const [node, setNode] = useState<HTMLDivElement | null>(null);
```