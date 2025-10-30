---
'@leafygreen-ui/select': major
---

Removes support for `refEl` property, which was never leveraged within the component logic. Instead, the `refEl` property always positions the internal MenuButton component against the internal ListBox component. There are no end user changes, just a more precise `SelectProps` type definition.
