---
'@leafygreen-ui/tooltip': patch
---

When a user clicks a tooltip with `triggerEvent="hover"` and immediately navigates to another browser tab or window and then back, the tooltip unexpectedly reappears.
With this change, tooltips with `triggerEvent="hover"` will not be focused `onMouseDown`.
[LG-1727](https://jira.mongodb.org/browse/LG-1727)
