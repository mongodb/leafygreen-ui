# @lg-tools/test

## 0.4.19

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
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/testing-lib@0.8.0
  - @lg-tools/build@0.8.0
  - @lg-tools/meta@0.6.0

## 0.4.18

### Patch Changes

- Updated dependencies [028147fe1]
  - @lg-tools/meta@0.5.1

## 0.4.17

### Patch Changes

- Updated dependencies [579c8300c]
  - @lg-tools/meta@0.5.0

## 0.4.16

### Patch Changes

- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
- Updated dependencies [3978cdbfe]
  - @lg-tools/build@0.7.4
  - @lg-tools/meta@0.4.2
  - @leafygreen-ui/testing-lib@0.7.4

## 0.4.15

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [541e12e75]
  - @leafygreen-ui/testing-lib@0.7.3
  - @lg-tools/meta@0.4.1
  - @lg-tools/build@0.7.3

## 0.4.14

### Patch Changes

- Updated dependencies [dc54a4b84]
  - @lg-tools/meta@0.4.0

## 0.4.13

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/testing-lib@0.7.2
  - @lg-tools/build@0.7.2
  - @lg-tools/meta@0.3.7

## 0.4.12

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1
  - @leafygreen-ui/testing-lib@0.7.1
  - @lg-tools/meta@0.3.6

## 0.4.11

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-tools/build@0.7.0
  - @lg-tools/meta@0.3.5

## 0.4.10

### Patch Changes

- Updated dependencies [9776f5f42]
  - @leafygreen-ui/testing-lib@0.7.0

## 0.4.9

### Patch Changes

- Updated dependencies [659aa9eed]
  - @leafygreen-ui/testing-lib@0.6.0

## 0.4.8

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0
  - @lg-tools/meta@0.3.4

## 0.4.7

### Patch Changes

- Updated dependencies [ed9bead67]
  - @leafygreen-ui/testing-lib@0.5.0

## 0.4.6

### Patch Changes

- Updated dependencies [4951369a]
  - @lg-tools/build@0.5.1

## 0.4.5

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0
  - @lg-tools/meta@0.3.3

## 0.4.4

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1
  - @leafygreen-ui/testing-lib@0.4.2
  - @lg-tools/meta@0.3.2

## 0.4.3

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0
  - @lg-tools/meta@0.3.1

## 0.4.2

### Patch Changes

- ee6ad399: Updates default jest config path to reference the correct file (in `node_modules`)

## 0.4.1

### Patch Changes

- Updated dependencies [2bceccb1]
- Updated dependencies [90bba7b2]
  - @leafygreen-ui/testing-lib@0.4.1
  - @lg-tools/build@0.3.2
  - @lg-tools/meta@0.3.0

## 0.4.0

### Minor Changes

- ffd11f24: Adds coverage reporting for untested sub-modules
- ffd11f24: Updates to jest 29 for React 17 testing

### Patch Changes

- Updated dependencies [ffd11f24]
- Updated dependencies [7f38e78a]
- Updated dependencies [7f38e78a]
  - @lg-tools/meta@0.2.0
  - @leafygreen-ui/testing-lib@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [4822f43c]
  - @lg-tools/build@0.3.1

## 0.3.1

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0

## 0.3.0

### Minor Changes

- 4fcf2e94: Upgrade `jest` and `testing-library` packages to support React 18

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [8e06bb20]
  - @lg-tools/build@0.2.1

## 0.2.2

### Patch Changes

- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0

## 0.2.1

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications
- Updated dependencies [cb1e4ba4]
  - @lg-tools/build@0.1.2

## 0.2.0

### Minor Changes

- 61ab7efc: Add `testFilesPattern` argument to `lg test` which is passed to `jest` as `regexForTestFiles`. See [jest docs](https://jestjs.io/docs/cli#jest-regexfortestfiles) for more
- 06316485: Adds pass-through arguments to `lg test` command. You can now pass through any command accepted by the `jest` cli

### Patch Changes

- 61ab7efc: Ensures `lg tests` exits with code `1` if there are failing tests
- Updated dependencies [ff02d0bb]
  - @lg-tools/build@0.1.1

## 0.1.0

### Minor Changes

- 215268ff: First pre-release of shared test tooling. Includes shared jest config & custom test runner script. Use `lg-test` to run jest tests with shared config

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0

## 0.1.0-beta.9

### Minor Changes

- d8c10d39c: First pre-release of shared test tooling. Includes shared jest config & custom test runner script. Use `lg-test` to run jest tests with shared config

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

- d8c10d39: First pre-release of shared test tooling. Includes shared jest config & custom test runner script. Use `lg-test` to run jest tests with shared config

### Patch Changes

- Updated dependencies [d84e7eba]
  - @lg-tools/build@0.1.0-beta.6
