# @leafygreen-ui/tokens

## 3.2.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1

## 3.2.2

### Patch Changes

- 7b49fcf: [LG-5471](https://jira.mongodb.org/browse/LG-5471) Fix overflow shadow z-index layering issue where scrolled content appeared above top/left inside shadows

## 3.2.1

### Patch Changes

- a638649: Decrease light theme shadow intensity by reducing `shadowOffset` from `8` to `2` in `getOverflowShadow.ts` to match design specifications.

## 3.2.0

### Minor Changes

- 56c0d3b: - Deprecates `bold` font-weight token

  - Adds `semiBold` font-weight token
  - Adds `FontWeight` enum-like constant and type

  Note: This should have no visual impact since the font-face being used was already semi-bold/600px. It just creates a token that aligns correctly to the font-face and Figma component.

## 3.1.2

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/palette@5.0.0

## 3.1.1

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/palette@5.0.0

## 3.1.0

### Minor Changes

- 4bd4da3: Creates scrollbar color tokens and `addScrollbarStyles`

  #### `scrollbarColor`

  Use the `scrollbar-color` CSS property to set the colors of the scrollbar thumb and track.
  For Safari, use the `-webkit-scrollbar-thumb` and `-webkit-scrollbar-track` pseudo-elements.

  Usage:

  ```tsx
  import { scrollbarColor } from '@leafygreen-ui/tokens';

  css`
    scrollbar-color: ${scrollbarColor[theme].thumb.primary.default} ${scrollbarColor[
        theme
      ].track.primary.default};
    &::-webkit-scrollbar-thumb {
      background-color: ${scrollbarColor[theme].thumb.primary.default};
    }
    &::-webkit-scrollbar-track {
      background-color: ${scrollbarColor[theme].track.primary.default};
    }
  `;
  ```

  #### `addScrollbarStyles`

  A utility for quickly adding the above styles for a particular theme & variant.

  ```tsx
  import { addScrollbarStyles } from '@leafygreen-ui/tokens';

  css`
    ${addScrollbarStyles({ theme, variant })};
  `;
  ```

## 3.0.0

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
  - @leafygreen-ui/emotion@5.0.0
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/lib@15.0.0

## 2.12.2

### Patch Changes

- Updated dependencies [f2ed4b037]
  - @leafygreen-ui/emotion@4.1.1
  - @leafygreen-ui/palette@4.1.4

## 2.12.1

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [78a36d6bb]
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/emotion@4.1.0
  - @leafygreen-ui/palette@4.1.4

## 2.12.0

### Minor Changes

- 4b362e136: Adds `addOverflowShadow` util for adding a class that will apply a pseudo-element to a scroll container

## 2.11.5

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/palette@4.1.4

## 2.11.4

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4

## 2.11.3

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3

## 2.11.2

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/lib@14.0.1

## 2.11.1

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/lib@14.0.0

## 2.11.0

### Minor Changes

- f91e1ce97: Unsets lowest level shadow for darkMode. (sets `shadow.dark[100]` to `"unset"`)

## 2.10.0

### Minor Changes

- 66e5665e8: Exports shadow tokens from package

### Patch Changes

- Updated dependencies [4c04aa0ee]
  - @leafygreen-ui/lib@13.7.0

## 2.9.0

### Minor Changes

- 29d50edaa: Adds 72px spacing token

  [LG-4341](https://jira.mongodb.org/browse/LG-4341)

### Patch Changes

- Updated dependencies [7a901b954]
  - @leafygreen-ui/lib@13.6.0

## 2.8.0

### Minor Changes

- 7bc4fcde: - Improves semantics of color token segment type names (e.g. `Type` -> `Property`, `State` -> `InteractionState`).
  - Adds TSDoc to color types
  - Deprecates `Mode` enum in favor if `Theme` (exported from `lib`)

### Patch Changes

- Updated dependencies [7bc4fcde]
  - @leafygreen-ui/lib@13.5.0

## 2.7.0

### Minor Changes

- 3364b542: Adds link to text color tokens
- 0864a420: Adds `placeholder` token

## 2.6.0

### Minor Changes

- c406ab85: [LG-2930](https://jira.mongodb.org/browse/LG-2930)

  - Fixes `darkModeBackgroundColors` disabled colors
  - Fixes `lightModeBorderColors` variable typo

## 2.5.3

### Patch Changes

- 57dedc40: Adds `satisfies` to ensure consistent & correct `colors` token structure

## 2.5.2

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
  - @leafygreen-ui/palette@4.0.9

## 2.5.1

### Patch Changes

- 5ee54143: Provides support for auto-complete by removing explicit type definitions and leveraging `as const`
- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`

## 2.5.0

### Minor Changes

- 3208b813: Adds more spacing tokens
  [JIRA Ticket](https://jira.mongodb.org/browse/LG-4065)

## 2.4.0

### Minor Changes

- c2854e9b: Adds additional spacing tokens

## 2.3.0

### Minor Changes

- 2645cd50: Adds new tokens to spacing object, and warns that old tokens are deprecated. Eventually, we will enforce a migration to the new system.

## 2.2.0

### Minor Changes

- 3fe03b50: Adds `Size` token

## 2.1.4

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/palette@4.0.7

## 2.1.3

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/palette@4.0.6

## 2.1.2

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/palette@4.0.5

## 2.1.1

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing

## 2.1.0

### Minor Changes

- 73cbbd02c: Adds `fontWeights` token

### Patch Changes

- 8ece56980: Adds `slowest` to `transitionDuration`

## 2.0.3

### Patch Changes

- 77320a6b8: Adds token for large font size
- Updated dependencies [55d33e435]
- Updated dependencies [55d33e435]
  - @leafygreen-ui/palette@4.0.4

## 2.0.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/palette@4.0.3

## 2.0.1

### Patch Changes

- Updated dependencies [5b036515e]
  - @leafygreen-ui/palette@4.0.0

## 2.0.0

### Major Changes

- 741cdd408: Removes Akzidenz from list of fallback fonts. Also removes `Legacy` from list of `fontFamilies`.

### Patch Changes

- Updated dependencies [b24b21462]
  - @leafygreen-ui/palette@3.4.7

## 1.4.1

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/palette@3.4.5

## 1.4.0

### Minor Changes

- ae5421cf6: Adds `transitionDuration` token to package. `transitionDuration` has three values: faster (100), default (150), and slower (300) which correspond to the length in ms of the transition duration.

## 1.3.4

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/palette@3.4.4

## 1.3.3

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
  - @leafygreen-ui/palette@3.4.3

## 1.3.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2

## 1.3.1

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/lib@9.3.0

## 1.3.0

### Minor Changes

- c48e943e: Exports `Mode`, `hoverRing` and `focusRing` from `tokens`. Add `hoverRing` and `focusRing` to the `box-shadow` property to render Leafygreen interaction states

## 1.2.0

### Minor Changes

- ba4aab15: Exports the constant `BaseFontSize` from `tokens`

### Patch Changes

- 233ac580: Adds documentation to `typeScales`. Exports `fontFamilies` as read-only
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/lib@9.2.1

## 1.1.0

### Minor Changes

- 614be76: Adds `typeScales` export from tokens

## 1.0.0

### Major Changes

- 8457f92: - Adds "Euclid Circular A" and "MongoDB Value Serif" to `tokens.fontFamilies`
  - Updates Light mode typography according to visual brand refresh

## 0.5.3

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0

## 0.5.2

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0

## 0.5.1

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 0.5.0

### Minor Changes

- 059ef833: Adds named export `breakpoints` to package

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1

## 0.4.0

### Minor Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0

## 0.3.0

### Minor Changes

- f792966: Adds default and code fonts to Tokens package

## 0.2.0

### Minor Changes

- 6ca8fe6: Updates spacing to numerical rather than string values and exports as const so that consumers can see the values

## 0.1.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1

## 0.1.0

### Minor Changes

- 45de359: Initial release of `@leafygreen-ui/tokens`

### Patch Changes

- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0
