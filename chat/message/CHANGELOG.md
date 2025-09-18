# @lg-chat/message

## 8.1.0

### Minor Changes

- a9eb172: [LG-5437](https://jira.mongodb.org/browse/LG-5437): add expand/collapse functionality for `MessageLinks` and update to latest `@lg-chat/rich-links`
- a9eb172: [LG-5437](https://jira.mongodb.org/browse/LG-5437): Enhanced Message component with compound components pattern. [Learn more about compound components here](https://github.com/mongodb/leafygreen-ui/blob/main/chat/message/README.md#compound-components)

  - Migrated `MessageActions` from `@lg-chat/message-actions` into this package, now available as `Message.Actions`.
  - Marked `MessageLinks` export as deprecated. Use `Message.Links` instead.
  - Updated `Message.VerifiedBanner` to accept additional HTML props.

### Patch Changes

- a9eb172: [LG-5437](https://jira.mongodb.org/browse/LG-5437): update styles of verified answer banner
- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [a9eb172]
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/banner@10.1.0
  - @lg-chat/rich-links@4.0.0
  - @lg-chat/leafygreen-chat-provider@5.0.2
  - @lg-chat/lg-markdown@4.1.3
  - @lg-chat/message-feedback@7.0.2
  - @lg-chat/message-rating@5.0.2
  - @leafygreen-ui/avatar@3.1.2
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 8.0.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @lg-chat/leafygreen-chat-provider@5.0.1
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/avatar@3.1.1
  - @leafygreen-ui/banner@10.0.5
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1
  - @lg-chat/lg-markdown@4.1.2
  - @lg-chat/rich-links@3.1.2

## 8.0.0

### Major Changes

- d72b413: [LG-5436](https://jira.mongodb.org/browse/LG-5436): make `compact` variant the default and mark `spacious` variant deprecated in `LeafyGreenChatContext`
  [LG-5441](https://jira.mongodb.org/browse/LG-5441): add `assistantName` prop to `LeafyGreenChatContext` and refactor `Message` to use value from context

### Patch Changes

- Updated dependencies [d72b413]
  - @lg-chat/leafygreen-chat-provider@5.0.0

## 7.2.0

### Minor Changes

- 7348708: Create `MessageContext` for each `Message` instance and pass down `messageBody`. This is used to enable copy functionality in the `MessageActions` component.

### Patch Changes

- Updated dependencies [a638649]
  - @leafygreen-ui/tokens@3.2.1

## 7.1.0

### Minor Changes

- d247e6c: [LG-5374](https://jira.mongodb.org/browse/LG-5374): add variant support for when the parent `LeafyGreenChatProvider` has `variant="compact"`

  Mark `lgMessageStyles` and `lgMessageContainerStyles` as `@deprecated`. Mark `componentOverrides` prop `@deprecated`

## 7.0.0

### Patch Changes

- Updated dependencies [82d0ad2]
  - @lg-chat/leafygreen-chat-provider@4.1.0

## 6.1.2

### Patch Changes

- @lg-chat/lg-markdown@4.0.4

## 6.1.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @lg-chat/lg-markdown@4.0.3
  - @lg-chat/rich-links@3.1.1
  - @leafygreen-ui/banner@10.0.3
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 6.1.0

### Minor Changes

- 12ff299: Add the onLinkClick prop to support callbacks whenever a rich link is clicked

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [12ff299]
- Updated dependencies [164b15f]
  - @leafygreen-ui/lib@15.1.0
  - @lg-chat/rich-links@3.1.0
  - @leafygreen-ui/typography@22.0.0
  - @lg-chat/lg-markdown@4.0.2
  - @leafygreen-ui/banner@10.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/tokens@3.1.1

## 6.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @lg-chat/lg-markdown@4.0.1
  - @lg-chat/rich-links@3.0.1
  - @leafygreen-ui/banner@10.0.1
  - @leafygreen-ui/typography@21.0.1

## 6.0.0

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
  - @lg-chat/leafygreen-chat-provider@4.0.0
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/typography@21.0.0
  - @lg-chat/lg-markdown@4.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @lg-chat/rich-links@3.0.0
  - @leafygreen-ui/banner@10.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/lib@15.0.0

## 5.0.17

### Patch Changes

- @lg-chat/lg-markdown@3.0.17

## 5.0.16

### Patch Changes

- @lg-chat/rich-links@2.0.12
- @leafygreen-ui/banner@9.0.13
- @leafygreen-ui/typography@20.1.9
- @lg-chat/lg-markdown@3.0.16

## 5.0.15

### Patch Changes

- @lg-chat/lg-markdown@3.0.15

## 5.0.14

### Patch Changes

- @leafygreen-ui/leafygreen-provider@4.0.7
- @leafygreen-ui/emotion@4.1.1
- @lg-chat/lg-markdown@3.0.14
- @lg-chat/rich-links@2.0.11
- @leafygreen-ui/banner@9.0.12
- @leafygreen-ui/typography@20.1.8

## 5.0.13

### Patch Changes

- @leafygreen-ui/banner@9.0.11
- @lg-chat/lg-markdown@3.0.13

## 5.0.12

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/polymorphic@2.0.9
  - @lg-chat/lg-markdown@3.0.12
  - @lg-chat/rich-links@2.0.10
  - @leafygreen-ui/banner@9.0.10
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 5.0.11

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @lg-chat/lg-markdown@3.0.11
  - @lg-chat/rich-links@2.0.9
  - @leafygreen-ui/banner@9.0.9
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 5.0.10

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/banner@9.0.8
  - @lg-chat/lg-markdown@3.0.10
  - @lg-chat/rich-links@2.0.8
  - @leafygreen-ui/typography@20.1.5

## 5.0.9

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @lg-chat/lg-markdown@3.0.9
  - @lg-chat/rich-links@2.0.7
  - @leafygreen-ui/banner@9.0.7
  - @leafygreen-ui/typography@20.1.4

## 5.0.8

### Patch Changes

- @lg-chat/lg-markdown@3.0.8

## 5.0.7

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @lg-chat/lg-markdown@3.0.7
  - @lg-chat/rich-links@2.0.6
  - @leafygreen-ui/banner@9.0.6
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 5.0.6

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @lg-chat/leafygreen-chat-provider@3.0.2
  - @lg-chat/lg-markdown@3.0.6
  - @lg-chat/rich-links@2.0.5
  - @leafygreen-ui/banner@9.0.5
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 5.0.5

### Patch Changes

- @lg-chat/lg-markdown@3.0.5

## 5.0.4

### Patch Changes

- 796ca2765: - Properly sets dark mode font color when `sourceType` is `text`
  - Adds generated story to test both light and dark modes
- Updated dependencies [4d932fe13]
  - @leafygreen-ui/typography@20.1.1
  - @lg-chat/lg-markdown@3.0.4
  - @lg-chat/rich-links@2.0.4
  - @leafygreen-ui/banner@9.0.4

## 5.0.3

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0
  - @lg-chat/lg-markdown@3.0.3
  - @lg-chat/rich-links@2.0.3
  - @leafygreen-ui/banner@9.0.3

## 5.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-chat/leafygreen-chat-provider@3.0.1
  - @lg-chat/lg-markdown@3.0.2
  - @lg-chat/rich-links@2.0.2
  - @leafygreen-ui/banner@9.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 5.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/typography@20.0.1
  - @lg-chat/lg-markdown@3.0.1
  - @leafygreen-ui/palette@4.1.2
  - @lg-chat/rich-links@2.0.1
  - @leafygreen-ui/banner@9.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/lib@14.0.1

## 5.0.0

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-chat/leafygreen-chat-provider@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/banner@9.0.0
  - @leafygreen-ui/lib@14.0.0
  - @lg-chat/rich-links@2.0.0
  - @lg-chat/lg-markdown@3.0.0
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 4.3.0

### Minor Changes

- f6f49c65e: Adds exports for the MessageLinks component & types

### Patch Changes

- Updated dependencies [82bcd310a]
- Updated dependencies [f91e1ce97]
  - @lg-chat/rich-links@1.2.0
  - @leafygreen-ui/tokens@2.11.0

## 4.2.2

### Patch Changes

- Updated dependencies [4fb369df7]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/typography@19.2.0
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/tokens@2.9.0

## 4.2.1

### Patch Changes

- e5a13a22b: Fixes an import issue with the `links` prop implementation

## 4.2.0

### Minor Changes

- 691877cd: Adds the links prop which renders link data as rich links after the message content

### Patch Changes

- f5da3fe9: The verified answer banner now uses sentence case instead of title case
- Updated dependencies [691877cd]
  - @lg-chat/rich-links@1.0.0

## 4.1.1

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @lg-chat/lg-markdown@2.0.2
  - @leafygreen-ui/banner@8.0.1

## 4.1.0

### Minor Changes

- 24ee033c: Adds verified answer support to Message

### Patch Changes

- Updated dependencies [24ee033c]
  - @leafygreen-ui/banner@8.0.0

## 4.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [9079c0ae]
  - @lg-chat/lg-markdown@2.0.1

## 4.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/leafygreen-chat-provider@2.0.0
  - @lg-chat/lg-markdown@2.0.0

## 3.0.0

### Major Changes

- e3351af: First major release of Feedback components and appropriate changes to other components to support their use

## 2.0.8

### Patch Changes

- Publishing with fresh builds

## 2.0.7

### Patch Changes

- Publishing with new builds

## 2.0.6

### Patch Changes

- 918f25d: MessageContainer now adds overflow-wrap:break-word to handle words long enough to overflow the Message

## 2.0.5

### Patch Changes

- 8bee7e8: MessageContent and MessageContainer are now included in the top level exports.

## 2.0.4

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.2
  - @lg-chat/lg-markdown@1.1.3
  - @lg-chat/message-rating@1.1.3

## 2.0.3

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied
- Updated dependencies [f21765f]
  - @lg-chat/message-rating@1.1.2
  - @lg-chat/lg-markdown@1.1.2

## 2.0.2

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/leafygreen-chat-provider@1.0.1
  - @lg-chat/lg-markdown@1.1.1
  - @lg-chat/message-rating@1.1.1

## 2.0.1

### Patch Changes

- 65464c2: First major release of FixedChatWindow component

## 2.0.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- 799eb22: Adjusts component dependencies
- Updated dependencies
- Updated dependencies [799eb22]
  - @lg-chat/leafygreen-chat-provider@1.0.0
  - @lg-chat/lg-markdown@1.1.0
  - @lg-chat/message-rating@1.1.0

## 1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

### Patch Changes

- Updated dependencies [9cfaea7]
  - @lg-chat/avatar@1.0.0
  - @lg-chat/lg-markdown@1.0.0
  - @lg-chat/message-rating@1.0.0

## 0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
- Updated dependencies [a1c597c]
  - @lg-chat/avatar@0.9.1
  - @lg-chat/lg-markdown@0.9.1
  - @lg-chat/message-rating@0.9.1
