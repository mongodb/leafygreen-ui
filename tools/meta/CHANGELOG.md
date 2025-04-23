# @lg-tools/meta

## 0.5.0

### Minor Changes

- 579c8300c: Updates `getAllPackages`, `getLGConfig` and `getRootPackageJson` to read from `getRepositoryRoot` (instead of relying on `process.cwd()`)

## 0.4.2

### Patch Changes

- 3978cdbfe: Creates `getRepositoryRoot` that returns the git root of the repo
- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
  - @lg-tools/build@0.7.4

## 0.4.1

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @lg-tools/build@0.7.3

## 0.4.0

### Minor Changes

- dc54a4b84: `@lg-tools/meta` now looks for a `"lg"` property on the root `package.json` (instead of a custom `lg.json`).
  This property helps internal LeafyGreen tools know what package scopes are associated with what directories (similar to `workspaces`).

## 0.3.7

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2

## 0.3.6

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1

## 0.3.5

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-tools/build@0.7.0

## 0.3.4

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0

## 0.3.3

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0

## 0.3.2

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1

## 0.3.1

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0

## 0.3.0

### Minor Changes

- 90bba7b2: Adds `pnpm` as a possible `getPackageManager` return value.

### Patch Changes

- Updated dependencies [2bceccb1]
  - @lg-tools/build@0.3.2

## 0.2.0

### Minor Changes

- ffd11f24: - Adds `exitWithErrorMessage` util
  - Fixes recursion in `findPackageJson`

## 0.1.5

### Patch Changes

- 8b1d2d3a: Adds `getPackageJson` utility
- Updated dependencies [4822f43c]
  - @lg-tools/build@0.3.1

## 0.1.4

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0

## 0.1.3

### Patch Changes

- fbb968b4: Exports `isValidJSON` utility

## 0.1.2

### Patch Changes

- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0

## 0.1.1

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications
- Updated dependencies [cb1e4ba4]
  - @lg-tools/build@0.1.2

## 0.1.0

### Minor Changes

- 215268ff: Pre-release of LeafyGreen metadata

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Version fixes
- 215268ff: Fix broken builds
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0

## 0.1.0-beta.4

### Minor Changes

- 77d986917: Pre-release of LeafyGreen metadata

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- c6d2ea11a: Version fixes
- 9476719bd: Fix broken builds

## 0.1.0-beta.3

### Patch Changes

- Adds README.md. Minor bug fixes

## 0.1.0-beta.2

### Patch Changes

- 78acda539: Fix broken builds

## 0.1.0-beta.1

### Patch Changes

- Version fixes

## 0.1.0-beta.0

### Minor Changes

- Pre-release of LeafyGreen metadata
