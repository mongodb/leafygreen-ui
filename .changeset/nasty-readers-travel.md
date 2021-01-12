---
'@leafygreen-ui/select': patch
---

Fixes bug where when a non-centered `Option` is clicked, the component will scroll to center that element instead of being selected.
Now, when an element is clicked, it becomes selected. When opening the dropdown later, the selected item should then be centered.
