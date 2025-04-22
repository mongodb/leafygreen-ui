# @lg-chat/fixed-chat-window

## 3.0.14

### Patch Changes

- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/popover@13.0.10
  - @leafygreen-ui/emotion@4.1.1
  - @lg-chat/chat-window@3.0.13
  - @lg-chat/title-bar@3.0.13
  - @leafygreen-ui/typography@20.1.8

## 3.0.13

### Patch Changes

- @lg-chat/title-bar@3.0.12
- @lg-chat/chat-window@3.0.12

## 3.0.12

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @lg-chat/chat-window@3.0.11
  - @lg-chat/title-bar@3.0.11
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/popover@13.0.9
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 3.0.11

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/popover@13.0.8
  - @lg-chat/chat-window@3.0.10
  - @lg-chat/title-bar@3.0.10
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 3.0.10

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @lg-chat/title-bar@3.0.9
  - @lg-chat/chat-window@3.0.9
  - @leafygreen-ui/popover@13.0.7
  - @leafygreen-ui/typography@20.1.5

## 3.0.9

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @lg-chat/chat-window@3.0.8
  - @lg-chat/title-bar@3.0.8
  - @leafygreen-ui/popover@13.0.6
  - @leafygreen-ui/typography@20.1.4

## 3.0.8

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @lg-chat/chat-window@3.0.7
  - @lg-chat/title-bar@3.0.7
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/popover@13.0.5
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 3.0.7

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @lg-chat/chat-window@3.0.6
  - @lg-chat/title-bar@3.0.6
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/popover@13.0.4
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 3.0.6

### Patch Changes

- @lg-chat/chat-window@3.0.5
- @lg-chat/title-bar@3.0.5
- @leafygreen-ui/popover@13.0.3

## 3.0.5

### Patch Changes

- Updated dependencies [4d932fe13]
- Updated dependencies [d7a715090]
  - @leafygreen-ui/typography@20.1.1
  - @leafygreen-ui/popover@13.0.3
  - @lg-chat/title-bar@3.0.4
  - @lg-chat/chat-window@3.0.4

## 3.0.4

### Patch Changes

- Updated dependencies [eb108e93b]
  - @leafygreen-ui/typography@20.1.0
  - @lg-chat/title-bar@3.0.3
  - @lg-chat/chat-window@3.0.3

## 3.0.3

### Patch Changes

- 5f9bef735: [LG-4759](https://jira.mongodb.org/browse/LG-4759): The `@leafygreen-ui/popover` dependency was inadvertently bumped to v12+ which led to a regression in the scroll to end on initial render. This change forward-fixes the regression by rendering the `FixedChatWindow` with `renderMode="portal"` instead of `renderMode="top-layer"`.

## 3.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-chat/chat-window@3.0.2
  - @lg-chat/title-bar@3.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/popover@13.0.2
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 3.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/typography@20.0.1
  - @lg-chat/chat-window@3.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/popover@13.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @lg-chat/title-bar@3.0.1
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @lg-chat/chat-window@3.0.0
  - @lg-chat/title-bar@3.0.0
  - @leafygreen-ui/tokens@2.11.1

## 2.0.3

### Patch Changes

- cffc9d9f8: Use a more visible color for the ChatTrigger sparkle icon in dark mode.
- Updated dependencies [2f05b61ab]
- Updated dependencies [94b4e7fa1]
- Updated dependencies [eb80fd3cb]
  - @leafygreen-ui/icon@12.6.0
  - @leafygreen-ui/typography@19.3.0

## 2.0.2

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @lg-chat/title-bar@2.0.2

## 2.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [9079c0ae]
- Updated dependencies [74057388]
  - @lg-chat/chat-window@2.0.1
  - @lg-chat/title-bar@2.0.1
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/typography@18.2.3

## 2.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/chat-window@2.0.0
  - @lg-chat/title-bar@2.0.0

## 1.1.2

### Patch Changes

- e3351af: First major release of Feedback components and appropriate changes to other components to support their use
- Updated dependencies [e3351af]
  - @lg-chat/chat-window@1.0.5

## 1.1.1

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/chat-window@1.0.4
  - @lg-chat/title-bar@1.1.4

## 1.1.0

### Minor Changes

- 3376364: FixedChatWindow now utilizes Popover to render its open state

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied
- Updated dependencies [fdc18ff]
- Updated dependencies [f21765f]
  - @lg-chat/chat-window@1.0.3
  - @lg-chat/title-bar@1.1.3

## 1.0.1

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/chat-window@1.0.2
  - @lg-chat/title-bar@1.1.2

## 1.0.0

### Major Changes

- 65464c2: First major release of FixedChatWindow component

### Patch Changes

- Updated dependencies [65464c2]
  - @lg-chat/chat-window@1.0.1
  - @lg-chat/title-bar@1.1.1
