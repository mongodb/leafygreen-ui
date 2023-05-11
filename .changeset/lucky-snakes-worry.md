---
'@leafygreen-ui/menu': major
---

- Selecting a menu item (with the mouse or keyboard) now closes the menu automatically
- Clicking a submenu item with no click handler or navigation behavior (i.e. `href` attr.) will open the submenu
- Arrow keys now should skip over elements in closed submenus
- Pressing space & enter keys when focussed on a menu item now behave like a click on that element (i.e. select the item and close the menu). This follows best practices from [w3c](https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus#Keyboard_Actions_if_focus_is_on_a_menu_item)
