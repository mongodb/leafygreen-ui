# @leafygreen-ui/ordered-list

## 2.0.4

### Patch Changes

- eb108e93b: [LG-4727](https://jira.mongodb.org/browse/LG-4727): The `description` props in these packages were previously wrapped in a `<p>`. However, in cases where a `ReactNode` was passed to the `description` prop, it would lead to a browser error. According to the HTML spec, `<p>` cannot contain block-level elements: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1

  The latest version of `@leafygreen-ui/typography` will typecheck `description` to ensure the proper element is used.

  - If a `description` of type `string` or `number` is used, it will continue to be wrapped in a `<p>`
  - All other types of `description` will be wrapped in a `<div>`

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0

## 2.0.3

### Patch Changes

- Updated dependencies [674d06888]
  - @leafygreen-ui/descendants@2.1.0

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/descendants@2.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/descendants@2.0.1
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/lib@14.0.1

## 2.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/descendants@2.0.0
  - @leafygreen-ui/tokens@2.11.1

## 1.0.0

### Major Changes

- 617cb67dc: Releases OrderedList and OrderedListItem components
