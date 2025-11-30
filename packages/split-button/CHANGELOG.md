# @leafygreen-ui/split-button

## 6.3.0

### Minor Changes

- 9ed0058: [LG-5285](https://jira.mongodb.org/browse/LG-5285): pass through and export `MenuItem` and `MenuItemProps` to fix cross-dependency issues with `@leafygreen-ui/menu`

## 6.2.0

### Minor Changes

- c7d6e62: Export `RenderMode` enum

### Patch Changes

- cb31ce6: fix: remove unexpected @emotion imports from icon package dependency
- Updated dependencies [43810b4]
- Updated dependencies [ec4fad8]
- Updated dependencies [cb31ce6]
- Updated dependencies [c7d6e62]
  - @leafygreen-ui/icon@14.7.1
  - @leafygreen-ui/tokens@4.1.0
  - @leafygreen-ui/menu@33.1.0

## 6.1.7

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [9cf3b18]
  - @leafygreen-ui/popover@14.3.1
  - @leafygreen-ui/button@25.1.3
  - @leafygreen-ui/menu@33.0.1

## 6.1.6

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [392b350]
- Updated dependencies [c6b4d3f]
- Updated dependencies [3d64531]
- Updated dependencies [83b0b92]
- Updated dependencies [83b0b92]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/menu@33.0.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/popover@14.3.0
  - @leafygreen-ui/button@25.1.2
  - @leafygreen-ui/hooks@9.2.2

## 6.1.5

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [4ea4f00]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/popover@14.2.0
  - @leafygreen-ui/button@25.1.1
  - @leafygreen-ui/menu@32.1.2

## 6.1.4

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/button@25.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/menu@32.0.2
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/polymorphic@3.0.4
  - @leafygreen-ui/popover@14.0.5
  - @leafygreen-ui/tokens@3.2.4

## 6.1.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/button@25.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/menu@32.0.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/popover@14.0.4
  - @leafygreen-ui/tokens@3.2.3

## 6.1.2

### Patch Changes

- 76b252d: Ensures the containing element establishes a new stacking context (`z-index: 0;`), which ensures the component will correctly render below any high-z components (like `Modal`)

## 6.1.1

### Patch Changes

- Updated dependencies [2d2047c]
- Updated dependencies [4a5d7b8]
  - @leafygreen-ui/menu@32.0.0

## 6.1.0

### Minor Changes

- ee7d80d: [LG-5039](https://jira.mongodb.org/browse/LG-5039): export `InternalSplitButtonProps` and remove explicit `data-testid` type

## 6.0.2

### Patch Changes

- Updated dependencies [2adba55]
  - @leafygreen-ui/button@25.0.0
  - @leafygreen-ui/menu@31.0.1
  - @leafygreen-ui/popover@14.0.3

## 6.0.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/button@24.0.3
  - @leafygreen-ui/hooks@9.1.1
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/menu@31.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.3
  - @leafygreen-ui/popover@14.0.3
  - @leafygreen-ui/tokens@3.1.2

## 6.0.0

### Major Changes

- 164b15f: Updates `data-lgid` and `data-testid` to use scope based test IDs. These test IDs are generated using the helper utility `getLgIds`. For more information [check out the section in the styleguide about getLgIds](https://github.com/mongodb/leafygreen-ui/blob/main/STYLEGUIDE.md#getlgids).

  Removes public exports for:

  - `LGIDs`
  - `LGIDS_CHECKBOX`
  - `LGIDS_FORM_FIELD`
  - `LGIDS_SELECT`
  - `LGIDS_TYPOGRAPHY`

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
  - @leafygreen-ui/menu@31.0.0
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/polymorphic@3.0.2
  - @leafygreen-ui/popover@14.0.2
  - @leafygreen-ui/tokens@3.1.1

## 5.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
- Updated dependencies [9de60ce]
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/polymorphic@3.0.1
  - @leafygreen-ui/button@24.0.1
  - @leafygreen-ui/menu@30.0.1
  - @leafygreen-ui/popover@14.0.1

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
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/polymorphic@3.0.0
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/popover@14.0.0
  - @leafygreen-ui/button@24.0.0
  - @leafygreen-ui/tokens@3.0.0
  - @leafygreen-ui/hooks@9.0.0
  - @leafygreen-ui/icon@14.0.0
  - @leafygreen-ui/menu@30.0.0
  - @leafygreen-ui/lib@15.0.0

## 4.1.15

### Patch Changes

- Updated dependencies [eca6e3fdc]
  - @leafygreen-ui/icon@13.4.0
  - @leafygreen-ui/button@23.1.6
  - @leafygreen-ui/menu@29.0.5

## 4.1.14

### Patch Changes

- Updated dependencies [2d40eba2a]
  - @leafygreen-ui/popover@13.0.11
  - @leafygreen-ui/menu@29.0.4

## 4.1.13

### Patch Changes

- 21bcd4195: Use latest version of `useBackdropClick` hook
- Updated dependencies [21bcd4195]
- Updated dependencies [1dbfb7064]
  - @leafygreen-ui/hooks@8.4.1
  - @leafygreen-ui/icon@13.3.0
  - @leafygreen-ui/leafygreen-provider@4.0.7
  - @leafygreen-ui/menu@29.0.3
  - @leafygreen-ui/popover@13.0.10
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/button@23.1.6

## 4.1.12

### Patch Changes

- Updated dependencies [936364416]
  - @leafygreen-ui/menu@29.0.2

## 4.1.11

### Patch Changes

- Updated dependencies [f2ed4b037]
- Updated dependencies [2ab660926]
- Updated dependencies [fd1696643]
- Updated dependencies [e874aeaf9]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/icon@13.2.2
  - @leafygreen-ui/polymorphic@2.0.9
  - @leafygreen-ui/button@23.1.5
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/menu@29.0.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/popover@13.0.9
  - @leafygreen-ui/tokens@2.12.2

## 4.1.10

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
- Updated dependencies [30b13adec]
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/menu@29.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.6
  - @leafygreen-ui/popover@13.0.8
  - @leafygreen-ui/button@23.1.4
  - @leafygreen-ui/icon@13.2.1
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.8
  - @leafygreen-ui/tokens@2.12.1

## 4.1.9

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5
  - @leafygreen-ui/menu@28.0.10
  - @leafygreen-ui/button@23.1.3
  - @leafygreen-ui/popover@13.0.7

## 4.1.8

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0
  - @leafygreen-ui/button@23.1.2
  - @leafygreen-ui/menu@28.0.9
  - @leafygreen-ui/popover@13.0.6

## 4.1.7

### Patch Changes

- Updated dependencies [0e4c5099b]
- Updated dependencies [a2fd85b23]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/icon@13.2.0
  - @leafygreen-ui/button@23.1.1
  - @leafygreen-ui/hooks@8.3.6
  - @leafygreen-ui/leafygreen-provider@4.0.4
  - @leafygreen-ui/menu@28.0.8
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.7
  - @leafygreen-ui/popover@13.0.5
  - @leafygreen-ui/tokens@2.11.5

## 4.1.6

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [3111a76f3]
  - @leafygreen-ui/button@23.1.0
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/hooks@8.3.5
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/menu@28.0.7
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/polymorphic@2.0.6
  - @leafygreen-ui/popover@13.0.4
  - @leafygreen-ui/tokens@2.11.4

## 4.1.5

### Patch Changes

- Updated dependencies [1501381ee]
  - @leafygreen-ui/button@23.0.0
  - @leafygreen-ui/menu@28.0.6
  - @leafygreen-ui/popover@13.0.3

## 4.1.4

### Patch Changes

- Updated dependencies [d7a715090]
  - @leafygreen-ui/popover@13.0.3
  - @leafygreen-ui/menu@28.0.6
  - @leafygreen-ui/button@22.0.2

## 4.1.3

### Patch Changes

- @leafygreen-ui/menu@28.0.5
- @leafygreen-ui/button@22.0.2

## 4.1.2

### Patch Changes

- @leafygreen-ui/menu@28.0.4

## 4.1.1

### Patch Changes

- Updated dependencies [831718a41]
  - @leafygreen-ui/menu@28.0.3

## 4.1.0

### Minor Changes

- cc9874a9c: Update `data-testid` and `data-lgid` attributes on SplitButton's button, trigger and menu elements.

## 4.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/button@22.0.2
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/hooks@8.3.4
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/menu@28.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/polymorphic@2.0.5
  - @leafygreen-ui/popover@13.0.2
  - @leafygreen-ui/tokens@2.11.3

## 4.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/polymorphic@2.0.4
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/popover@13.0.1
  - @leafygreen-ui/button@22.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/hooks@8.3.3
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/menu@28.0.1
  - @leafygreen-ui/lib@14.0.1

## 4.0.0

### Major Changes

- f5d842764: Update types to reflect what is actually being passed through to the underlying `Menu`
- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- a3d63cb95: Export prop types for components already wrapped in polymorphic types
- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/menu@28.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/button@22.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 3.0.1

### Patch Changes

- 5f9185bee: Fix passing `renderDarkMenu` to the underlying `Menu`
- 4245d16d1: Fix using `SplitButton` as a managed component by calling the `setOpen` function passed as prop when clicking the trigger.

## 3.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): Replaces `usePortal` prop with `renderMode` prop with values of `'inline'`, `'portal'`, and `'top-layer'`. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer.

  See [@leafygreen-ui/menu package 26.0.0 changelog](https://github.com/mongodb/leafygreen-ui/blob/main/packages/menu/CHANGELOG.md#2600) for more info.

  #### Migration guide

  Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

  ##### Old

  ```js
  <SplitButton popoverZIndex={9999} usePortal={false} />
  <SplitButton portalClassName="portal-class" usePortal />
  ```

  ##### New

  ```js
  <SplitButton popoverZIndex={9999} renderMode="inline" />
  <SplitButton portalClassName="portal-class" renderMode="portal" />
  ```

### Patch Changes

- Updated dependencies [04bb887c0]
  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/menu@27.0.0
  - @leafygreen-ui/popover@12.0.0
- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 2.0.0

### Major Changes

- 08112c810: [LG-4630](https://jira.mongodb.org/browse/LG-4630): Apply highlight to first menu item only when opened with keyboard

### Patch Changes

- Updated dependencies [08112c810]
  - @leafygreen-ui/menu@26.0.0

## 1.1.3

### Patch Changes

- e7bc12814: Adds more thorough test coverage for disabled inputs
- Updated dependencies [c1b8b633b]
- Updated dependencies [af96e3967]
- Updated dependencies [fe2483937]
  - @leafygreen-ui/hooks@8.1.4
  - @leafygreen-ui/menu@25.1.1

## 1.1.2

### Patch Changes

- cfa830701: Updates Menu. Resolves failing tests due to Menu update
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/menu@25.0.0
  - @leafygreen-ui/lib@13.6.1

## 1.1.1

### Patch Changes

- 7a901b954: - Uses updated `useInferredPolymorphic` hook & resolves a previously expected error
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0
  - @leafygreen-ui/menu@24.2.1

## 1.1.0

### Minor Changes

- 02e1d77e: Expose `portalRef` in components that use `Popover`:

  - `Combobox`
  - `DatePicker`
  - `GuideCue`
  - `Menu`
  - `NumberInput`
  - `Select`
  - `SplitButton`
  - `Tooltip`

  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/menu@24.2.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 1.0.13

### Patch Changes

- Updated dependencies [1ec45a7e]
- Updated dependencies [1d55530b]
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/menu@24.0.0

## 1.0.12

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/button@21.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/menu@23.0.3
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 1.0.11

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/menu@23.0.2

## 1.0.10

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [dd4f3da8]
- Updated dependencies [2724d6b7]
- Updated dependencies [7c3e6d39]
  - @leafygreen-ui/menu@23.0.0
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 1.0.9

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/menu@22.0.8
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18

## 1.0.8

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/menu@22.0.7
  - @leafygreen-ui/popover@11.0.17

## 1.0.7

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/menu@22.0.6
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 1.0.6

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/menu@22.0.5
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4

## 1.0.5

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/button@21.0.2
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/menu@22.0.4
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3

## 1.0.4

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0

## 1.0.3

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/menu@22.0.3
  - @leafygreen-ui/lib@10.4.1

## 1.0.2

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/menu@22.0.2
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/button@20.2.1
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/tokens@2.1.1

## 1.0.1

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/menu@22.0.1
  - @leafygreen-ui/popover@11.0.11

## 1.0.0

### Major Changes

- 0cd471676: First major release of `SplitButton`

### Patch Changes

- Updated dependencies [d2ce54e2f]
- Updated dependencies [c0699a0df]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/menu@22.0.0
  - @leafygreen-ui/polymorphic@1.3.2
  - @leafygreen-ui/popover@11.0.10
