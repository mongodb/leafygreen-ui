# @lg-chat/input-bar

## 11.0.2

### Patch Changes

- 8976ab2: Remove redundant `z-index: 2;` in `InputBar` content wrapping node.

## 11.0.1

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [c6b4d3f]
- Updated dependencies [888a37d]
- Updated dependencies [83b0b92]
- Updated dependencies [83b0b92]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/search-input@6.1.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/typography@22.2.0
  - @leafygreen-ui/popover@14.3.0
  - @leafygreen-ui/avatar@3.1.4
  - @leafygreen-ui/badge@10.2.2
  - @leafygreen-ui/banner@10.2.2
  - @leafygreen-ui/button@25.1.2
  - @leafygreen-ui/hooks@9.2.2
  - @leafygreen-ui/icon-button@17.1.2
  - @leafygreen-ui/input-option@4.1.2

## 11.0.0

### Minor Changes

- 71ff953: [LG-5600](https://jira.mongodb.org/browse/LG-5600)
  Fix send button disabled logic: the send button now remains enabled during loading state (even with empty message body) to allow users to stop the request. The `disabled` and `disableSend` props still take precedence.

  Add `onClickStopButton` prop to handle stop actions during loading state. When triggered, the previous message body is restored to the input field (similar to error state behavior).

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- 71ff953: Remove console warning when `shouldRenderGradient` prop is true to avoid it requiring an explicit false value.
- bd83675: Fix disclaimer text alignment to be centered below input
- Updated dependencies [bd83675]
- Updated dependencies [f3a8bdc]
- Updated dependencies [4ea4f00]
- Updated dependencies [c8559f3]
  - @lg-chat/leafygreen-chat-provider@5.1.0
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/popover@14.2.0
  - @leafygreen-ui/input-option@4.1.1
  - @leafygreen-ui/search-input@6.0.7
  - @leafygreen-ui/icon-button@17.1.1
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/avatar@3.1.3
  - @leafygreen-ui/banner@10.2.1
  - @leafygreen-ui/button@25.1.1
  - @leafygreen-ui/badge@10.2.1

## 10.1.0

### Minor Changes

- 366e851: [LG-5527](https://jira.mongodb.org/browse/LG-5527): add legal disclaimer text with link below input

### Patch Changes

- Updated dependencies [ff6b87e]
  - @leafygreen-ui/lib@15.5.0

## 10.0.5

### Patch Changes

- 3471b94: Update React ref objects to be explicitly nullable
- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- 74a2c42: Use `assistantName` value from `LeafyGreenChatContext` for loading message
- Updated dependencies [1a5c69f]
- Updated dependencies [aeb3b3f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/icon-button@17.0.6
  - @leafygreen-ui/search-input@6.0.6
  - @leafygreen-ui/hooks@9.1.4
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/typography@22.1.3
  - @leafygreen-ui/emotion@5.0.3
  - @leafygreen-ui/popover@14.0.6
  - @leafygreen-ui/banner@10.1.1
  - @leafygreen-ui/badge@10.1.3
  - @leafygreen-ui/polymorphic@3.1.0

## 10.0.4

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
  - @lg-chat/leafygreen-chat-provider@5.0.2
  - @leafygreen-ui/avatar@3.1.2
  - @leafygreen-ui/badge@10.1.2
  - @leafygreen-ui/button@25.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/input-option@4.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/popover@14.0.5
  - @leafygreen-ui/search-input@6.0.5
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/typography@22.1.2

## 10.0.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @lg-chat/leafygreen-chat-provider@5.0.1
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/avatar@3.1.1
  - @leafygreen-ui/badge@10.1.1
  - @leafygreen-ui/banner@10.0.5
  - @leafygreen-ui/button@25.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/icon-button@17.0.4
  - @leafygreen-ui/input-option@4.0.4
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/popover@14.0.4
  - @leafygreen-ui/search-input@6.0.4
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/typography@22.1.1

## 10.0.2

### Patch Changes

- 0abf641: Temporarily inline `PRIMARY_BUTTON_INTERACTIVE_GREEN` in `InputBarSendButton.styles` to avoid import/type issues with `@leafygreen-ui/button`.
- 1b1ca17: [LG-5470](https://jira.mongodb.org/browse/LG-5470): Fix send button being enabled when only whitespace is entered. The send button now properly trims input before checking if it should be enabled.
- Updated dependencies [7b49fcf]
  - @leafygreen-ui/tokens@3.2.2

## 10.0.1

### Patch Changes

- d3c0f1f: [LG-5431](https://jira.mongodb.org/browse/LG-5431): Fix `PRIMARY_BUTTON_INTERACTIVE_GREEN` constant export and transpilation
- Updated dependencies [d3c0f1f]
  - @leafygreen-ui/button@25.0.2

## 10.0.0

### Patch Changes

- Updated dependencies [d72b413]
  - @lg-chat/leafygreen-chat-provider@5.0.0

## 9.2.0

### Minor Changes

- f06b7b7: [LG-5413](https://jira.mongodb.org/browse/LG-5413): add `textareaRef` prop to expose access to textarea element

## 9.1.0

### Minor Changes

- c6ee34b: [LG-5368](https://jira.mongodb.org/browse/LG-5368): add variant support for when the parent `LeafyGreenChatProvider` has `variant="compact"`

  Mark `lgInputBarStyles` as `@deprecated`

### Patch Changes

- Updated dependencies [56c0d3b]
- Updated dependencies [56c0d3b]
- Updated dependencies [56c0d3b]
  - @leafygreen-ui/typography@22.1.0
  - @leafygreen-ui/tokens@3.2.0
  - @leafygreen-ui/banner@10.0.4
  - @leafygreen-ui/button@25.0.1
  - @leafygreen-ui/badge@10.0.4

## 9.0.0

### Patch Changes

- 8db14f9: Replace gray icon with `AssistantAvatar` with gradient
- e8f53ec: [LG-5358](https://jira.mongodb.org/browse/LG-5358): fixes issue where `ctrl + enter` and `shift + enter` was unexpectedly adding new line to the end of the message body. Now, doing so will add the new line at the cursor position.
- Updated dependencies [3e8fbd7]
- Updated dependencies [82d0ad2]
  - @leafygreen-ui/avatar@3.1.0
  - @lg-chat/leafygreen-chat-provider@4.1.0

## 8.0.5

### Patch Changes

- Updated dependencies [2adba55]
  - @leafygreen-ui/button@25.0.0
  - @leafygreen-ui/popover@14.0.3

## 8.0.4

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/badge@10.0.3
  - @leafygreen-ui/button@24.0.3
  - @leafygreen-ui/hooks@9.1.1
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/input-option@4.0.3
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/popover@14.0.3
  - @leafygreen-ui/search-input@6.0.3
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/typography@22.0.1

## 8.0.3

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [3bef1e7]
- Updated dependencies [164b15f]
- Updated dependencies [164b15f]
- Updated dependencies [1eafbb5]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/hooks@9.1.0
  - @leafygreen-ui/button@24.0.2
  - @leafygreen-ui/typography@22.0.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/badge@10.0.2
  - @leafygreen-ui/input-option@4.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/popover@14.0.2
  - @leafygreen-ui/search-input@6.0.2
  - @leafygreen-ui/tokens@3.1.1

## 8.0.2

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @leafygreen-ui/button@24.0.1
  - @leafygreen-ui/badge@10.0.1
  - @leafygreen-ui/input-option@4.0.1
  - @leafygreen-ui/popover@14.0.1
  - @leafygreen-ui/search-input@6.0.1
  - @leafygreen-ui/typography@21.0.1

## 8.0.1

### Patch Changes

- 65ab9c739: [LG-5143](https://jira.mongodb.org/browse/LG-5143): fix `InputBar` to ensure internal state is controlled when `textareaProps.value` and `textareaProps.onChange` are provided

## 8.0.0

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
  - @leafygreen-ui/input-option@4.0.0
  - @leafygreen-ui/search-input@6.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/typography@21.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/popover@14.0.0
  - @leafygreen-ui/button@24.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/badge@10.0.0
  - @leafygreen-ui/hooks@9.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/lib@15.0.0

## 7.0.16

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/button@23.1.6
  - @leafygreen-ui/input-option@3.0.12
  - @leafygreen-ui/search-input@5.0.14
  - @leafygreen-ui/typography@20.1.9

## 7.0.15

### Patch Changes

- Updated dependencies [2d40eba2a]
  - @leafygreen-ui/popover@13.0.11
  - @leafygreen-ui/search-input@5.0.13

## 7.0.14

### Patch Changes

- Updated dependencies [f9fa0fe83]
  - @leafygreen-ui/badge@9.0.10
  - @leafygreen-ui/emotion@4.1.1

## 7.0.13

### Patch Changes

- 21bcd4195: Use latest version of `useBackdropClick` hook
- Updated dependencies [21bcd4195]
- Updated dependencies [21bcd4195]
- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/hooks@8.4.1
  - @leafygreen-ui/search-input@5.0.12
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/popover@13.0.10
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/button@23.1.6
  - @leafygreen-ui/input-option@3.0.11
  - @leafygreen-ui/typography@20.1.8
  - @leafygreen-ui/badge@9.0.9

## 7.0.12

### Patch Changes

- @leafygreen-ui/search-input@5.0.11

## 7.0.11

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/badge@9.0.8
  - @leafygreen-ui/button@23.1.5
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/input-option@3.0.10
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/popover@13.0.9
  - @leafygreen-ui/search-input@5.0.10
  - @leafygreen-ui/tokens@2.12.2
  - @leafygreen-ui/typography@20.1.7

## 7.0.10

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/popover@13.0.8
  - @leafygreen-ui/search-input@5.0.9
  - @leafygreen-ui/badge@9.0.7
  - @leafygreen-ui/button@23.1.4
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/input-option@3.0.9
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1
  - @leafygreen-ui/typography@20.1.6

## 7.0.9

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/search-input@5.0.8
  - @leafygreen-ui/badge@9.0.6
  - @leafygreen-ui/button@23.1.3
  - @leafygreen-ui/input-option@3.0.8
  - @leafygreen-ui/popover@13.0.7
  - @leafygreen-ui/typography@20.1.5

## 7.0.8

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/badge@9.0.5
  - @leafygreen-ui/button@23.1.2
  - @leafygreen-ui/input-option@3.0.7
  - @leafygreen-ui/popover@13.0.6
  - @leafygreen-ui/search-input@5.0.7
  - @leafygreen-ui/typography@20.1.4

## 7.0.7

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/badge@9.0.4
  - @leafygreen-ui/button@23.1.1
  - @leafygreen-ui/hooks@8.3.6
  - @leafygreen-ui/input-option@3.0.6
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/popover@13.0.5
  - @leafygreen-ui/search-input@5.0.6
  - @leafygreen-ui/tokens@2.11.5
  - @leafygreen-ui/typography@20.1.3

## 7.0.6

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [3111a76f3]
  - @lg-chat/leafygreen-chat-provider@3.0.2
  - @leafygreen-ui/badge@9.0.3
  - @leafygreen-ui/button@23.1.0
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/hooks@8.3.5
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/input-option@3.0.5
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/popover@13.0.4
  - @leafygreen-ui/search-input@5.0.5
  - @leafygreen-ui/tokens@2.11.4
  - @leafygreen-ui/typography@20.1.2

## 7.0.5

### Patch Changes

- Updated dependencies [1501381ee]
  - @leafygreen-ui/button@23.0.0
  - @leafygreen-ui/popover@13.0.3

## 7.0.4

### Patch Changes

- Updated dependencies [4d932fe13]
- Updated dependencies [d7a715090]
  - @leafygreen-ui/typography@20.1.1
  - @leafygreen-ui/popover@13.0.3
  - @leafygreen-ui/input-option@3.0.4
  - @leafygreen-ui/search-input@5.0.4
  - @leafygreen-ui/button@22.0.2

## 7.0.3

### Patch Changes

- Updated dependencies [eb108e93b]
- Updated dependencies [eb108e93b]
  - @leafygreen-ui/input-option@3.0.3
  - @leafygreen-ui/typography@20.1.0
  - @leafygreen-ui/search-input@5.0.3
  - @leafygreen-ui/button@22.0.2

## 7.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-chat/leafygreen-chat-provider@3.0.1
  - @leafygreen-ui/badge@9.0.2
  - @leafygreen-ui/button@22.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/hooks@8.3.4
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/input-option@3.0.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/popover@13.0.2
  - @leafygreen-ui/search-input@5.0.2
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/typography@20.0.2

## 7.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/input-option@3.0.1
  - @leafygreen-ui/search-input@5.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/typography@20.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/popover@13.0.1
  - @leafygreen-ui/button@22.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/badge@9.0.1
  - @leafygreen-ui/hooks@8.3.3
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/input-option@3.0.0
  - @leafygreen-ui/search-input@5.0.0
  - @lg-chat/leafygreen-chat-provider@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/button@22.0.0
  - @leafygreen-ui/badge@9.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 6.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): `InputBar` renders results menu in top layer using popover API. As a result, the following props are deprecated and removed:
  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `scrollContainer`
  - `usePortal`

### Patch Changes

- Updated dependencies [04bb887c0]

  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/popover@12.0.0
  - @leafygreen-ui/search-input@4.0.0

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 5.1.0

### Minor Changes

- 79f0e7696: Add `shouldRenderHotkeyIndicator` prop to InputBar component which determines if hotkey indicator is rendered

## 5.0.0

### Major Changes

- cfa830701: Updates `SuggestedPrompt`.
  - Removes custom option styles in favor of consistent option styles from `InputOptionContent`

### Patch Changes

- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/input-option@2.0.0
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/search-input@3.1.2
  - @leafygreen-ui/typography@19.2.1

## 4.0.4

### Patch Changes

- Updated dependencies [4fb369df7]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/typography@19.2.0
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0
  - @leafygreen-ui/input-option@1.1.4
  - @leafygreen-ui/search-input@3.1.1

## 4.0.3

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/input-option@1.1.3
  - @leafygreen-ui/search-input@3.0.1

## 4.0.2

### Patch Changes

- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [f630c718]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/search-input@3.0.0
  - @leafygreen-ui/palette@4.0.10

## 4.0.1

### Patch Changes

- 9079c0ae: Upgrades internal lg components
- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/search-input@2.1.5
  - @leafygreen-ui/typography@18.2.3

## 4.0.0

### Major Changes

- 36070800: First public release of `@lg-chat` components

### Patch Changes

- Updated dependencies [36070800]
  - @lg-chat/leafygreen-chat-provider@2.0.0

## 3.2.6

### Patch Changes

- InputBar should now correctly dispatch change events for ctrl+enter and shift+enter

## 3.2.1

### Patch Changes

- 45113f5: Release with new build

## 3.2.0

### Minor Changes

- 5c72047: InputBar now correctly applies the dropdownFooterSlot prop
- 4ba0d3e: InputBar now initializes correctly based on the value passed to `textareaProps`

### Patch Changes

- 802c4c8: Bump version of LG `"@leafygreen-ui/search-input"` to `v2.1.2`. This version includes an updated dark mode dropdown border color of `gray.dark2`.

## 3.1.3

### Patch Changes

- Publishing with fresh builds

## 3.1.2

### Patch Changes

- Publishing with new builds

## 3.1.1

### Patch Changes

- InputBar now leverages new updates to SearchResultMenu that allow it to consume props for its Popover and a custom footer slot

## 3.1.0

### Minor Changes

- b13b4c8: InputBar now exposes props to be passed to the Popover used inside the dropdown

### Patch Changes

- 85d15b8: InputBar now leverages new updates to SearchResultMenu that allow it to consume props for its Popover and a custom footer slot

## 3.0.1

### Patch Changes

- Empty patch bump to include missing builds
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.2

## 3.0.0

### Major Changes

- 656354f: InputBar now supports suggested prompts with dropdown interaction

### Minor Changes

- 48748dd: InputBar now supports a `dropdownFooterSlot` prop to render content under suggested prompts

### Patch Changes

- f21765f: Phase 2 minor style changes are now applied

## 2.0.1

### Patch Changes

- 1369d9f: Empty patch version to trigger new Artifactory publish
- Updated dependencies [1369d9f]
  - @lg-chat/leafygreen-chat-provider@1.0.1

## 2.0.0

### Minor Changes

- Responsiveness behavior with LeafyGreenChatProvider

### Patch Changes

- 799eb22: Adjusts component dependencies
- Updated dependencies
  - @lg-chat/leafygreen-chat-provider@1.0.0

## 1.0.0

### Major Changes

- 9cfaea7: MVP Release of all LG Chat packages

## 0.9.1

### Patch Changes

- a1c597c: Testing initial publish of LG Chat library
