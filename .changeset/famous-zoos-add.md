---
'@leafygreen-ui/modal': minor
---

Fix escape key logic for popover components in `Modal`. Previously, when a popover component was opened in a modal and escape key was pressed, the `FocusTrap` logic would deactivate which would interfere with key down listeners in the popover component. `escapeDeactivates` in the `FocusTrap` in `Modal` is now set to `false` to prevent this from happening.
