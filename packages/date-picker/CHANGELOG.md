# @leafygreen-ui/date-picker

## 1.2.0

### Minor Changes

- 02e1d77e: Expose `portalRef` in components that use `Popover`:

  - `Combobox`
  - `DatePicker`
  - `GuideCue`
  - `Menu`
  - `NumberInput`
  - `Select`
  - `SplitButton`
  - `Tooltip`

  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/select@12.1.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 1.1.3

### Patch Changes

- c86227a6: Updates Storybook file for mongodb.design
- Updated dependencies [c86227a6]
  - @leafygreen-ui/form-field@1.2.2

## 1.1.2

### Patch Changes

- c406ab85: [LG-2930](https://jira.mongodb.org/browse/LG-2930)

  - Update error message test id in `DatePicker` test specs

- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
  - @leafygreen-ui/form-field@1.2.0
  - @leafygreen-ui/typography@19.1.0
  - @leafygreen-ui/select@12.0.0
  - @leafygreen-ui/tokens@2.6.0

## 1.1.1

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/form-field@1.1.1
  - @leafygreen-ui/select@11.3.2

## 1.1.0

### Minor Changes

- 27ad3121: [LG-2930](https://jira.mongodb.org/browse/LG-2930)

  - Added stories for error state
  - `FormField` styling changes apply to `DatePicker`. [See style changes here](https://github.com/mongodb/leafygreen-ui/blob/main/packages/form-field/CHANGELOG.md#102)

### Patch Changes

- Updated dependencies [9402ba0e]
- Updated dependencies [c3906f78]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [8aec541d]
- Updated dependencies [c3906f78]
- Updated dependencies [27ad3121]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/form-field@1.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/select@11.3.0
  - @leafygreen-ui/palette@4.0.10

## 1.0.3

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/form-field@1.0.1
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/select@11.2.3
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/date-utils@0.1.2
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 1.0.2

### Patch Changes

- Updated dependencies [223666eb]
- Updated dependencies [74057388]
  - @leafygreen-ui/form-field@1.0.0
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/select@11.2.2
  - @leafygreen-ui/typography@18.2.3

## 1.0.1

### Patch Changes

- fbc2b7c8: Removes unused storybook dev dependencies (`@storybook/types` and `storybook-mock-date-decorator`)
- Updated dependencies [8142d306]
- Updated dependencies [3208b813]
  - @leafygreen-ui/icon@11.29.0
  - @leafygreen-ui/tokens@2.5.0

## 1.0.0

### Major Changes

- 69527524: Changes the behavior of segments.

  ## Backspace

  ### New Behavior

  - Pressing `backspace` will always clear the segment and keep the focus on that segment
  - Pressing `backspace` twice will clear the segment and move the focus to the previous segment

  ### Old Behavior

  - Pressing `backspace` deletes characters before the cursor one by one
  - After all characters are deleted, the focus moves to the previous segment

  ## Space

  ### New Behavior

  - Pressing `space` will always clear the segment and keep the focus on that segment

  ### Old Behavior

  - Pressing `space` does not change the current value

  ## Clicking

  ### New Behavior

  #### When initially clicking on a segment with a value, the segment will select the value:

  - Typing a digit will clear the segment and populate the segment with that new value.
  - Pressing the `backspace` key will clear the segment
  - Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
  - Pressing the `space` key will clear the segment

  #### When initially clicking on a segment without a value, the segment will show a cursor:

  - Typing a digit will start to populate the segment
  - Pressing the `backspace` key will move the focus to the previous segment
  - Pressing the `space` key will keep the focus on that segment

  #### When a segment is already selected, clicking on the segment a second time will deselect the segment, and a cursor will appear:

  - Typing a digit will clear the segment and populate the segment with that new value.
  - Pressing the `backspace` key will clear the segment
  - Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
  - Pressing the `space` key will clear the segment

  ### Old Behavior

  - Clicking on a segment will make the cursor appear in the clicked spot.
  - If the segment is full, typing will not change the value
  - If the segment is not full, typing will not add a new character after the cursor

  ## Tabbing and Left/Right arrows

  ### New behavior

  #### When when using the arrow keys or tabbing into a segment with a value, the segment will select the value:

  - Typing a digit will reset the segment and populate the segment with that new value.
  - Pressing the `backspace` key will clear the segment
  - Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
  - Pressing the `space` key will clear the segment

  #### When using the arrow keys or tabbing into a segment without a value, the segment will show a cursor:

  - Typing a digit will start to populate the segment
  - Pressing the `backspace` key will move the focus to the previous segment
  - Pressing the `space` key will keep the focus on that segment

  ## Tabbing

  ### Old Behavior

  - Tabbing into a segment will select the value, but pressing `space` does not reset the value

  ## Left/Right arrows

  ### Old Behavior

  - When in a segment, `left` or `right` arrow keys navigates through each character instead of selecting the value.
  - If the segment is full, typing does not update the value
  - If the segment is not full, typing will add a new character in that spot

### Patch Changes

- Updated dependencies [c2854e9b]
- Updated dependencies [11d12cc4]
- Updated dependencies [36a8ded2]
  - @leafygreen-ui/tokens@2.4.0
  - @leafygreen-ui/typography@18.2.1
  - @leafygreen-ui/select@11.2.0

## 0.2.2

### Patch Changes

- 5249bd3d: Reduces the width and height of the calendar icon so that the focus/hover states do not excessively overflow the input container.
  When the `size` is `xsmall` the width and hight of the calendar icon will be `20px`. When the `size`is `small` the width and hight of the calendar icon will be 22px. The icon itself will remain the the same size.
- 253ef4e4: Rearranges the placement of the year select to come before the month select when the `locale` is `iso8601`. [LG-3839](https://jira.mongodb.org/browse/LG-3839)
- Updated dependencies [5249bd3d]
  - @leafygreen-ui/form-field@0.3.2

## 0.2.1

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- 49a550b3: - Changing menu month back to the month of the current value now shows the correct focus state. [LG-3857](https://jira.mongodb.org/browse/LG-3857)
  - Rename internal function -- `isMonthInValid` to `isMonthInvalid`
- ae0e3629: Dynamically update the `aria-label` for the year/month select to include the current selection, enabling screen readers to announce the current selection.
- Updated dependencies [2bceccb1]
- Updated dependencies [54eb3ce8]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/date-utils@0.1.1
  - @leafygreen-ui/hooks@8.1.1
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/form-field@0.3.1
  - @leafygreen-ui/tokens@2.3.0

## 0.2.0

### Minor Changes

- e0b4080c: Extends [Popover props](https://www.mongodb.design/component/popover/documentation/) but omits the following props: `usePortal`, `refEl`, `children`, `className`, `onClick`, and `active`. [LG-3930](https://jira.mongodb.org/browse/LG-3930)

### Patch Changes

- a8b717c7: Modify `DatePickerMenu.stories.tsx` to exclude the current date, as it caused daily chromatic changes.
- ba76002f: Applies a CSS transition duration of 100ms to enhance the hover and focus styles on calendar cells.

## 0.1.0

### Minor Changes

- ffd11f24: Initial pre-release of `date-picker`. Use DatePicker to allow users to input a date

### Patch Changes

- Updated dependencies [9b7a8236]
- Updated dependencies [ffd11f24]
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/icon@11.27.1
  - @leafygreen-ui/select@11.1.2
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/a11y@1.4.12
  - @leafygreen-ui/lib@13.2.0
  - @leafygreen-ui/form-field@0.3.0
  - @leafygreen-ui/popover@11.2.1
  - @leafygreen-ui/date-utils@0.1.0
  - @leafygreen-ui/typography@18.1.0
