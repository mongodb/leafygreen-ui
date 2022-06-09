# @leafygreen-ui/combobox

## 1.2.2

### Patch Changes

- fad2b287: Fixes a bug where occasionally the max menu height would be set to 0 if a ref was left unset

## 1.2.1

### Patch Changes

- Updated dependencies [f0a357e2]
  - @leafygreen-ui/tooltip@7.0.3

## 1.2.0

### Minor Changes

- 8ab46ed4: Adds `Large` size variant to Combobox. Additionally, restores legacy font in Label & Description
- d241af9e: Adds a `disabled` prop to ComboboxOptions. Note, disabled options will still be rendered in the menu, but not selectable

### Patch Changes

- d5c12b77: Updates filtering behavior. Now when opening the menu all options will be displayed, regardless of whether a selection has already been made
- a5d19177: Updates backdrop click behavior to match native `<select>`. Now, when clicking away from an open menu to close it, the Combobox will retain focus and no click handlers should fire on clicked elements until the menu is closed
- 8f7f8555: Updates combobox focus ring behavior. The combobox will now display a focus ring whenever the user is able to type in thy combobox. The outer focus ring will not render if a chip or the clear button is focused.
- 4f2ff237: - Updates min-width of the input to fit all characters (previously wide characters would be cut off).
  - Updates text wrapping of menu items so long unbroken strings (like ids) won't overflow, but wrap.
- d241af9e: Restores menu font to legacy Akzidenz font
- 6792bc44: Refactors Combobox and Select to use the new `useAvailableSpace` hook to calculate the max menu height
- 266e0d8e: Ensures the focus remains in the combobox when a chip is removed. Focus is set to either the input, or the next chip to the right, whichever is relevant
- 422dbfcd: Adds additional tests for internal Combobox utilities
- Updated dependencies [1356d50d]
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/checkbox@8.0.3
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/inline-definition@3.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 1.1.0

### Minor Changes

- e9c39305: - Reduces `min-width` of combobox down to `24px`

### Patch Changes

- a526ac52: Adds `@leafygreen-ui/tokens` and `@leafygreen-ui/tooltip` to dependencies
- e9c39305: Updates highlighting function to fix a bug where some text would be duplicated
  - Fixes left padding when `overflow="scroll-x"`
  - Clarifies wording for `initialValue` prop docs
- Updated dependencies [e630a889]
- Updated dependencies [2670e4db]
- Updated dependencies [6c12e85a]
  - @leafygreen-ui/checkbox@8.0.2
  - @leafygreen-ui/icon@11.10.0

## 1.0.3

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/checkbox@8.0.0
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/typography@11.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/icon@11.8.0
  - @leafygreen-ui/checkbox@7.0.0
  - @leafygreen-ui/palette@3.3.2

## 1.0.1

### Patch Changes

- e8f1a97: - Updates focus behavior, allowing users to re-open the menu with the mouse after making a selection
  - Adds a warning if `multiselect` and `value` props don't align
  - Fixes a bug where long display names would get truncated early
  - Fixes a bug where the space bar wouldn't type a space character
  - Fixes a bug where some characters could not be typed when a `value` prop was passed in
  - Updates hooks dependency to `^7.2.0`
- Updated dependencies [e8f1a97]
  - @leafygreen-ui/icon@11.7.0
  - @leafygreen-ui/icon-button@10.0.0

## 1.0.0

### Major Changes

- 548ca2c: - Release Combobox as v1
  - Adds standard popover props: `usePortal`, `popoverZIndex`, `popoverClassName`, `portalContainer`, and `scrollContainer`.
  - Fixes issue where clicking on elements within a Combobox option wouldn't select that option.
