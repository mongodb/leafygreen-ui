# @leafygreen-ui/mongo-nav

## 0.22.0

### Minor Changes

- 899b9cc: Makes activeProduct optional and export Product object.
- e503de2: Conditionally renders logos in OrgSelect, based on whether or not plan types differ across a users orgs

### Patch Changes

- 194c7ea: Fixes anchor tag overrides and enables the trigger on OrgSelect
- de42634: Changes color of active IconButtons in ProjectNav to match design spec
- 5aafd72: IconButton now accepts `aria-label` instead of `ariaLabel`
  When an Icon is a child of IconButton, the Icon's title will be unset unless explicitly set on Icon, and its size will be inherited from IconButton unless its explicitly set.
  Previously, IconButton required that `ariaLabel` exists as a prop to IconButton. Now IconButton is more flexible, and requires that one of `aria-label` or `aria-labelledby` are set.- cdb3eb5: Adds Cloud Manager Icon to ProjectNav and small Cloud Manager and Atlas Icons to the OrgSelect component
- 04704c4: Fixes onOrganizationChange and onProjectChange such that they can hook into the OrganizationSelect and ProjectSelect components respectively and determine what organizations and projects are rendered based on a search
- Updated dependencies [ebbac0e]
- Updated dependencies [5aafd72]
- Updated dependencies [5aafd72]
  - @leafygreen-ui/button@4.2.0
  - @leafygreen-ui/icon-button@5.0.0
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1
  - @leafygreen-ui/menu@6.0.6

## 0.21.0

### Minor Changes

- da540d3: Adds dataFixtures prop to MongoNav, which allows consumer to set data in dev mode
- eb3895e: Adds active states, className overrides, and simplifies the required URLs interface required for OrgSelect and ProjectSelect. Adds the Public API Access link to the OnPremUserMenu.
- 7f30d61: Adds support for configuring logout url. Add default logout behavior.

### Patch Changes

- 0c9e69c: Resizes all icons to fill their viewboxes
- Updated dependencies [da540d3]
  - @leafygreen-ui/lib@4.4.0

## 0.20.0

### Minor Changes

- 1ee9966: Fixes incorrect links created in the ProjectSelect menu.

  Also reuse types across different components.- 219859a: Change the date when we show Realm

- 219859a: Updates Realm URL.
- 6e2b046: Updates UserMenu and OnPremUserMenu to fix bugs and include active states for UserMenu. This eliminates the previous temporary active nav element UserSettings, so the Org Nav will now be disabled if any UserMenu or OnPremUserMenu active nav element is provided.

### Patch Changes

- 02e108c: Fixes style-related issues in MongoNav
- 219859a: Disables Project Access when ProjectNav is not being displayed.
- 219859a: Resets filter value in OrgSelect and ProjectSelect when menu closes.
- 219859a: Closes OrgSelect when an org is selected.

## 0.19.0

### Minor Changes

- 64c03e7: Adds project status badge to ProjectNav
- 4e67588: Adds support for polling an alerts endpoint to keep the alerts state in sync.
- a35f23d: Sets Atlas tab link to the full URL to prevent full page refreshes.

### Patch Changes

- ee28366: Applies more specific styles to anchor tags in the MongoNav
- 6ed532c: Closes OnPremUserMenu when a MenuItem is clicked
- Updated dependencies [bc47b13]
- Updated dependencies [64c03e7]
- Updated dependencies [1b298cc]
  - @leafygreen-ui/tooltip@3.2.0
  - @leafygreen-ui/menu@6.0.5
  - @leafygreen-ui/hooks@2.1.0

## 0.18.0

### Minor Changes

- 838ff82: Updates the OnPremUserMenu active states and default urls, and exports both the ProjectSelect component and the OnPremUserMenu component for usage outside the MongoNav component.

### Patch Changes

- Updated dependencies [365412e]
  - @leafygreen-ui/icon@5.0.1
  - @leafygreen-ui/icon-button@4.1.6

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
