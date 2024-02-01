# @leafygreen-ui/date-picker

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
