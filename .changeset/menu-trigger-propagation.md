---
'@leafygreen-ui/menu': major
---

- Re-enables native event propagation on trigger clicks. Previously this was done to prevent errors caused by different event handling in React vs Backbone.
- Adds logic when the menu closes to check if the click occurred on an element that is focusable. If it is then we want to focus that element, otherwise we want to focus the menu trigger.
- Moves `popoverRef` from the `ul` to the root popover `div`
