# @leafygreen-ui/lib

## 13.7.0

### Minor Changes

- 4c04aa0ee: Creates utility types `Only`, `ExclusiveUnion` and `ValuesOf`

## 13.6.1

### Patch Changes

- cfa830701: Fixes `RecursiveRecord` type

## 13.6.0

### Minor Changes

- 7a901b954: Adds `PartialRequired` and `Optional` types

## 13.5.0

### Minor Changes

- 7bc4fcde: Adds `RecursiveRecord` type

## 13.4.0

### Minor Changes

- c3906f78: Adds `LgIdProps` which exports an interface to support `['data-lgid']?: string;`, which can be extended inside components props.

## 13.3.0

### Minor Changes

- 66df9ab8: Creates `Mutable` utility type

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`

## 13.2.1

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.

## 13.2.0

### Minor Changes

- ffd11f24: Updates Typescript signature of `createSyntheticEvent`
- ffd11f24: - Creates new utility functions
  - `rollover`
  - `truncateStart`
  - `cloneReverse`
  - `isDefined`
  - `isZeroLike` & `isNotZeroLike`

### Patch Changes

- ffd11f24: Updates `target` type in `createSyntheticEvent` to extend `EventTarget`

## 13.1.0

### Minor Changes

- 99848a0f: Adds `pickAndOnit` helper function

## 13.0.0

### Major Changes

- dd4f3da8: Update mapped value of `Space` in `keyMap` object from `space` to `' '`.

## 12.0.0

### Major Changes

- 3a9b274d: Updates `keyMap` object to map keys to event `key` properties rather than `keyCode` properties, which are deprecated.

## 11.0.0

### Major Changes

- 4fcf2e94: Modified the React peerDependency to ensure compatibility with either version 17 or 18.

### Patch Changes

- 4fcf2e94: Updates helper function, `isComponentType` and updates `ExtendedComponentProps` type.
- 4fcf2e94: Updates types with `React.PropsWithChildren`

## 10.4.3

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 10.4.2

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 10.4.1

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 10.4.0

### Minor Changes

- 76161cf0: Adds types for GeneratedStory decorator
- 76161cf0: Exports ExtendedComponentProps & InstanceDecorator types. Adds `XP` (extra props) to StoryMetaType generic signature

### Patch Changes

- 76161cf0: Ensures `XP` is passed to the `StoryFn` props in `StoryType`.
  Exports `PlayFn` type

## 10.3.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- 0cd471676: Updates `isComponentType` to also check for a displayName inside render

## 10.3.3

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- cf00160ec: Updates TSDocs
- 111b680c5: Marks type of `storybookArgTypes` as `const`.
  Removes some default props from `StoryMeta`.
  `StoryMeta` no longer excludes `children` controls by default.

## 10.3.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 10.3.1

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies

## 10.3.0

### Minor Changes

- c727d8295: Adds `prop-types` as an explicit dependency of package

## 10.2.2

### Patch Changes

- 26e341a0b: Minor type fixes to `StoryMeta` function

## 10.2.1

### Patch Changes

- 2e8a572db: Improves array handling on StoryMeta factory function. Adds tests for factory function
- 4ccc353e7: Adds 'allEqual`util function`. Also removes circular dependency in `getTheme`.
- 4ccc353e7: Excludes a few more storybook controls

## 10.2.0

### Minor Changes

- 0541bd776: Exports `StoryMeta` interface and factory function for generating Storybook default exports that are compatible with the new mongodb.design architecture
- ec2a3d66d: Adds `createSyntheticEvent` to create a React SyntheticEvent

## 10.1.0

### Minor Changes

- 64eee134d: Adds additional storybook exports from `lib`

## 10.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

## 9.5.2

### Patch Changes

- ab2fd6b3: Resolves broken builds, by removing erroneously included `package.tsconfig.json`

## 9.5.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 9.5.0

### Minor Changes

- 3690df49: Exports storybook config objects, and package.tsconfig

### Patch Changes

- 3690df49: Updates Storybook configs
- 3690df49: Updates `tsdoc.json` file

## 9.4.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/emotion@4.0.1

## 9.4.1

### Patch Changes

- 95f1e63a: Fixes a bad build where `getTheme` was not properly exported

## 9.4.0

### Minor Changes

- 99e20bb9: Reusable DarkModeProps and darkMode prop for LeafygreenProvider

### Patch Changes

- 85d46871: Adds `lodash` as an explicit dependency of `lib`. Imports `lodash` utility in a tree-shakable way

## 9.3.0

### Minor Changes

- 422dbfcd: Adds `Backspace` and `Delete` to `keyMap`

## 9.2.1

### Patch Changes

- 2cf1bc4a: Adding prefix functionality to createUniqueClassName

## 9.2.0

### Minor Changes

- acd6919: Publish createUniqueClassName so className values can be shared across components without conflicts
- acd6919: Exports `getNodeTextContent` from `lib`

## 9.1.0

### Minor Changes

- d661688: Adds basic console functions (error, warn, and log) wrapped in lodash.once

## 9.0.1

### Patch Changes

- cec710ad: Upgrades Polished to v4.1

## 9.0.0

### Major Changes

- b8f03aa1: Bumps `react` peer dependency to v17

### Patch Changes

- Updated dependencies [f6e5655a]
  - @leafygreen-ui/emotion@4.0.0

## 8.0.0

### Major Changes

- 047c1930: Removes `IdAllocator` class from package. Moving forward, use the `useIdAllocator` hook from the hooks package instead. This was done to better support server-side rendering.

## 7.0.0

### Major Changes

- 90321b36: Removes `validateAriaLabelProps` function from package. This can now be found in `@leafygreen-ui/a11y`

## 6.3.0

### Minor Changes

- 2f0775ec: Adds value for the left bracket key to enable easier handling of keyboard events for that key.

## 6.2.0

### Minor Changes

- 7df69248: Refactors the Toggle component to resolve bugs, improve maintainability, and improve accessibility for sighted and non-sighted users.

  - Refactors the internal DOM structure of the component to be as accessible as possible, and uses the appropriate role.
  - Restructures how the styles are structured in the component to improve maintainability.
  - Slightly increases contrast of the "ON" and "OFF" labels in the default size to meet WCAG AA contrast guidelines.
  - Hides the "ON" and "OFF" labels for screen readers so that only the current state of the Toggle is read.
  - Enforces use of `aria-label` and `aria-labelledby` so that Toggles always have screen reader accessible text associated with them.
  - Fixes a bug with the rendering of the focus state on Windows machines.
  - Uses the LeafyGreen Provider to conditionally show the focus state based on how the user is interacting with the page.

  Please read our [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/toggle/UPGRADE.md) for more information on these changes.

## 6.1.2

### Patch Changes

- ee7923d3: Updates `HTMLElementProps` type, now accepting a generic for describing a RefType

## 6.1.1

### Patch Changes

- 9ee1d5fc: The "prop-types" package has moved from being a peer dependency to an explicit dependency

## 6.1.0

### Minor Changes

- 5cf0c95c: Added `enforceExhaustive` helper

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/emotion@3.0.1

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/emotion@3.0.0

## 5.1.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2

## 5.1.0

### Minor Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.

## 5.0.0

### Major Changes

- 1aa26ee: Remove unnecessary testHelpers types

### Minor Changes

- a571361: Adds typeIs.array type guard method

### Patch Changes

- 2eba736: Remove testing library dependency

## 4.5.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.

## 4.5.0

### Minor Changes

- 1c797b3: Adds `OneOf` type helper

## 4.4.1

### Patch Changes

- 5aafd72: Adds Either utility type to lib

## 4.4.0

### Minor Changes

- da540d3: Adds RecursivePartial utility type to lib

## 4.3.1

### Patch Changes

- 704e25c: Adds missing testing library dependency

## 4.3.0

### Minor Changes

- 6eb9d26: Adds shared test helpers

## 4.2.0

### Minor Changes

- fabc1c9: `isComponentType` function now types the returned element more specifically, rather than just as `React.ReactElement`

## 4.1.0

### Minor Changes

- 11b2217: Adds enumerated `aria-current` values to lib for general use

### Patch Changes

- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/emotion@2.0.1

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0

## 3.2.0

### Minor Changes

- 2f9a300: Add `keyMap` to lib

## 3.1.0

### Minor Changes

- 9c45cb4: Add `isComponentType` function
