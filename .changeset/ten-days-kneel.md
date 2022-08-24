---
'@leafygreen-ui/combobox': major
---

Removes `Overflow.ExpandX` option.

Overflow.ExpandX has always been an edge case, and is causing some issues with styling. Instead of increasing the complexity of the component to account for this edge case, we are removing this option.

In most cases the `x` direction will be more space-limited and not many folks will opt to use this option. And if they do use expand-x, it's inherently limited to the size of the container/window and we'll need to restrict the width regardless. Just providing scroll-x and expand-y overflow options will cover most use cases.
