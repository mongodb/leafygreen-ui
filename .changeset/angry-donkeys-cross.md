---
'@leafygreen-ui/menu': minor
---

Adds additional exports:
- `MenuDescendantsContext`
  - Used to register and consume Menu descendants
  - This context value allows you to register and track custom menu items
- Context hooks `useMenuContext`, `useMenuGroupContext`, & `useSubMenuContext`, along with types types `MenuContextData`, `MenuGroupContextData`, & `SubMenuContextData`,
  - use these to read context data from custom menu item components
- `menuColor`: Custom color tokens used within `Menu` and related components
- `MenuInteractionState`: Enumerates interaction states on a menu item
- `LGIDs`: Unique ids for menu elements
- `menuItemClassName`: The unique class name for menu item components
- `subMenuContainerClassName` & `subMenuToggleClassName`
  - Unique classnames for submenu elements