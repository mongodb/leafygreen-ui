---
'@leafygreen-ui/modal': patch
---

Fixes bug where select items are not selectable inside modal. Modal children are now wrapped in `PortalContextProvider` and the modal ref is passed in as the default portalContainer and scrollContainer.
