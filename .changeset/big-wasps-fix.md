---
'@leafygreen-ui/input-option': major
---

### API changes
- Renames `selected` prop to `checked` (this is done to avoid confusion with the `aria-selected` attribute, which is conditionally applied via the `highlighted` prop)
 - `checked` applies the `aria-checked` attribute
 - Note: `checked` _does not_ apply any styles. Any "checked" styles must be applied by the consuming component (this is consistent with previous behavior)
- Adds `preserveIconSpace` prop to `InputOptionContent` to determine whether menu items should preserve space for a left glyph, or left align all text content. Use this prop in menus where some items may or may not have icons/glyphs, in order to keep text across menu items aligned.
- Extends `AriaLabelPropsWithChildren` in `InputOptionProps`
  - [`AriaLabelPropsWithChildren`](../packages/a11y/src/AriaLabelProps.ts) allows a component to accept any of `aria-label`, `aria-labelledby` or `children` as sufficient text for screen-reader accessibility

### Styling changes

- Updates `InputOption` and `InputOptionContent` styles to use updated `color` and `spacing` tokens
- Exports `inputOptionClassName`, and `inputOptionContentClassName`.

#### Spacing overview
 - block padding: 8px
 - inline padding: 12px
 - icon/text/chevron gap: 8px
 - label & description font-size: 13px
 - label & description line-height: 16px

#### Colors overview
 - Left & right icon color: `color.[theme].icon.primary` tokens 
 - Label & Description: use default `Label` & `Description` colors from `typography`
 - Background uses `color[theme].background.primary` tokens (including hover & focus states)
 - Wedge uses `palette.blue.base` for all modes
 - The `highlight` prop uses the `.focus` state color for Icon, Text & Background colors


### Internal updates

- Establishes internal `InputOptionContext` to track `disabled`,  `highlighted`, & `checked` attributes.
