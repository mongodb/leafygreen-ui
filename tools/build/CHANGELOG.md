# @lg-tools/build

## 0.8.3

### Patch Changes

- 1a5c69f: Adds reusable `constructUMDGlobalName` function to generate consistent UMD global names when building

## 0.8.2

### Patch Changes

- dc3299b: Enables TS downleveling to 4.9.
  Adds `lg-ts-downlevel` bin script

## 0.8.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files

## 0.8.0

### Minor Changes

- 0757cfbfc: - Only adds output `globals` for UMD builds
  - Splits `/testing` entry point if `src/testing/index.ts` file exists
- 0757cfbfc: Updates rollup config to build UMD bundles into `./dist/umd`
- 0757cfbfc: Updates `package.tsconfig.json` "moduleResolution" to "bundler", and "target" to "ES2020"
- 0757cfbfc: - Updates default types directory to `./dist/types`
  - Uses "${configDir}" in base package.json baseUrl, rootDir, outDir, & declarationDir properties
- 0757cfbfc: - Upgrades to TS 5.8.
  - Adds `--downlevel` option for `build-ts`. This option exports downleveled `*.d.ts` files for a defined set of targets.
    Updates a package's `package.json` if necessary `--update` flag is provided.
    This uses [downlevel-dts](https://github.com/sandersn/downlevel-dts) under the hood.
- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- 0757cfbfc: Updates `./bin` require reference to new UMD build directory
- 0757cfbfc: Adds `lg-build` cli command.
  Usage:

  ```bash
  # Build the production bundle
  lg-build bundle

  # Build types
  lg-build tsc

  # Builds docs
  lg-build docs

  # Build & downlevel types
  lg-build tsc --downlevel

  # Build, downlevel & update package.json types references
  lg-build tsc --downlevel --update
  ```

- 0757cfbfc: Removes direct build warning. Using `lg-build` directly is now the preferred approach

## 0.7.4

### Patch Changes

- fd1696643: Logs `tsconfig.json` path for `--verbose` flag
- 3978cdbfe: The build script will now check for a repository-level `rollup` config

## 0.7.3

### Patch Changes

- 541e12e75: Updates Rollup config to enable tree-shaking

## 0.7.2

### Patch Changes

- e1955dd36: Fixes broken patch build

## 0.7.1

### Patch Changes

- 79c88b5b1: Fixes `tsdoc` build to only look at a package's `/src`
- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`

## 0.7.0

### Minor Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

## 0.6.0

### Minor Changes

- fdd63dbe4: Allows passing flags to `tsc` from the `lg build-ts` command

## 0.5.1

### Patch Changes

- 4951369a: Bumps `rollup` and related packages to v4

## 0.5.0

### Minor Changes

- c3906f78: Adds `rollup-plugin-sizes` to show bundles sizes.

## 0.4.1

### Patch Changes

- 356a53fd: Update typescript peer dependency

## 0.4.0

### Minor Changes

- ab762558: Adds `rollup-plugin-sizes` to show bundles sizes.

## 0.3.2

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.

## 0.3.1

### Patch Changes

- 4822f43c: Bumps @babel packages that were effected by @babel/traverse security breach

## 0.3.0

### Minor Changes

- 74071b67: Adds the regex `^@lg-[a-z]+\/` to rollup's `external` property. This tells rollup to treat any `@lg-*` scoped package as external, and to not bundle it into the package.

## 0.2.1

### Patch Changes

- 4fcf2e94: adds `@babel/core` as a peerDependency.
- 8e06bb20: Updates ts build script to return the same exit code as `tsc`

## 0.2.0

### Minor Changes

- c2908c5a: Updates `build` package to use Rollup's JS API rather than spawning rollup using the command line. This gives us more control over the build, and we don't need to worry about the path of the `rollup` binary in consuming ap
  plications

### Patch Changes

- 746962d9: Adds missing dependency `glob` to build package
- 6776fee7: Adds `root.tsconfig.json`. Establishes rules for the root level tsconfig

## 0.1.2

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications

## 0.1.1

### Patch Changes

- ff02d0bb: Updates rollup config to polyfill node builtins.

## 0.1.0

### Minor Changes

- 215268ff: First pre-release of build tools. This package includes shared ts, rollup & babel config

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds

## 0.1.0-beta.9

### Minor Changes

- d84e7eba1: First pre-release of build tools. This package includes shared ts, rollup & babel config

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- 9476719bd: Fix broken builds

## 0.1.0-beta.8

### Patch Changes

- Adds README.md. Minor bug fixes

## 0.1.0-beta.7

### Patch Changes

- 78acda539: Fix broken builds

## 0.1.0-beta.0-6

### Minor Changes

- d84e7eba: First pre-release of build tools. This package includes shared ts, rollup & babel config
