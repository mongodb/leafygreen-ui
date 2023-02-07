---
'@leafygreen-ui/menu': major
---

Migrate component to use `Polymorphic` instead of `Box` internally. This should allow better support of the `styled` API. Additionally, this fixes a bug with the `as` prop, which should now work as expected and allow consuming applications to choose what component MenuItem and SubMenu components are rendered as.
