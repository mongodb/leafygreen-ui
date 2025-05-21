# @lg-tools/lint

## 2.1.1

### Patch Changes

- 579c8300c: Updates `formatLG` to return the original text if no errors are found

## 2.1.0

### Minor Changes

- 762b91b6d: - Rewrites `prettier.ts` using the Prettier Node API
  - Exports `formatLG` function to format miscellaneous blocks of code.
  - Adds verbose logging to `prettier`

### Patch Changes

- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
  - @lg-tools/build@0.7.4

## 2.0.4

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @lg-tools/build@0.7.3

## 2.0.3

### Patch Changes

- 23f6bc7fa: Fix eslint so errors properly propagate during CI lint check

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1

## 2.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- 9a8c43faa: Adds missing dependencies: `@eslint/compat`, `@eslint/eslintrc`, `@eslint/js`, `globals`
- Updated dependencies [274d7e1a7]
  - @lg-tools/build@0.7.0

## 1.0.0

### Major Changes

- ba855c702: Upgrades ESLint to v9

## 0.2.3

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0

## 0.2.2

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0

## 0.2.1

### Patch Changes

- 356a53fd: Update typescript peer dependency
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1

## 0.2.0

### Minor Changes

- 36070800: Adds support for `@lg-chat` components
- 36070800: `js` files are excluded

## 0.1.7

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0

## 0.1.6

### Patch Changes

- 4822f43c: Bumps @babel packages that were effected by @babel/traverse security breach
- Updated dependencies [4822f43c]
  - @lg-tools/build@0.3.1

## 0.1.5

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0

## 0.1.4

### Patch Changes

- 3fe03b50: Bumps prettier version to 2.8.8

## 0.1.3

### Patch Changes

- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0

## 0.1.2

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications
- Updated dependencies [cb1e4ba4]
  - @lg-tools/build@0.1.2

## 0.1.1

### Patch Changes

- 496c3125: Lint task now exits with code `1` if lint errors are found

## 0.1.0

### Minor Changes

- 215268ff: First pre-release of shared lint tooling. Includes shared config for eslint, prettier & packagejsonlint. Use `lg-lint` to run linters with shared config.

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0

## 0.1.0-beta.9

### Minor Changes

- b56f6ed7d: First pre-release of shared lint tooling. Includes shared config for eslint, prettier & packagejsonlint. Use `lg-lint` to run linters with shared config.

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- 9476719bd: Fix broken builds
- Updated dependencies [8d8a433d1]
- Updated dependencies [d84e7eba1]
- Updated dependencies [9476719bd]
  - @lg-tools/build@0.1.0-beta.9

## 0.1.0-beta.8

### Patch Changes

- Adds README.md. Minor bug fixes
- Updated dependencies
  - @lg-tools/build@0.1.0-beta.8

## 0.1.0-beta.7

### Patch Changes

- 78acda539: Fix broken builds
- Updated dependencies [78acda539]
  - @lg-tools/build@0.1.0-beta.7

## 0.1.0-beta.0-6

### Minor Changes

- b56f6ed7: First pre-release of shared lint tooling. Includes shared config for eslint, prettier & packagejsonlint. Use `lg-lint` to run linters with shared config.

### Patch Changes

- Updated dependencies [d84e7eba]
  - @lg-tools/build@0.1.0-beta.6
