# @lg-tools/codemods

## 0.1.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2

## 0.1.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1

## 0.1.0

### Minor Changes

- 04bb887c0: [LG-4525](https://jira.mongodb.org/browse/LG-4525) Adds `popover-v12` codemod which can be used to refactor popover component instances. Users can filter for specific packages using the `--packages` flag.

  This codemod does the following:

  1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for components in the following packages:

  - `@leafygreen-ui/combobox`
  - `@leafygreen-ui/menu`
  - `@leafygreen-ui/popover`
  - `@leafygreen-ui/select`
  - `@leafygreen-ui/split-button`
  - `@leafygreen-ui/tooltip`

  2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:

  - `@leafygreen-ui/info-sprinkle`
  - `@leafygreen-ui/inline-definition`
  - `@leafygreen-ui/number-input`

  3. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, and `scrollContainer` props from the following components:

  - `@leafygreen-ui/date-picker`
  - `@leafygreen-ui/guide-cue`

  4. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `scrollContainer`, and `usePortal` props from `Code` component in the `@leafygreen-ui/code` package

  5. Removes `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from `SearchInput` component in the `@leafygreen-ui/search-input` package

  6. Removes `shouldTooltipUsePortal` prop from `Copyable` component in the `@leafygreen-ui/copyable` package

  7. Replaces `justify="fit"` prop value with `justify="middle"` for components in the following packages:

  - `@leafygreen-ui/date-picker`
  - `@leafygreen-ui/info-sprinkle`
  - `@leafygreen-ui/inline-definition`
  - `@leafygreen-ui/menu`
  - `@leafygreen-ui/popover`
  - `@leafygreen-ui/tooltip`

## 0.0.2

### Patch Changes

- af208260: Pre-release of codemods.
