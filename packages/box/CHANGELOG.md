# @leafygreen-ui/box

## 3.1.9

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`

## 3.1.8

### Patch Changes

- 4fcf2e94: Updates types with `React.PropsWithChildren`

## 3.1.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 3.1.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 3.1.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 3.1.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x

## 3.1.3

### Patch Changes

- 111b680c5: Fixes incorrect prop types in Storybook

## 3.1.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 3.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 3.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs

## 3.0.8

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/lib@9.4.2

## 3.0.7

### Patch Changes

- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
- Updated dependencies [422dbfcd]
  - @leafygreen-ui/lib@9.3.0

## 3.0.6

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0

## 3.0.5

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0

## 3.0.4

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 3.0.3

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21

## 3.0.2

### Patch Changes

- 90996818: Fixes style rule from `box-style` to `box-sizing`

## 3.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1

## 3.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0

## 2.1.5

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)

## 2.1.4

### Patch Changes

- a14a079: ExtendableBox type now provides 'displayName' and 'propTypes' properties.

## 2.1.3

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1

## 2.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 2.1.1

### Patch Changes

- e8f5376: Ensures that only props that are of type `string` are recognized as being passed to the `href` prop.

## 2.1.0

### Minor Changes

- 0593116: Updates `ExtendableBox` type such that a consumer can pass a default value for `as` rather than assuming that the default case is a `div`. This fixes bugs in Button and Menu components.

## 2.0.0

### Major Changes

- eba8391: Box component now accepts `as` prop instead of `component` and exports generic `ExtendableBox` as helper type for components wrapping Box.

  ```js
  Example Usage:
  function Example<ExtendableBox<ExampleProps>>(props: ExampleProps) {
    return <div>Example Component</div>
  }
  ```

## 1.1.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies

## 1.1.0

### Minor Changes

- 208d881: Exports `BoxProps` as named export from index

## 1.0.0

### Major Changes

- b1e3fb6: Initial Box component release
