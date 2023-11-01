# @leafygreen-ui/guide-cue

## 5.0.5

### Patch Changes

- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [783add80]
- Updated dependencies [f077faf1]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0
  - @leafygreen-ui/tooltip@11.0.0
  - @leafygreen-ui/button@21.0.10

## 5.0.4

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
- Updated dependencies [90053e16]
- Updated dependencies [7c3e6d39]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/tooltip@10.1.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 5.0.3

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/tooltip@10.0.11
  - @leafygreen-ui/typography@17.0.1

## 5.0.2

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/tooltip@10.0.10

## 5.0.1

### Patch Changes

- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/a11y@1.4.9
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17
  - @leafygreen-ui/tooltip@10.0.9

## 5.0.0

### Major Changes

- 4fcf2e94: Downgrades `focus-trap-react` package to `^9.0.2` so that tests still pass without requiring the use of the `fallbackFocus` option on the `<FocusTrap>` component.

  Refactors multi-step guideCue so that the tooltip no longer uses a portal, as React 18 displays the tooltip in the wrong position when the viewport changes.

### Patch Changes

- 4fcf2e94: Add `focusTrapOptions` type
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/tooltip@10.0.8
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 4.0.12

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tooltip@10.0.7
  - @leafygreen-ui/typography@16.5.4

## 4.0.11

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/button@21.0.2
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tooltip@10.0.6
  - @leafygreen-ui/typography@16.5.3

## 4.0.10

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0

## 4.0.9

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tooltip@10.0.5
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 4.0.8

### Patch Changes

- 76161cf0: Minor fixes to stories
- 76161cf0: Updates devDependencies
- 76161cf0: Updates stories for Chromatic testing
- 76161cf0: update types for TooltipAlign and TooltipJustify and switched to const exports
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/tooltip@10.0.4
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/button@20.2.1
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/typography@16.5.1

## 4.0.7

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11
  - @leafygreen-ui/tooltip@10.0.3

## 4.0.6

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/tooltip@10.0.2
  - @leafygreen-ui/typography@16.5.0

## 4.0.5

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/a11y@1.4.4
  - @leafygreen-ui/tooltip@10.0.1

## 4.0.4

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 1e5dc3e33: Updates required props.
- 8ece56980: Removes the multi-step tooltip as a child of `Popover` and place it outside of `Popover` as a sibling.
- Updated dependencies [32b3d3146]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/tooltip@10.0.0
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2
  - @leafygreen-ui/button@20.0.6

## 4.0.3

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/button@20.0.4
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tooltip@9.1.7
  - @leafygreen-ui/typography@16.2.1

## 4.0.2

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/button@20.0.2
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/tooltip@9.1.6

## 4.0.1

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [1cff328a3]
- Updated dependencies [51c544e2e]
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/button@20.0.0
  - @leafygreen-ui/a11y@1.4.0
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/icon-button@15.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/tooltip@9.1.4
  - @leafygreen-ui/typography@16.0.1

## 4.0.0

### Major Changes

- 3a77f3ff7: Remove `TooltipContent` export from index.ts

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/button@19.0.4
  - @leafygreen-ui/icon-button@15.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/tooltip@9.1.3
  - @leafygreen-ui/popover@11.0.4

## 3.0.1

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/button@19.0.2
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/icon-button@15.0.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/popover@11.0.2
  - @leafygreen-ui/tooltip@9.0.3
  - @leafygreen-ui/typography@15.1.1

## 3.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [95c9fb0d]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/tooltip@9.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/button@19.0.0
  - @leafygreen-ui/icon-button@15.0.0
  - @leafygreen-ui/popover@11.0.0

## 2.0.1

### Patch Changes

- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon-button@14.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/button@18.0.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/tooltip@8.0.1
  - @leafygreen-ui/a11y@1.3.4
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/popover@10.0.1
  - @leafygreen-ui/typography@14.0.1

## 2.0.0

### Patch Changes

- a2b85e55: Adds `useIsomorphicLayoutEffect` to make sure the component is SSR-safe
- Updated dependencies [0b6435fa]
- Updated dependencies [7162f1ab]
- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/button@17.0.0
  - @leafygreen-ui/tooltip@8.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/icon-button@14.0.0
  - @leafygreen-ui/popover@10.0.0
  - @leafygreen-ui/typography@14.0.0

## 1.0.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/button@16.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/icon-button@13.2.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/popover@9.1.1
  - @leafygreen-ui/tooltip@7.1.3
  - @leafygreen-ui/typography@13.2.1

## 1.0.0

### Major Changes

- dafe6be8: Release GuideCue as v1

### Patch Changes

- Updated dependencies [dafe6be8]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/tooltip@7.1.2
  - @leafygreen-ui/button@16.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/icon-button@13.2.0
  - @leafygreen-ui/popover@9.1.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
