---
'@leafygreen-ui/input-option': major
---

- Renames `selected` prop to `checked` (this is done to avoid confusion with the `aria-selected` attribute, witch is conditionally applied via the `highlighted` prop)

- Adds `preserveIconSpace` prop to `InputOptionContent` to determine whether menu items should preserve space for a left glyph, or left align all text content. Use this prop in menus where some items may or may not have icons/glyphs, in order to keep text across menu items aligned.

- Extends `AriaLabelPropsWithChildren` in `InputOptionProps`

- Establishes internal `InputOptionContext` to track `disabled`,  `highlighted`, & `checked` attributes.

- Updates `InputOption` and `InputOptionContent` styles to use updated `color` and `spacing` tokens

- Exports `inputOptionClassName`, and `inputOptionContentClassName`.