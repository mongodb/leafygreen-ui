---
'@leafygreen-ui/input-option': major
---

### API changes
- Renames `selected` prop to `checked` (this is done to avoid confusion with the `aria-selected` attribute, witch is conditionally applied via the `highlighted` prop)
 - `checked` applies the `aria-checked` attribute
 - `checked` _does not_ apply any styles. Any "checked" styles must be applied by the consuming component

- Adds `preserveIconSpace` prop to `InputOptionContent` to determine whether menu items should preserve space for a left glyph, or left align all text content. Use this prop in menus where some items may or may not have icons/glyphs, in order to keep text across menu items aligned.

- Extends `AriaLabelPropsWithChildren` in `InputOptionProps`

### Styling changes

- Updates `InputOption` and `InputOptionContent` styles to use updated `color` and `spacing` tokens

- Exports `inputOptionClassName`, and `inputOptionContentClassName`.

### Internal updates

- Establishes internal `InputOptionContext` to track `disabled`,  `highlighted`, & `checked` attributes.
