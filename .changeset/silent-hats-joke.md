---
'@leafygreen-ui/copyable': major
---

This major change wraps the Copyable component in a new outer div. The existing `className` prop now applies to the inner container, while the new `wrapperClassName` prop applies to the outer wrapper. This prevents box model styles (e.g. gap) from parent elements affecting the component's internal layout. Existing usages that relied on `className` applying to the outer wrapper may break and should be updated to use `wrapperClassName` instead.