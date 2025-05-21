# @leafygreen-ui/avatar

## 2.0.10

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0

## 2.0.9

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1

## 2.0.8

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/logo@10.0.6
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2

## 2.0.7

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/logo@10.0.5
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1

## 2.0.6

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5

## 2.0.5

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0

## 2.0.4

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/logo@10.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.5

## 2.0.3

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/logo@10.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/logo@10.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/logo@10.0.1
  - @leafygreen-ui/lib@14.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/logo@10.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 1.1.0

### Minor Changes

- e0578023d: Font is now bolded when the size is `'xlarge'`

## 1.0.2

### Patch Changes

- 9fad8d3d3: Prepares Avatar component for mongodb.design
- Updated dependencies [fd0e5977d]
  - @leafygreen-ui/palette@4.1.1

## 1.0.1

### Patch Changes

- 34ac7340: Avatar `text` prop can now be `null` even when `format === 'text'`, allowing for a more seamless integration with the `getInitials` function. If `text === null`, the Avatar will fall back to `Icon` format.
- Updated dependencies [7bc4fcde]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 1.0.0

### Major Changes

- ae44834e: Moves base Avatar component to `@leafygreen-ui` from `@lg-chat`.

  Updates supported sizes, and renames `variant` prop to `format`.

  Avatar no longer calls `getInitials` internally, and will render the first two characters of the `text` prop. `getInitials` must now be called external to Avatar, and one of its results (`initials`, `givenInitial` or `surnameInitial`) passed into the `text` prop.

### Patch Changes

- Updated dependencies [ae44834e]
  - @leafygreen-ui/icon@12.4.0

## Forked from `@lg-chat/avatar` at v3.0.1

## @lg-chat/avatar@3.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0

## @lg-chat/avatar@3.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/leafygreen-chat-provider@2.0.0

## @lg-chat/avatar@2.0.6

### Patch Changes

- Publishing with fresh builds

## @lg-chat/avatar@2.0.5

### Patch Changes

- Publishing with new builds

## @lg-chat/avatar@2.0.4

### Patch Changes

- 798bc2a: UserAvatar is now responsive when a name prop is not provided.

## @lg-chat/avatar@2.0.3

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.2

## @lg-chat/avatar@2.0.2

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied

## @lg-chat/avatar@2.0.1

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/leafygreen-chat-provider@1.0.1

## @lg-chat/avatar@2.0.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.0

## @lg-chat/avatar@1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

## @lg-chat/avatar@0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
