# @lg-chat/message-feed

## 7.0.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [a9eb172]
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @lg-chat/message@8.1.0
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @lg-chat/avatar@7.0.2
  - @lg-chat/leafygreen-chat-provider@5.0.2
  - @lg-chat/message-rating@5.0.2
  - @leafygreen-ui/button@25.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/tokens@3.2.4

## 7.0.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @lg-chat/leafygreen-chat-provider@5.0.1
  - @leafygreen-ui/button@25.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @lg-chat/avatar@7.0.1
  - @lg-chat/message@8.0.1
  - @lg-chat/message-rating@5.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [d72b413]
  - @lg-chat/leafygreen-chat-provider@5.0.0
  - @lg-chat/message@8.0.0
  - @lg-chat/avatar@7.0.0
  - @lg-chat/message-rating@5.0.0

## 6.1.0

### Minor Changes

- bb848de: [LG-5377](https://jira.mongodb.org/browse/LG-5377): add variant support for when the parent `LeafyGreenChatProvider` has `variant="compact"`

  Mark `lgMessageFeedStyles` as `@deprecated`

### Patch Changes

- Updated dependencies [d247e6c]
- Updated dependencies [f2ecd1a]
  - @lg-chat/message@7.1.0
  - @leafygreen-ui/icon@14.1.1

## 6.0.0

### Patch Changes

- Updated dependencies [82d0ad2]
  - @lg-chat/leafygreen-chat-provider@4.1.0
  - @lg-chat/avatar@6.0.0
  - @lg-chat/message@7.0.0

## 5.0.4

### Patch Changes

- Updated dependencies [2adba55]
  - @leafygreen-ui/button@25.0.0
  - @lg-chat/message@6.1.2

## 5.0.3

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @lg-chat/avatar@5.0.3
  - @lg-chat/message@6.1.1
  - @lg-chat/message-rating@4.0.3
  - @leafygreen-ui/button@24.0.3
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.2

## 5.0.2

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [12ff299]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @lg-chat/message@6.1.0
  - @leafygreen-ui/button@24.0.2
  - @leafygreen-ui/icon@14.1.0
  - @lg-chat/avatar@5.0.2
  - @lg-chat/message-rating@4.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.1

## 5.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/button@24.0.1
  - @lg-chat/avatar@5.0.1
  - @lg-chat/message@6.0.1
  - @lg-chat/message-rating@4.0.1

## 5.0.0

### Major Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @lg-chat/leafygreen-chat-provider@4.0.0
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @lg-chat/message-rating@4.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/button@24.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/icon@14.0.0
  - @lg-chat/message@6.0.0
  - @leafygreen-ui/lib@15.0.0
  - @lg-chat/avatar@5.0.0

## 4.1.15

### Patch Changes

- @lg-chat/message@5.0.17

## 4.1.14

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @lg-chat/message-rating@3.0.12
  - @leafygreen-ui/button@23.1.6
  - @lg-chat/message@5.0.16
  - @lg-chat/avatar@4.0.11

## 4.1.13

### Patch Changes

- @lg-chat/message@5.0.15

## 4.1.12

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @lg-chat/message-rating@3.0.11
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/button@23.1.6
  - @lg-chat/message@5.0.14
  - @lg-chat/avatar@4.0.10

## 4.1.11

### Patch Changes

- @lg-chat/message@5.0.13

## 4.1.10

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @lg-chat/avatar@4.0.9
  - @lg-chat/message@5.0.12
  - @lg-chat/message-rating@3.0.10
  - @leafygreen-ui/button@23.1.5
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2

## 4.1.9

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @lg-chat/message-rating@3.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @lg-chat/avatar@4.0.8
  - @lg-chat/message@5.0.11
  - @leafygreen-ui/button@23.1.4
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1

## 4.1.8

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @lg-chat/avatar@4.0.7
  - @lg-chat/message@5.0.10
  - @lg-chat/message-rating@3.0.8
  - @leafygreen-ui/button@23.1.3

## 4.1.7

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @lg-chat/avatar@4.0.6
  - @lg-chat/message@5.0.9
  - @lg-chat/message-rating@3.0.7
  - @leafygreen-ui/button@23.1.2

## 4.1.6

### Patch Changes

- @lg-chat/message@5.0.8

## 4.1.5

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @lg-chat/avatar@4.0.5
  - @lg-chat/message@5.0.7
  - @lg-chat/message-rating@3.0.6
  - @leafygreen-ui/button@23.1.1
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.5

## 4.1.4

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [3111a76f3]
  - @lg-chat/avatar@4.0.4
  - @lg-chat/leafygreen-chat-provider@3.0.2
  - @lg-chat/message@5.0.6
  - @lg-chat/message-rating@3.0.5
  - @leafygreen-ui/button@23.1.0
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4

## 4.1.3

### Patch Changes

- Updated dependencies [22d576394]
- Updated dependencies [1501381ee]
  - @lg-chat/avatar@4.0.3
  - @leafygreen-ui/button@23.0.0
  - @lg-chat/message@5.0.5

## 4.1.2

### Patch Changes

- Updated dependencies [796ca2765]
  - @lg-chat/message@5.0.4
  - @lg-chat/message-rating@3.0.4
  - @leafygreen-ui/button@22.0.2

## 4.1.1

### Patch Changes

- @lg-chat/message@5.0.3
- @lg-chat/message-rating@3.0.3
- @leafygreen-ui/button@22.0.2

## 4.1.0

### Minor Changes

- ff9299333: Improves autoscroll behavior. If a user scrolls up, autoscroll turns off and instead we show a "scroll to latest" button.

## 4.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-chat/avatar@4.0.2
  - @lg-chat/leafygreen-chat-provider@3.0.1
  - @lg-chat/message@5.0.2
  - @lg-chat/message-rating@3.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3

## 4.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @lg-chat/message-rating@3.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @lg-chat/message@5.0.1
  - @leafygreen-ui/lib@14.0.1
  - @lg-chat/avatar@4.0.1

## 4.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-chat/leafygreen-chat-provider@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/lib@14.0.0
  - @lg-chat/avatar@4.0.0
  - @lg-chat/message@5.0.0
  - @lg-chat/message-rating@3.0.0
  - @leafygreen-ui/tokens@2.11.1

## 3.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [9079c0ae]
  - @lg-chat/message-rating@2.0.1
  - @lg-chat/message@4.0.1
  - @lg-chat/avatar@3.0.1

## 3.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/leafygreen-chat-provider@2.0.0
  - @lg-chat/message-rating@2.0.0
  - @lg-chat/message@4.0.0
  - @lg-chat/avatar@3.0.0

## 2.0.8

### Patch Changes

- e3351af: First major release of Feedback components and appropriate changes to other components to support their use
- Updated dependencies [e3351af]
  - @lg-chat/message@3.0.0
  - @lg-chat/message-rating@1.2.0

## 2.0.7

### Patch Changes

- Publishing with fresh builds
- Updated dependencies
  - @lg-chat/message@2.0.8
  - @lg-chat/avatar@2.0.6

## 2.0.6

### Patch Changes

- 35217ea: MessageFeed now correctly positions MessagePrompts for all breakpoints
- Updated dependencies
  - @lg-chat/message@2.0.7
  - @lg-chat/avatar@2.0.5

## 2.0.5

### Patch Changes

- 89ffc5b: DisclaimerText now utilizes the `children` prop properly. The DisclaimerText component also styles itself appropriately when rendered inside of a MessageFeed component.
- Updated dependencies [798bc2a]
- Updated dependencies [918f25d]
  - @lg-chat/avatar@2.0.4
  - @lg-chat/message@2.0.6

## 2.0.4

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/avatar@2.0.3
  - @lg-chat/leafygreen-chat-provider@1.0.2
  - @lg-chat/message@2.0.4
  - @lg-chat/message-rating@1.1.3

## 2.0.3

### Patch Changes

- 3376364: MessageFeed now fills full width of its container
- f21765f: Phase 2 minor style changes are now applied
- Updated dependencies [f21765f]
  - @lg-chat/message-rating@1.1.2
  - @lg-chat/message@2.0.3
  - @lg-chat/avatar@2.0.2

## 2.0.2

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/leafygreen-chat-provider@1.0.1
  - @lg-chat/message@2.0.2
  - @lg-chat/message-rating@1.1.1

## 2.0.1

### Patch Changes

- 65464c2: First major release of FixedChatWindow component
- Updated dependencies [65464c2]
  - @lg-chat/message@2.0.1

## 2.0.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- 799eb22: Adjusts component dependencies
- Updated dependencies
- Updated dependencies [799eb22]
  - @lg-chat/leafygreen-chat-provider@1.0.0
  - @lg-chat/message@2.0.0
  - @lg-chat/message-rating@1.1.0

## 1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

### Patch Changes

- Updated dependencies [9cfaea7]
  - @lg-chat/avatar@1.0.0
  - @lg-chat/message@1.0.0
  - @lg-chat/message-rating@1.0.0

## 0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
- Updated dependencies [a1c597c]
  - @lg-chat/avatar@0.9.1
  - @lg-chat/message@0.9.1
  - @lg-chat/message-rating@0.9.1
