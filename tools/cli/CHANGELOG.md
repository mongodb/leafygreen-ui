# @lg-tools/cli

## 0.10.9

### Patch Changes

- Updated dependencies [d027d4c]
  - @lg-tools/codemods@0.5.0

## 0.10.8

### Patch Changes

- Updated dependencies [a366ec0]
- Updated dependencies [a366ec0]
  - @lg-tools/install@0.4.0
  - @lg-tools/test@0.5.0
  - @lg-tools/link@0.2.14
  - @lg-tools/validate@0.6.0

## 0.10.7

### Patch Changes

- Updated dependencies [2b6a7c0]
  - @lg-tools/create@0.5.0

## 0.10.6

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @lg-tools/validate@0.6.0
  - @lg-tools/build@0.8.1
  - @lg-tools/codemods@0.4.1
  - @lg-tools/link@0.2.14
  - @lg-tools/lint@3.0.1
  - @lg-tools/prompt-kit@0.3.2
  - @lg-tools/slackbot@0.2.18
  - @lg-tools/update@0.1.19

## 0.10.5

### Patch Changes

- Updated dependencies [5994b73]
  - @lg-tools/codemods@0.4.0

## 0.10.4

### Patch Changes

- Updated dependencies [0af5361]
  - @lg-tools/prompt-kit@0.3.0

## 0.10.3

### Patch Changes

- Updated dependencies [7a01501]
  - @lg-tools/install@0.3.0

## 0.10.2

### Patch Changes

- Updated dependencies [95f7c12]
  - @lg-tools/codemods@0.3.0

## 0.10.1

### Patch Changes

- Updated dependencies [d2bec61]
  - @lg-tools/create@0.4.0

## 0.10.0

### Minor Changes

- 0757cfbfc: Adds `--downlevel` option for `build-ts`. This option reads a package's package.json and exports downleveled `*.d.ts` files for all targets listed in `"typeVersions"`
- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- 0757cfbfc: Updates `./bin` require reference to new UMD build directory
- 0757cfbfc: Adds `--update` flag for build-ts
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
- Updated dependencies [d71439b8e]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @lg-tools/codemods@0.2.0
  - @lg-tools/slackbot@0.2.17
  - @lg-tools/validate@0.5.1
  - @lg-tools/install@0.2.2
  - @lg-tools/create@0.3.3
  - @lg-tools/update@0.1.18
  - @lg-tools/build@0.8.0
  - @lg-tools/link@0.2.13
  - @lg-tools/lint@3.0.0
  - @lg-tools/test@0.4.19
  - @lg-tools/prompt-kit@0.2.1

## 0.9.2

### Patch Changes

- Updated dependencies [92fafc876]
- Updated dependencies [e14fc7768]
  - @lg-tools/codemods@0.1.6
  - @lg-tools/prompt-kit@0.2.0

## 0.9.1

### Patch Changes

- Updated dependencies [989387c95]
  - @lg-tools/validate@0.5.0
  - @lg-tools/create@0.3.2
  - @lg-tools/install@0.2.1
  - @lg-tools/link@0.2.12
  - @lg-tools/slackbot@0.2.16
  - @lg-tools/test@0.4.18
  - @lg-tools/update@0.1.17

## 0.9.0

### Minor Changes

- 579c8300c: Updates `cli` to use the updated `install` script

### Patch Changes

- Updated dependencies [579c8300c]
- Updated dependencies [579c8300c]
- Updated dependencies [579c8300c]
  - @lg-tools/install@0.2.0
  - @lg-tools/lint@2.1.1
  - @lg-tools/create@0.3.1
  - @lg-tools/link@0.2.11
  - @lg-tools/slackbot@0.2.15
  - @lg-tools/test@0.4.17
  - @lg-tools/update@0.1.16
  - @lg-tools/validate@0.4.6

## 0.8.0

### Minor Changes

- 1d8408da8: - Newly created `tsconfig.json` files will now take the scope into account, and update the references accordingly.
  - Root sub-component directory will now take `--parent` option into account (no longer need to specify `--directory` as well as `--parent`)
  - Adds `-dry` flag for dry runs
  - Improves verbose logging

### Patch Changes

- Updated dependencies [fd1696643]
- Updated dependencies [3978cdbfe]
- Updated dependencies [1d8408da8]
- Updated dependencies [762b91b6d]
- Updated dependencies [014a9ff4f]
  - @lg-tools/build@0.7.4
  - @lg-tools/create@0.3.0
  - @lg-tools/lint@2.1.0
  - @lg-tools/update@0.1.15
  - @lg-tools/codemods@0.1.5
  - @lg-tools/install@0.1.15
  - @lg-tools/link@0.2.10
  - @lg-tools/slackbot@0.2.14
  - @lg-tools/test@0.4.16
  - @lg-tools/validate@0.4.5

## 0.7.10

### Patch Changes

- c7ab79f57: Adds `--list` flag to `codemods` cli, which lists out all valid codemod names.
- Updated dependencies [c7ab79f57]
  - @lg-tools/codemods@0.1.4

## 0.7.9

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [541e12e75]
  - @lg-tools/codemods@0.1.3
  - @lg-tools/create@0.2.14
  - @lg-tools/install@0.1.14
  - @lg-tools/link@0.2.9
  - @lg-tools/lint@2.0.4
  - @lg-tools/slackbot@0.2.13
  - @lg-tools/test@0.4.15
  - @lg-tools/update@0.1.14
  - @lg-tools/validate@0.4.4
  - @lg-tools/build@0.7.3

## 0.7.8

### Patch Changes

- @lg-tools/create@0.2.13
- @lg-tools/install@0.1.13
- @lg-tools/link@0.2.8
- @lg-tools/slackbot@0.2.12
- @lg-tools/test@0.4.14
- @lg-tools/update@0.1.13
- @lg-tools/validate@0.4.3

## 0.7.7

### Patch Changes

- Updated dependencies [23f6bc7fa]
  - @lg-tools/lint@2.0.3

## 0.7.6

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @lg-tools/build@0.7.2
  - @lg-tools/codemods@0.1.2
  - @lg-tools/create@0.2.12
  - @lg-tools/install@0.1.12
  - @lg-tools/link@0.2.7
  - @lg-tools/lint@2.0.2
  - @lg-tools/slackbot@0.2.11
  - @lg-tools/test@0.4.13
  - @lg-tools/update@0.1.12
  - @lg-tools/validate@0.4.2

## 0.7.5

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [79c88b5b1]
- Updated dependencies [53c67fba6]
  - @lg-tools/build@0.7.1
  - @lg-tools/codemods@0.1.1
  - @lg-tools/slackbot@0.2.10
  - @lg-tools/validate@0.4.1
  - @lg-tools/install@0.1.11
  - @lg-tools/create@0.2.11
  - @lg-tools/update@0.1.11
  - @lg-tools/link@0.2.6
  - @lg-tools/lint@2.0.1
  - @lg-tools/test@0.4.12

## 0.7.4

### Patch Changes

- Updated dependencies [9a8c43faa]
- Updated dependencies [274d7e1a7]
  - @lg-tools/lint@2.0.0
  - @lg-tools/validate@0.4.0
  - @lg-tools/build@0.7.0
  - @lg-tools/create@0.2.10
  - @lg-tools/install@0.1.10
  - @lg-tools/link@0.2.5
  - @lg-tools/slackbot@0.2.9
  - @lg-tools/test@0.4.11
  - @lg-tools/update@0.1.10

## 0.7.3

### Patch Changes

- Updated dependencies [659bb0e81]
  - @lg-tools/create@0.2.9

## 0.7.2

### Patch Changes

- Updated dependencies [cf1693532]
  - @lg-tools/slackbot@0.2.8

## 0.7.1

### Patch Changes

- Updated dependencies [ba855c702]
  - @lg-tools/lint@1.0.0

## 0.7.0

### Minor Changes

- 04bb887c0: Adds `--packages` flag to `lg codemod` command. Passing in this flag will specify which package names should be filtered for in a given codemod.

### Patch Changes

- Updated dependencies [04bb887c0]
  - @lg-tools/codemods@0.1.0
  - @lg-tools/validate@0.3.0

## 0.6.3

### Patch Changes

- Updated dependencies [f101504c0]
  - @lg-tools/validate@0.2.0

## 0.6.2

### Patch Changes

- @lg-tools/test@0.4.10

## 0.6.1

### Patch Changes

- @lg-tools/test@0.4.9

## 0.6.0

### Minor Changes

- fdd63dbe4: Allows passing flags to `tsc` from the `lg build-ts` command

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0
  - @lg-tools/create@0.2.8
  - @lg-tools/install@0.1.9
  - @lg-tools/link@0.2.4
  - @lg-tools/lint@0.2.3
  - @lg-tools/slackbot@0.2.7
  - @lg-tools/test@0.4.8
  - @lg-tools/update@0.1.9
  - @lg-tools/validate@0.1.11

## 0.5.13

### Patch Changes

- @lg-tools/test@0.4.7

## 0.5.12

### Patch Changes

- af208260: Adds pre-release of codemods command
- Updated dependencies [af208260]
  - @lg-tools/codemods@0.0.2

## 0.5.11

### Patch Changes

- Updated dependencies [4951369a]
  - @lg-tools/build@0.5.1
  - @lg-tools/test@0.4.6

## 0.5.10

### Patch Changes

- Updated dependencies [c3906f78]
  - @lg-tools/build@0.5.0
  - @lg-tools/create@0.2.7
  - @lg-tools/install@0.1.8
  - @lg-tools/link@0.2.3
  - @lg-tools/lint@0.2.2
  - @lg-tools/slackbot@0.2.6
  - @lg-tools/test@0.4.5
  - @lg-tools/update@0.1.8
  - @lg-tools/validate@0.1.10

## 0.5.9

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [356a53fd]
- Updated dependencies [356a53fd]
  - @lg-tools/build@0.4.1
  - @lg-tools/lint@0.2.1
  - @lg-tools/create@0.2.6
  - @lg-tools/install@0.1.7
  - @lg-tools/link@0.2.2
  - @lg-tools/slackbot@0.2.5
  - @lg-tools/test@0.4.4
  - @lg-tools/update@0.1.7
  - @lg-tools/validate@0.1.9

## 0.5.8

### Patch Changes

- Updated dependencies [36070800]
- Updated dependencies [36070800]
  - @lg-tools/lint@0.2.0

## 0.5.7

### Patch Changes

- Updated dependencies [ab762558]
  - @lg-tools/build@0.4.0
  - @lg-tools/create@0.2.5
  - @lg-tools/install@0.1.6
  - @lg-tools/link@0.2.1
  - @lg-tools/lint@0.1.7
  - @lg-tools/slackbot@0.2.4
  - @lg-tools/test@0.4.3
  - @lg-tools/update@0.1.6
  - @lg-tools/validate@0.1.8

## 0.5.6

### Patch Changes

- Updated dependencies [ee6ad399]
  - @lg-tools/test@0.4.2

## 0.5.5

### Patch Changes

- Updated dependencies [2bceccb1]
- Updated dependencies [90bba7b2]
  - @lg-tools/slackbot@0.2.3
  - @lg-tools/validate@0.1.7
  - @lg-tools/create@0.2.4
  - @lg-tools/build@0.3.2
  - @lg-tools/link@0.2.0
  - @lg-tools/test@0.4.1
  - @lg-tools/install@0.1.5
  - @lg-tools/update@0.1.5

## 0.5.4

### Patch Changes

- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [0ece4ea0]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @lg-tools/validate@0.1.6
  - @lg-tools/test@0.4.0
  - @lg-tools/slackbot@0.2.2
  - @lg-tools/create@0.2.3
  - @lg-tools/install@0.1.4
  - @lg-tools/link@0.1.4
  - @lg-tools/update@0.1.4

## 0.5.3

### Patch Changes

- Updated dependencies [4822f43c]
- Updated dependencies [3e1a7bc3]
  - @lg-tools/build@0.3.1
  - @lg-tools/lint@0.1.6
  - @lg-tools/validate@0.1.5
  - @lg-tools/test@0.3.2

## 0.5.2

### Patch Changes

- Updated dependencies [954645a5]
  - @lg-tools/create@0.2.2

## 0.5.1

### Patch Changes

- Updated dependencies [74071b67]
  - @lg-tools/build@0.3.0
  - @lg-tools/create@0.2.1
  - @lg-tools/install@0.1.3
  - @lg-tools/link@0.1.3
  - @lg-tools/lint@0.1.5
  - @lg-tools/slackbot@0.2.1
  - @lg-tools/test@0.3.1
  - @lg-tools/update@0.1.3
  - @lg-tools/validate@0.1.4

## 0.5.0

### Minor Changes

- 3e8485e9: Adds `--parent` flag to `lg create` command. Passing in this flag will create a subcomponent of the given parent.

### Patch Changes

- Updated dependencies [3e8485e9]
  - @lg-tools/create@0.2.0

## 0.4.2

### Patch Changes

- Updated dependencies [73dd20f0]
- Updated dependencies [c9f0055a]
- Updated dependencies [3fe03b50]
  - @lg-tools/create@0.1.3
  - @lg-tools/validate@0.1.3
  - @lg-tools/lint@0.1.4

## 0.4.1

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [8e06bb20]
- Updated dependencies [4fcf2e94]
  - @lg-tools/build@0.2.1
  - @lg-tools/test@0.3.0

## 0.4.0

### Minor Changes

- 8183be9c: Adds `lg slackbot release` command to main CLI. Adds support for running the slackbot in other repos & for other scopes

### Patch Changes

- Updated dependencies [8183be9c]
  - @lg-tools/slackbot@0.2.0

## 0.3.0

### Minor Changes

- c2908c5a: Updates `build` package to use Rollup's JS API rather than spawning rollup using the command line. This gives us more control over the build, and we don't need to worry about the path of the `rollup` binary in consuming ap
  plications

### Patch Changes

- 6a1495fa: Adds CLI version flag
- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0
  - @lg-tools/create@0.1.2
  - @lg-tools/install@0.1.2
  - @lg-tools/link@0.1.2
  - @lg-tools/lint@0.1.3
  - @lg-tools/test@0.2.2
  - @lg-tools/update@0.1.2
  - @lg-tools/validate@0.1.2

## 0.2.1

### Patch Changes

- Update @lg-tools dependencies

## 0.2.0

### Minor Changes

- 61ab7efc: Add `testFilesPattern` argument to `lg test` which is passed to `jest` as `regexForTestFiles`. See [jest docs](https://jestjs.io/docs/cli#jest-regexfortestfiles) for more
- 06316485: Adds pass-through arguments to `lg test` command. You can now pass through any command accepted by the `jest` cli

### Patch Changes

- Updated dependencies [ff02d0bb]
- Updated dependencies [61ab7efc]
- Updated dependencies [06316485]
- Updated dependencies [61ab7efc]
  - @lg-tools/build@0.1.1
  - @lg-tools/test@0.2.0

## 0.1.0

### Minor Changes

- 215268ff: First prerelease of unified LeafyGreen CLI

### Patch Changes

- 215268ff: Fix package versions
- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Version fixes
- 215268ff: Fix broken builds
- 215268ff: Add meta as dependency
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/test@0.1.0
  - @lg-tools/lint@0.1.0
  - @lg-tools/link@0.1.0
  - @lg-tools/validate@0.1.0
  - @lg-tools/install@0.1.0
  - @lg-tools/create@0.1.0
  - @lg-tools/update@0.1.0
  - @lg-tools/build@0.1.0

## 0.1.0-beta.7

### Minor Changes

- 77d986917: First prerelease of unified LeafyGreen CLI

### Patch Changes

- 21e6319a8: Fix package versions
- 8d8a433d1: Adds README.md. Minor bug fixes
- c6d2ea11a: Version fixes
- 9476719bd: Fix broken builds
- 99789df1f: Add meta as dependency
- Updated dependencies [d8c10d39c]
- Updated dependencies [b56f6ed7d]
- Updated dependencies [2cdff54f0]
- Updated dependencies [8460cef9b]
- Updated dependencies [8d8a433d1]
- Updated dependencies [cc4bea164]
- Updated dependencies [c6d2ea11a]
- Updated dependencies [77d986917]
- Updated dependencies [77d986917]
- Updated dependencies
- Updated dependencies [d84e7eba1]
- Updated dependencies [9476719bd]
  - @lg-tools/test@0.1.0-beta.9
  - @lg-tools/lint@0.1.0-beta.9
  - @lg-tools/link@0.1.0-beta.10
  - @lg-tools/validate@0.1.0-beta.10
  - @lg-tools/install@0.1.0-beta.4
  - @lg-tools/create@0.1.0-beta.3
  - @lg-tools/update@0.1.0-beta.3
  - @lg-tools/build@0.1.0-beta.9
  - @lg-tools/meta@0.1.0-beta.4

## 0.1.0-beta.6

### Patch Changes

- Add meta as dependency

## 0.1.0-beta.5

### Patch Changes

- Adds README.md. Minor bug fixes
- Updated dependencies
  - @lg-tools/validate@0.1.0-beta.9
  - @lg-tools/install@0.1.0-beta.3
  - @lg-tools/create@0.1.0-beta.2
  - @lg-tools/update@0.1.0-beta.2
  - @lg-tools/build@0.1.0-beta.8
  - @lg-tools/link@0.1.0-beta.9
  - @lg-tools/lint@0.1.0-beta.8
  - @lg-tools/test@0.1.0-beta.8

## 0.1.0-beta.4

### Patch Changes

- 78acda539: Fix broken builds
- Updated dependencies [78acda539]
  - @lg-tools/validate@0.1.0-beta.8
  - @lg-tools/install@0.1.0-beta.2
  - @lg-tools/create@0.1.0-beta.1
  - @lg-tools/update@0.1.0-beta.1
  - @lg-tools/build@0.1.0-beta.7
  - @lg-tools/link@0.1.0-beta.8
  - @lg-tools/lint@0.1.0-beta.7
  - @lg-tools/test@0.1.0-beta.7

## 0.1.0-beta.3

### Patch Changes

- Fix package versions

## 0.1.0-beta.2

### Patch Changes

- Updated dependencies
  - @lg-tools/create@0.1.0-beta.0
  - @lg-tools/update@0.1.0-beta.0

## 0.1.0-beta.1

### Patch Changes

- Version fixes
- Updated dependencies
  - @lg-tools/validate@0.1.0-beta.7
  - @lg-tools/install@0.1.0-beta.1
  - @lg-tools/link@0.1.0-beta.7

## 0.1.0-beta.0

### Minor Changes

- First prerelease of unified LeafyGreen CLI

### Patch Changes

- Updated dependencies
  - @lg-tools/install@0.1.0-beta.0
  - @lg-tools/link@0.1.0-beta.6
