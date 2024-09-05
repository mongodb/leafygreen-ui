---
'@leafygreen-ui/hooks': patch
---

When server side rendering is used, `window` is not defined. This is causing build issues on the server where we access `window` in `useViewportSize`. To fix this, this change adds a hook, `useIsSsr`, that checks the rendering environment and can be used before attempting to access `window`. It adds a check of this to `useViewportSize` to fix the current build issue.
