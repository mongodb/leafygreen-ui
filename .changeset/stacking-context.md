---
'@leafygreen-ui/segmented-control': patch
'@leafygreen-ui/number-input': patch
'@leafygreen-ui/split-button': patch
---

Ensures the containing element establishes a new stacking context (`z-index: 0;`), which ensures the component will correctly render below other any high-z components (like `Modal`)
