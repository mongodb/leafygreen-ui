---
'@leafygreen-ui/select': major
---

- Adds `description` prop to `Option`
- Refactor `Option` to use internal `InputOption` component
- Internally removes `theme` from `SelectContext` by opting to enclose `Select` within the `LeafygreenProvider` and  consuming `theme` from there. This adjustment enables nested children to access the dark mode context provided by `LeafygreenProvider` as well.
- Reorganizes internal file structure
