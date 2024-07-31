# @leafygreen-ui/palette

## 4.1.1

### Patch Changes

- fd0e5977d: Renames Palette story for Mongodb.design

## 4.1.0

### Minor Changes

- d70758dcf: Adds `transparent` key to `palette`. Ensures a consistent `transparent` color across browsers

## 4.0.10

### Patch Changes

- 070736c4: Exports `black` and `white` colors `as const`

## 4.0.9

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`

## 4.0.8

### Patch Changes

- 41116a1b: LiveExample now correctly supports click-to-copy functionality

## 4.0.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 4.0.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 4.0.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 4.0.4

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- 55d33e435: Fixes layout issue in live example

## 4.0.3

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 4.0.2

### Patch Changes

- 09775f0ac: Fixes layout issue in live example

## 4.0.1

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies

## 4.0.0

### Major Changes

- 5b036515e: Removes old `uiColors` token

## 3.4.7

### Patch Changes

- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples

## 3.4.6

### Patch Changes

- 703db871f: Renames Palette.story.tsx (uppercase) for documentation purposes

## 3.4.5

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies

## 3.4.4

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 3.4.3

### Patch Changes

- 3690df49: Updates `tsdoc.json` file

## 3.4.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files

## 3.4.1

### Patch Changes

- 30e038a3: Update red light1 to `#FF6960`

## 3.4.0

### Minor Changes

- 9ff90d4b: Adding gray-dark-4 to palette

### Patch Changes

- 6a89bc29: Changing export method for palette and uiColors ts objects
- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls

## 3.3.2

### Patch Changes

- acd6919: Updating gray-dark-3 on palette.less to the correct value

## 3.3.1

### Patch Changes

- 63ddf39: Updates gray dark 3 from #21313C to #1C2D38

## 3.3.0

### Minor Changes

- ded2831: Adds palette.ts and palette.less files reflecting the brand refresh palette.

## 3.2.2

### Patch Changes

- f6e5655a: Updates devDependencies for palette

## 3.2.1

### Patch Changes

- ab581f34: Re-released components that were erroneously released without `.d.ts` files

## 3.2.0

### Minor Changes

- 65032024: Adds `uiColors.focus`, `uiColors.green.dark1` and `uiColors.red.dark1` to the palette

## 3.1.1

### Patch Changes

- c8aee7eb: Updates `uiColors.gray.base` to #89979B

## 3.1.0

### Minor Changes

- c9a0d89f: Defined a color value for `uiColors.blue.light1'

## 3.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed

## 3.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

## 2.0.2

### Patch Changes

- 691eb05: Better support for UMD

## 2.0.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

## 1.1.1

### Patch Changes

- 319844d: Fixes bug in storybook such that HEX values are now displayed

## 1.1.0

### Minor Changes

- a0fdc57: Adds ui-colors.less file
