# @leafygreen-ui/mongo-nav

## 0.17.0

### Minor Changes

- 4cb6ee0: Updates MongoNav to additionally track active states in dropdowns

### Patch Changes

- 5cf9e7d: Displays admin when the prop is set and user is onPrem
- b414edd: Removes async await syntax to avoid having to polyfill regenerator runtime
- 40db4b7: Updates logos in UserMenu and ProjectNav to latest logos
- Updated dependencies [4c268a5]
- Updated dependencies [94ed125]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.0
  - @leafygreen-ui/button@4.1.1
  - @leafygreen-ui/icon-button@4.1.5
  - @leafygreen-ui/menu@6.0.4

## 0.16.0

### Minor Changes

- dd342f5: UserMenu displays Atlas content only in cloud products
- beccf70: Adds projectNav.charts key.

### Patch Changes

- Updated dependencies [e1568c6]
- Updated dependencies [dd342f5]
  - @leafygreen-ui/icon@4.3.0
  - @leafygreen-ui/menu@6.0.3
  - @leafygreen-ui/icon-button@4.1.4

## 0.15.0

### Minor Changes

- cda96b2: Extends `onElementClick` to support segment tracking across navs
- 589120c: Adds `alertsCount` prop to overwrite number of alerts received from cloud endpoint

### Patch Changes

- 4e721d7: Only displays projects in ProjectSelect where the project's `orgId` matches the current `orgId`
- Updated dependencies [cda96b2]
  - @leafygreen-ui/menu@6.0.2

## 0.14.0

### Minor Changes

- 4e1e9dc: Adds remaining activeNav values, and unifies `OnElementClick` into `NavElement` enum
- ebb5102: Updates the university preferences link in the mongo nav
- 0f7d8a3: Adds `onElementClick` prop

### Patch Changes

- 3f7719e: Adds logic to determine whether to display Realm or Stitch
- 97cadc1: Conditionally applies overflow rule to MongoSelect components

## 0.13.0

### Minor Changes

- 2cf1a43: Adds `activeOrgId` and `activeProjectId` props to MongoNav
- 0d5bb89: Adds `loadData` prop to `MongoNav`

### Patch Changes

- Updated dependencies [a2948f6]
  - @leafygreen-ui/icon@4.2.0
  - @leafygreen-ui/icon-button@4.1.3

## 0.12.0

### Minor Changes

- ab1a1c1: Fixes `z-index` stacking context issue
- ab1a1c1: Adds support for Cloud Manager

### Patch Changes

- Updated dependencies [ab1a1c1]
- Updated dependencies [71327dd]
  - @leafygreen-ui/tooltip@3.1.0
  - @leafygreen-ui/icon@4.1.0
  - @leafygreen-ui/icon-button@4.1.2

## 0.11.1

### Patch Changes

- eee1bac: Fixes a bug involving broken project links.

## 0.11.0

### Minor Changes

- 347bcf6: Adds Ops Manager state

### Patch Changes

- Updated dependencies [347bcf6]
- Updated dependencies [704e25c]
- Updated dependencies [347bcf6]
  - @leafygreen-ui/icon-button@4.1.1
  - @leafygreen-ui/lib@4.3.1
  - @leafygreen-ui/menu@6.0.1

## 0.10.0

### Minor Changes

- 0bfe2ad: Updates styles to fit latest spec

### Patch Changes

- Updated dependencies [0bfe2ad]
  - @leafygreen-ui/icon-button@4.1.0

## 0.9.0

### Minor Changes

- 6eb9d26:
  - Adds disabled state for the Org Nav, used for pages where there is no concept of a current project or organization.
  - Exports the different nav heights for the above reason
- 87e88e6: Make `hosts` and `urls` prop optional in UserMenu

### Patch Changes

- da35e55: Adds more robust logic to determine whether or not to show payment status
- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 0.8.0

### Minor Changes

- ecbf286: Updates UserMenu types such that component can work independently of MongoNav

## 0.7.0

### Minor Changes

- 69a1673: Changes Stitch to Realm in ProjectNav and across TS definitions

## 0.6.0

### Minor Changes

- 786ccf1: Adds User Feedback link to UserMenu
- 4c16d51: Adds fetch to production mode, enabling consumers to get data from cloud endpoint
- c8d50f2: Renames internal MongoMenu component to UserMenu
- 4c16d51: Design updates to MongoNav based on the latest design spec

### Patch Changes

- Updated dependencies [786ccf1]
- Updated dependencies [ac5c473]
- Updated dependencies [b342448]
- Updated dependencies [690888a]
  - @leafygreen-ui/menu@6.0.0
  - @leafygreen-ui/button@4.1.0
  - @leafygreen-ui/hooks@2.0.1
  - @leafygreen-ui/tooltip@3.0.2

## 0.5.0

### Minor Changes

- fabc1c9: Alpha release of `MongoNav` component

### Patch Changes

- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/icon-button@4.0.0
  - @leafygreen-ui/menu@5.1.0
  - @leafygreen-ui/icon@4.0.0
  - @leafygreen-ui/lib@4.2.0
  - @leafygreen-ui/tooltip@3.0.1
