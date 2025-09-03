# @leafygreen-ui/ripple

## 2.0.4

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/tokens@3.2.3

## 2.0.3

### Patch Changes

- @leafygreen-ui/tokens@3.1.2

## 2.0.2

### Patch Changes

- @leafygreen-ui/tokens@3.1.1

## 2.0.1

### Patch Changes

- Updated dependencies [4bd4da3]
  - @leafygreen-ui/tokens@3.1.0

## 2.0.0

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
  - @leafygreen-ui/tokens@3.0.0

## 1.1.20

### Patch Changes

- @leafygreen-ui/tokens@2.12.2

## 1.1.19

### Patch Changes

- @leafygreen-ui/tokens@2.12.1

## 1.1.18

### Patch Changes

- Updated dependencies [4b362e136]
  - @leafygreen-ui/tokens@2.12.0

## 1.1.17

### Patch Changes

- @leafygreen-ui/tokens@2.11.5

## 1.1.16

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/tokens@2.11.4

## 1.1.15

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/tokens@2.11.3

## 1.1.14

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/tokens@2.11.2

## 1.1.13

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
  - @leafygreen-ui/tokens@2.5.2

## 1.1.12

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/tokens@2.1.4

## 1.1.11

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/tokens@2.1.3

## 1.1.10

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/tokens@2.1.2

## 1.1.9

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/tokens@2.0.2

## 1.1.8

### Patch Changes

- Updated dependencies [741cdd408]
  - @leafygreen-ui/tokens@2.0.0

## 1.1.7

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/tokens@1.4.1

## 1.1.6

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0

## 1.1.5

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 1.1.4

### Patch Changes

- 3690df49: Updates `tsdoc.json` file

## 1.1.3

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/palette@3.4.2

## 1.1.2

### Patch Changes

- cec710ad: Upgrades Polished to v4.1

## 1.1.1

### Patch Changes

- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [ab581f34]
  - @leafygreen-ui/palette@3.2.1

## 1.1.0

### Minor Changes

- 65032024: Updates what options are able to be passed to Ripple component

### Patch Changes

- Updated dependencies [65032024]
  - @leafygreen-ui/palette@3.2.0

## 1.0.0

### Major Changes

- de21457c: Initial release of ripple package
