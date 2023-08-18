---
'@leafygreen-ui/tooltip': patch
---

Updates `PopoverFunctionParameters` interface to use `PopoverAlign` alias.

Omit `children` from `PopoverProps` since it was overriding `Tooltip` children.
