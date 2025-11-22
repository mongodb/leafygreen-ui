# @lg-chat/suggestions

## 0.2.8

### Patch Changes

- cb31ce6: fix: remove unexpected @emotion imports from icon package dependency
- Updated dependencies [43810b4]
- Updated dependencies [ec4fad8]
- Updated dependencies [cb31ce6]
  - @leafygreen-ui/icon@14.7.1
  - @leafygreen-ui/tokens@4.1.0
  - @leafygreen-ui/banner@10.2.4
  - @leafygreen-ui/typography@22.2.3

## 0.2.7

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [9cf3b18]
  - @leafygreen-ui/typography@22.2.2
  - @leafygreen-ui/banner@10.2.3
  - @leafygreen-ui/button@25.1.3

## 0.2.6

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [c6b4d3f]
- Updated dependencies [888a37d]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/typography@22.2.0
  - @leafygreen-ui/banner@10.2.2
  - @leafygreen-ui/button@25.1.2

## 0.2.5

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/banner@10.2.1
  - @leafygreen-ui/button@25.1.1

## 0.2.4

### Patch Changes

- b2a1a00: [LG-5457](https://jira.mongodb.org/browse/LG-5457): restrict `ConfigurationParameter` types to enhance API clarity
- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [1a5c69f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/banner@10.1.1

## 0.2.3

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/banner@10.1.0
  - @leafygreen-ui/button@25.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 0.2.2

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/banner@10.0.5
  - @leafygreen-ui/button@25.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 0.2.1

### Patch Changes

- 707923d: Hide "Apply configuration to your cluster?" title when component state is unset

## 0.2.0

### Minor Changes

- f75e629: [LG-5432](https://jira.mongodb.org/browse/LG-5432): add `'apply'` state value to conditionally render apply button. `'unset'` state will now no longer render the apply button. Also enables HTMLDivElement props to spread to the root container node and removes the fixed width. Styles can be further customized using `className` prop.
