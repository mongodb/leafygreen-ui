# @lg-tools/create

## 0.4.1

### Patch Changes

- 23ce595: Fixes `package.json` template
- Updated dependencies [1a5c69f]
  - @lg-tools/build@0.8.3

## 0.4.0

### Minor Changes

- d2bec61: Update `createComponents.ts` to create `testing` and `utils` directories.

## 0.3.3

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

## 0.3.2

### Patch Changes

- Updated dependencies [028147fe1]
  - @lg-tools/meta@0.5.1

## 0.3.1

### Patch Changes

- Updated dependencies [579c8300c]
  - @lg-tools/meta@0.5.0

## 0.3.0

### Minor Changes

- 1d8408da8: - Newly created `tsconfig.json` files will now take the scope into account, and update the references accordingly.
  - Root sub-component directory will now take `--parent` option into account (no longer need to specify `--directory` as well as `--parent`)
  - Adds `-dry` flag for dry runs
  - Improves verbose logging

### Patch Changes

- 014a9ff4f: Fixes install-time warning about missing `bin` files
- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
- Updated dependencies [3978cdbfe]
  - @lg-tools/build@0.7.4
  - @lg-tools/meta@0.4.2

## 0.2.14

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [541e12e75]
  - @lg-tools/meta@0.4.1
  - @lg-tools/build@0.7.3

## 0.2.13

### Patch Changes

- Updated dependencies [dc54a4b84]
  - @lg-tools/meta@0.4.0

## 0.2.12

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2
  - @lg-tools/meta@0.3.7

## 0.2.11

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1
  - @lg-tools/meta@0.3.6

## 0.2.10

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @lg-tools/build@0.7.0
  - @lg-tools/meta@0.3.5

## 0.2.9

### Patch Changes

- 659bb0e81: Updates .design url from `/example/` to `/live-example/`

## 0.2.8

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0
  - @lg-tools/meta@0.3.4

## 0.2.7

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0
  - @lg-tools/meta@0.3.3

## 0.2.6

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1
  - @lg-tools/meta@0.3.2

## 0.2.5

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0
  - @lg-tools/meta@0.3.1

## 0.2.4

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
- Updated dependencies [90bba7b2]
  - @lg-tools/build@0.3.2
  - @lg-tools/meta@0.3.0

## 0.2.3

### Patch Changes

- Updated dependencies [ffd11f24]
  - @lg-tools/meta@0.2.0

## 0.2.2

### Patch Changes

- 954645a5: Update `lib` and `emotion` versions

## 0.2.1

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0
  - @lg-tools/meta@0.1.4

## 0.2.0

### Minor Changes

- 3e8485e9: Adds `--parent` flag to `lg create` command. Passing in this flag will create a subcomponent of the given parent.

## 0.1.3

### Patch Changes

- 73dd20f0: Fixes broken package.json & tsconfig.json templates.
  Default `directory` is now based off `scope` parameter, if provided.

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

- 215268ff: First pre-release of LeafyGreen create and update tools

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0
  - @lg-tools/meta@0.1.0

## 0.1.0-beta.3

### Minor Changes

- cc4bea164: First pre-release of LeafyGreen create and update tools

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- 9476719bd: Fix broken builds

## 0.1.0-beta.2

### Patch Changes

- Adds README.md. Minor bug fixes

## 0.1.0-beta.1

### Patch Changes

- 78acda539: Fix broken builds

## 0.1.0-beta.0

### Minor Changes

- First pre-release of LeafyGreen create and update tools
