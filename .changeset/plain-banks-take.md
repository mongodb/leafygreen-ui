---
'@leafygreen-ui/confirmation-modal': major
'@leafygreen-ui/marketing-modal': major
'@leafygreen-ui/modal': major
---

[LG-4952](https://jira.mongodb.org/browse/LG-4952)

#### Breaking Changes

- **Top layer rendering**: Component renders in [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) instead of portaling
- **Props**: `className` → `backdropClassName`, `contentClassName` → `className`, `initialFocus` prop removed
- **Backdrop styling**: `backdropClassName` deprecated in favor of CSS `::backdrop` pseudo-element
- **Focus management**: Specifying `autoFocus` on focusable child element replaces manual `initialFocus` prop
- **Type changes**: Component now extends `HTMLElementProps<'dialog'>` instead of `HTMLElementProps<'div'>`

#### Migration Guide

Use the [modal-v20 codemod]([popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#modal-v20) for migration assistance.

```shell
pnpm lg codemod modal-v20 <path>
```

The codemod will:
1. Rename `className` prop to `backdropClassName`
2. Rename `contentClassName` prop to `className`
3. Remove `initialFocus` prop and add guidance comments
