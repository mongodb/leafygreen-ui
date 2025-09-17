# @lg-chat/suggestions

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
