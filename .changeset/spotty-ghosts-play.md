---
'@leafygreen-ui/avatar': patch
---

Avatar `text` prop can now be `null` even when `format === 'text'`, allowing for a more seamless integration with the `getInitials` function. If `text === null`, the Avatar will fall back to `Icon` format.
