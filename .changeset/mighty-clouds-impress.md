---
'@leafygreen-ui/testing-lib': patch
---

Adds `renderHookServer` method

@testing-library/react-hooks/server exposed a `renderHook` method
that allowed for one to render hooks as if SSR, and control
hydration. This is no longer supported in versions >=18.

This code was extracted from @testing-library/react-hooks/server and
updated to be compatible with React version >= 18 using `hydrateRoot`.

More context found here:
https://github.com/testing-library/react-testing-library/issues/1120
