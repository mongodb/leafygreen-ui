---
'@leafygreen-ui/menu': minor
---

## Features
- Clicking a submenu item that _does not_ have a click handler or `href` will toggle the submenu
- When focused on a submenu item, pressing the left/right arrow keys will close/open the menu (respectively)

## Structural changes
- Updates Submenu component to use `InputOption`
- Moves the submenu toggle button to be a sibling of the `InputOption`
  - this avoids any potential nesting of `button` elements 
