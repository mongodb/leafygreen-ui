---
'@leafygreen-ui/confirmation-modal': major
'@leafygreen-ui/marketing-modal': major
'@leafygreen-ui/modal': major
---

Upgrades components to use the native `dialog` HTML element. This means we no longer have to handle focus trapping ourselves, and can rely on the browser to do that for us. The API for all modal components is not changing, but the DOM structure of the Modal components themselves have changed drastically, as well as where they are placed within the DOM itself.
