# @lg-tools/cli

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
