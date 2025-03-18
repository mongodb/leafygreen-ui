---
'@leafygreen-ui/hooks': major
---

Removes `mousedown` and listener that prevented clicks on background elements from firing. Clicks outside of a menu, dropdown or tooltip will now fire click events as expected. (Previous behavior was a necessary restriction to avoid bugs in hybrid React 16/17 + Backbone applications)
