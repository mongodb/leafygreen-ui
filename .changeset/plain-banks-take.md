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
- Nest backdrop styles defined in `className` under `::backdrop` pseudo-element
- Move modal root styles defined in `contentClassName` to `className`
- Remove `initialFocus` prop usage; specify `autoFocus` on child element or rely on default behavior (first focusable child will be focused)
