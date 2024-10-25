---
'@lg-tools/codemods': minor
---

[LG-4525](https://jira.mongodb.org/browse/LG-4525) Add `popover-v12` codemod which can be used to refactor popover component instances. It does the following:
1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for the following components:
- `Combobox`
- `Menu`
- `Popover`
- `Select`
- `SplitButton`
- `Tooltip`
2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:
- `InfoSprinkle`
- `InlineDefinition`
- `NumberInput`
3. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, and `scrollContainer` props from the following components:
- `DatePicker`
- `GuideCue`
4. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `scrollContainer`, and `usePortal` props from `Code` component
5. Removes `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from `SearchInput` component
6. Removes `shouldTooltipUsePortal` prop from `Copyable` component
