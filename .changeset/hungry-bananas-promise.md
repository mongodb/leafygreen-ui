---
'@leafygreen-ui/menu': patch
'@leafygreen-ui/popover': patch
---

Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
