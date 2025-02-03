---
'@leafygreen-ui/table': minor
---

Introduces a new prop, `overrideTruncation`, on `<Cell />` to allow overriding truncation for individual cells. When `shouldTruncate` is set to true on `<Table />`, `overflow: hidden` is applied to all cells, which can unintentionally clip hover and focus states on LeafyGreen components like `<Button />`. Setting `overrideTruncation` to true removes the overflow styles for that specific cell, ensuring interactive elements display correctly.


e.g. 
```js
<Cell overrrideTruncation>{content}</Cell>
```