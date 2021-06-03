---
'@leafygreen-ui/lib': major
---

Removes `IdAllocator` class from package. Moving forward, use the `useIdAllocator` hook from the hooks package instead. This was done to better support server-side rendering.
