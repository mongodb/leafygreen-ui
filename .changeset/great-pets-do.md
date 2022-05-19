---
'@leafygreen-ui/combobox': patch
---

Updates backdrop click behavior to match native `<select>`. Now, when clicking away from an open menu to close it, the Combobox will retain focus and no click handlers should fire on clicked elements until the menu is closed
