# @leafygreen-ui/leafygreen-provider

## 3.1.12

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/hooks@8.1.3

## 3.1.11

### Patch Changes

- 7f38e78a: Updates test to import `renderHook` from `@leafygreen-ui/testing-lib`
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0

## 3.1.10

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0

## 3.1.9

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0

## 3.1.8

### Patch Changes

- Updated dependencies [fd907503]
  - @leafygreen-ui/hooks@8.0.0

## 3.1.7

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0

## 3.1.6

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/lib@10.4.3

## 3.1.5

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/lib@10.4.2

## 3.1.4

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/lib@10.4.1

## 3.1.3

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/lib@10.3.4

## 3.1.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/lib@10.3.2

## 3.1.1

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [ffb99f417]
  - @leafygreen-ui/hooks@7.5.0

## 3.1.0

### Minor Changes

- b9b09a86: Sets default `usingKeyboard` to `true`. Defaulting to true allows autofocus to display a focus state.

## 3.0.1

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0

## 3.0.0

### Major Changes

- e399f1b9: Nested LeafyGreenProviders now inherit values from ancestor contexts.
  For example:

  ```jsx
  <LeafyGreenProvider darkMode={true}>
    Will have `darkMode == true` and `baseFontSize == 14`[*]
    <LeafyGreenProvider baseFontSize={16}>
      Will have `darkMode == true` and `baseFontSize == 16`
    </LeafyGreenProvider>
  </LeafyGreenProvider>
  ```

  [*] Will be converted to 13 in redesigned components

### Minor Changes

- e399f1b9: Exposes a `setDarkMode` function form the `useDarkMode` hook.

  ```jsx
  <LeafyGreenProvider darkMode={true}>
    <MyComponent />
  </LeafyGreenProvider>
  ...

  const MyComponent = () => {
    const { setDarkMode } = useDarkMode()
    ...
  }
  ```

  Note: If the value of `darkMode` passed into LeafyGreenProvider changes between renders (e.g. from an external `useState` call) then this new value will be used until the next `setDarkMode` call.

## 2.3.5

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/lib@9.5.1

## 2.3.4

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- 58a5a05e: Adds additional test cases
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/hooks@7.3.2

## 2.3.3

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/lib@9.4.2

## 2.3.2

### Patch Changes

- ee3586c9: Resolves a ReferenceError in PopoverContext
- Updated dependencies [95f1e63a]
  - @leafygreen-ui/lib@9.4.1

## 2.3.1

### Patch Changes

- a8be50d8: Fixes a bad build that dropped `useDarkMode` from exports

## 2.3.0

### Minor Changes

- 99e20bb9: Reusable DarkModeProps and darkMode prop for LeafygreenProvider

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0

## 2.2.0

### Minor Changes

- 5f28fce1: Adds popover context to store whether a popover is open or not.

## 2.1.3

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0

## 2.1.2

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0

## 2.1.1

### Patch Changes

- 1fe3e1a3: Updates type of useBaseFontSize from number to `14 | 16` specifically.

## 2.1.0

### Minor Changes

- 857a680a: Add support for setting default portal and scroll containers for popovers in applications.

## 2.0.3

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 2.0.2

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/lib@6.1.1

## 2.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/lib@6.0.1

## 2.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/lib@6.0.0

## 1.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1

## 1.1.3

### Patch Changes

- Updated dependencies [fa55b3d]
  - @leafygreen-ui/hooks@4.0.0

## 1.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0

## 1.1.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 1.1.0

### Minor Changes

- 94ed125: Adds TypographyProvider to LeafygreenProvider to allow applications to set their baseFontSize

## 1.0.0

### Major Changes

- 5c9202d: Introduces support for LeafyGreenProvider for improved focus state management
- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
