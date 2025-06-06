# @lg-tools/validate

## 0.5.1

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
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
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @lg-tools/build@0.8.0
  - @lg-tools/meta@0.6.0

## 0.5.0

### Minor Changes

- 989387c95: Updates build validation to use the entry files defined in the package.json

### Patch Changes

- Updated dependencies [028147fe1]
  - @lg-tools/meta@0.5.1

## 0.4.6

### Patch Changes

- Updated dependencies [579c8300c]
  - @lg-tools/meta@0.5.0

## 0.4.5

### Patch Changes

- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
- Updated dependencies [3978cdbfe]
  - @lg-tools/build@0.7.4
  - @lg-tools/meta@0.4.2

## 0.4.4

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [541e12e75]
  - @lg-tools/meta@0.4.1
  - @lg-tools/build@0.7.3

## 0.4.3

### Patch Changes

- Updated dependencies [dc54a4b84]
  - @lg-tools/meta@0.4.0

## 0.4.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2
  - @lg-tools/meta@0.3.7

## 0.4.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1
  - @lg-tools/meta@0.3.6

## 0.4.0

### Minor Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-tools/build@0.7.0
  - @lg-tools/meta@0.3.5

## 0.3.0

### Minor Changes

- 04bb887c0: Updates `ignoreFilePatterns` and `depcheckOptions.ignorePatterns` to exclude validating dependencies in `*.input.*` and `*.output.*` files in `tools/codemods` directory

## 0.2.0

### Minor Changes

- f101504c0: Updates `devFilePatterns`, and will exclude all files in `test/` `testing/` or `test-utilities/` directories from explicit dep. checks. i.e. Files in these directories will only need to have their imports listed s `devDependencies` in the `package.json`

## 0.1.11

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0
  - @lg-tools/meta@0.3.4

## 0.1.10

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0
  - @lg-tools/meta@0.3.3

## 0.1.9

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1
  - @lg-tools/meta@0.3.2

## 0.1.8

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0
  - @lg-tools/meta@0.3.1

## 0.1.7

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
- Updated dependencies [90bba7b2]
  - @lg-tools/build@0.3.2
  - @lg-tools/meta@0.3.0

## 0.1.6

### Patch Changes

- 7f38e78a: - Adds `'@leafygreen-ui/testing-lib'` to list of external dependencies.
  - Updates handling of external dependencies with glob patterns
- ffd11f24: Updates dev file pattern to include entire `testutils/` directories
- Updated dependencies [ffd11f24]
  - @lg-tools/meta@0.2.0

## 0.1.5

### Patch Changes

- 3e1a7bc3: Updates the logic to check whether a dependency is used in a development file
- Updated dependencies [4822f43c]
- Updated dependencies [8b1d2d3a]
  - @lg-tools/build@0.3.1
  - @lg-tools/meta@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0
  - @lg-tools/meta@0.1.4

## 0.1.3

### Patch Changes

- c9f0055a: Ignores dependencies imported from a `/scripts` directory, or `*.stories.js` file.

## 0.1.2

### Patch Changes

- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0
  - @lg-tools/meta@0.1.2

## 0.1.1

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications
- Updated dependencies [cb1e4ba4]
  - @lg-tools/build@0.1.2
  - @lg-tools/meta@0.1.1

## 0.1.0

### Minor Changes

- 215268ff: First pre-release of LeafyGreen validation tools

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Version fixes
- 215268ff: Updates depcheck fix script
- 215268ff: Fix broken builds
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0
  - @lg-tools/meta@0.1.0

## 0.1.0-beta.10

### Minor Changes

- 8460cef9b: First pre-release of LeafyGreen validation tools

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- c6d2ea11a: Version fixes
- Updates depcheck fix script
- 9476719bd: Fix broken builds

## 0.1.0-beta.9

### Patch Changes

- Adds README.md. Minor bug fixes

## 0.1.0-beta.8

### Patch Changes

- 78acda539: Fix broken builds

## 0.1.0-beta.7

### Patch Changes

- Version fixes

## 0.1.0-beta.0-6

### Minor Changes

- 8460cef9: First pre-release of LeafyGreen validation tools
