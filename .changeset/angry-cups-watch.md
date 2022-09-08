---
'@leafygreen-ui/menu': major
---

Adds a call to `event.nativeEvent.stopPropagation()` on trigger click, preventing the native event from propagating, while still allowing the React synthetic event to bubble. This ensures clicks on the trigger do not close the menu in hybrid/multi-framework apps
