# @lg-tools/storybook-addon

## 0.2.6

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @lg-tools/build@0.7.0
  - @lg-tools/storybook-decorators@0.3.0
  - @leafygreen-ui/tokens@2.11.1

## 0.2.5

### Patch Changes

- e639072e7: - Adds @lg-charts scope containing line-chart package.
  - Brings in necessary ECharts component dependencies.
  - Creates section for Charts in Storybook.

## 0.2.4

### Patch Changes

- Updated dependencies [fdd63dbe4]
  - @lg-tools/build@0.6.0
  - @lg-tools/storybook-decorators@0.2.10

## 0.2.3

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0
  - @lg-tools/storybook-utils@0.1.1

## 0.2.2

### Patch Changes

- Updated dependencies [9b71e34d]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/typography@18.4.0
  - @lg-tools/build@0.5.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10
  - @lg-tools/storybook-decorators@0.2.8

## 0.2.1

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
  - @leafygreen-ui/typography@18.3.0
  - @lg-tools/storybook-utils@0.1.0
  - @lg-tools/build@0.4.1
  - @lg-tools/storybook-decorators@0.2.7
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 0.2.0

### Minor Changes

- 36070800: Adds support for `@lg-chat` components

## 0.1.0

### Minor Changes

- 5546ffa3: Re-names `@lg-tools/storybook` to `@lg-tools/storybook-addon`

### Patch Changes

- Updated dependencies [ab762558]
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @lg-tools/build@0.4.0
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @lg-tools/storybook-decorators@0.2.6

## @lg-tools/storybook@0.3.5

### Patch Changes

- fbc2b7c8: Upgrades Storybook packages to v7.6.17
- Updated dependencies [fbc2b7c8]
- Updated dependencies [3208b813]
  - @lg-tools/storybook-decorators@0.2.5
  - @leafygreen-ui/tokens@2.5.0

## @lg-tools/storybook@0.3.4

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @lg-tools/storybook-decorators@0.2.4
  - @leafygreen-ui/lib@13.2.1
  - @lg-tools/build@0.3.2
  - @leafygreen-ui/tokens@2.3.0

## @lg-tools/storybook@0.3.3

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @lg-tools/storybook-decorators@0.2.2

## @lg-tools/storybook@0.3.2

### Patch Changes

- Updated dependencies [3a9b274d]
- Updated dependencies [74071b67]
  - @leafygreen-ui/lib@12.0.0
  - @lg-tools/build@0.3.0
  - @leafygreen-ui/typography@17.0.1
  - @lg-tools/storybook-decorators@0.2.1

## @lg-tools/storybook@0.3.1

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## @lg-tools/storybook@0.3.0

### Minor Changes

- 4fcf2e94: Bump `@mdx-js/react` to the latest major version, `2.3.0`. This version will not work with React 17.

  Modified the ReactDOM peerDependency to ensure compatibility with either version 17 or 18.

### Patch Changes

- 4fcf2e94: Modified the React peerDependency to ensure compatibility with either version 17 or 18.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [8e06bb20]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0
  - @lg-tools/build@0.2.1
  - @lg-tools/storybook-decorators@0.2.0
  - @leafygreen-ui/typography@16.5.5

## @lg-tools/storybook@0.2.1

### Patch Changes

- 6815ee6e: Updates README for storybook addon
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## @lg-tools/storybook@0.2.0

### Minor Changes

- 34cfcdff: Updates `storybook` package to be a Storybook addon.

  #### Usage

  1. Install

  ```bash
  > yarn add @lg-tools/storybook@latest
  ```

  2. Add to `./storybook/main.ts`

  ```ts
  export default {
    addons: ['@lg-tools/storybook'],
    framework: {
      name: '@storybook/react-webpack5',
      options: {
        fastRefresh: true,
        strictMode: true,
      },
    },
  };
  ```

  - There is no need for a `manager.ts`, `preview.ts`, or `*-head.html` file, unless you need to extend the defaults in this addon

## @lg-tools/storybook@0.1.4

### Patch Changes

- Updated dependencies [746962d9]
- Updated dependencies [c2908c5a]
- Updated dependencies [6776fee7]
  - @lg-tools/build@0.2.0

## @lg-tools/storybook@0.1.3

### Patch Changes

- cb1e4ba4: Sets @lg-tools package dependencies to specific versions.
  This should solve dependency resolution issues in consuming applications
- Updated dependencies [cb1e4ba4]
  - @lg-tools/build@0.1.2

## @lg-tools/storybook@0.1.2

### Patch Changes

- a370c9ef: Updates storybook main config. Prevents Storybook from building nested `*.story` files inside a package's `node_modules`.
- Updated dependencies [ff02d0bb]
  - @lg-tools/build@0.1.1

## @lg-tools/storybook@0.1.1

### Patch Changes

- 72dc68ad: Updates storybook main config. Prevents Storybook from building nested `*.story` files inside a package's `node_modules`.

## @lg-tools/storybook@0.1.0

### Minor Changes

- 215268ff: First pre-release of shared LeafyGreen Storybook tooling

### Patch Changes

- 215268ff: Adds README.md. Minor bug fixes
- 215268ff: Fix broken builds
- 215268ff: Updates dependencies
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
- Updated dependencies [215268ff]
  - @lg-tools/build@0.1.0
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2

## @lg-tools/storybook@0.1.0-beta.10

### Minor Changes

- 6d1a7bb9a: First pre-release of shared LeafyGreen Storybook tooling

### Patch Changes

- 8d8a433d1: Adds README.md. Minor bug fixes
- 9476719bd: Fix broken builds
- 7b48fe92d: Updates dependencies
- Updated dependencies [8d8a433d1]
- Updated dependencies [d40674fe1]
- Updated dependencies [d84e7eba1]
- Updated dependencies [9476719bd]
  - @lg-tools/build@0.1.0-beta.9
  - @leafygreen-ui/palette@5.0.0-beta.0
  - @leafygreen-ui/tokens@3.0.0-beta.0

## @lg-tools/storybook@0.1.0-beta.9

### Patch Changes

- Adds README.md. Minor bug fixes
- Updated dependencies
  - @lg-tools/build@0.1.0-beta.8

## @lg-tools/storybook@0.1.0-beta.8

### Patch Changes

- 78acda539: Fix broken builds
- Updated dependencies [78acda539]
  - @lg-tools/build@0.1.0-beta.7

## @lg-tools/storybook@0.1.0-beta.7

### Patch Changes

- Updates dependencies

## @lg-tools/storybook@0.1.0-beta.0-6

### Minor Changes

- 6d1a7bb9: First pre-release of shared LeafyGreen Storybook tooling

### Patch Changes

- Updated dependencies [d84e7eba]
  - @lg-tools/build@0.1.0-beta.6
