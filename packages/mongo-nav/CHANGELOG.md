# @leafygreen-ui/mongo-nav

## 0.9.0

### Minor Changes

- 6eb9d26: This introduces the following updaters:
  - Lib is updated internally with shared test helpers
  - Side Nav is updated to match design standards, and to export width and side padding so that users can reference both in integrating the side nav without hardcoding these values and to future-proof design changes
  - Mongo Nav is updated with a disabled state for the Org Nav, used for pages where there is no concept of a current project or orgqnization. Additionally, Mongo Nav exports the different nav heights for the above reason- 87e88e6: Make `hosts` and `urls` prop optional in `UserMenu`

### Patch Changes

- da35e55: Add more robust logic to determine whether or not to show payment status
- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 0.8.0

### Minor Changes

- ecbf286: Update UserMenu types such that Component can work independently of <MongoNav />

## 0.7.0

### Minor Changes

- 69a1673: Change Stitch to Realm in ProjectNav and across TS definitions

## 0.6.0

### Minor Changes

- 786ccf1: Adds User Feedback link to `UserMenu`
- 4c16d51: Add fetch to production mode, enabling consumers to get data from cloudHost
- c8d50f2: Rename internal MongoMenu component to UserMenu
- 4c16d51: Design updates to <MongoNav /> based on the latest design spec

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
