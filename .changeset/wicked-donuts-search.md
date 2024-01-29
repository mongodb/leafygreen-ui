---
'@lg-tools/link': minor
---

Previously, `lg link` would only install & link packages using `yarn`. Now it will check the destination app's package manager (via lock file) and link packages using the correct package manager.
