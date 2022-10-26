---
'@leafygreen-ui/leafygreen-provider': major
---

Nested LeafyGreenProviders now inherit values from ancestor contexts.
For example:

```jsx
<LeafyGreenProvider darkMode={true}>
  Will have `darkMode == true` and `baseFontSize == 14`[*]
  <LeafyGreenProvider baseFontSize={16}>
    Will have `darkMode == true` and `baseFontSize == 16`
  </LeafyGreenProvider>
</LeafyGreenProvider>
```

[*] Will be converted to 13 in redesigned components
