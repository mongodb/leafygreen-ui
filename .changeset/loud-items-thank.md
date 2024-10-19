---
'@lg-tools/codemods': minor
---

[LG-4525](https://jira.mongodb.org/browse/LG-4525) Add `popover-v12` codemod which can be used to refactor `Popover` components. It does the following:
1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for the following components:
  - `Combobox`
  - `Menu`
  - `Popover`
  - `Select`
  - `SplitButton`
  - `Tooltip`
2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:
  - `Code`
  - `DatePicker`
  - `GuideCue`
  - `InfoSprinkle`
  - `InlineDefinition`
  - `NumberInput`
  - `SearchInput`
3. Removes `shouldTooltipUsePortal` prop from `Copyable` component
