---
'@leafygreen-ui/drawer': patch
---

Fixes bug where the drawer would not close when the active toolbar item became hidden.
When a drawer with a toolbar is open and its corresponding active toolbar item's visibility is set to false, the drawer will now automatically close. 