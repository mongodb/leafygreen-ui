# @leafygreen-ui/a11y

## 1.5.0

### Minor Changes

- cfa830701: Adds `AriaLabelPropsWithChildren` type that requires either `children`, or other `aria-label` attributes to be defined. Allows a component to accept any of `aria-label`, `aria-labelledby` or `children` as sufficient text for screen-reader accessibility

### Patch Changes

- Updated dependencies [cfa830701]
  - @leafygreen-ui/lib@13.6.1

## 1.4.13

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3

## 1.4.12

### Patch Changes

- 7f38e78a: Updates test to import `renderHook` from `@leafygreen-ui/testing-lib`
- ffd11f24: Update `AriaLabelProps` `label` type from `string` to `ReactNode`
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0

## 1.4.11

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0

## 1.4.10

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0

## 1.4.9

### Patch Changes

- Updated dependencies [fd907503]
  - @leafygreen-ui/hooks@8.0.0

## 1.4.8

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0

## 1.4.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/lib@10.4.3

## 1.4.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/lib@10.4.2

## 1.4.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/lib@10.4.1

## 1.4.4

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/hooks@7.7.3

## 1.4.3

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- Updated dependencies [32b3d3146]
  - @leafygreen-ui/hooks@7.7.2

## 1.4.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/lib@10.3.2

## 1.4.1

### Patch Changes

- 4ccc353e7: Add ts docs to `AriaLabelProps`
- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1

## 1.4.0

### Minor Changes

- 51c544e2e: Exports `AriaLabelProps`, A union interface requiring _either_ `aria-label` or `aria-labelledby`

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [ffb99f417]
  - @leafygreen-ui/hooks@7.5.0

## 1.3.4

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0

## 1.3.3

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/lib@9.5.1

## 1.3.2

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2

## 1.3.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/lib@9.4.2

## 1.3.0

### Minor Changes

- bac1e809: Adds new `usePrefersReducedMotion` hook to return whether the user has this preference set

## 1.2.2

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/lib@9.0.0

## 1.2.1

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0

## 1.2.0

### Minor Changes

- 90321b36: Adds `validateAriaLabelProps` functions to package.

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0

## 1.1.0

### Minor Changes

- 2f0775ec: Introduces prefersReducedMotion(), a utility for interpolating styles with Emotion built to support users with a preference set for reduced motion.

### Patch Changes

- Updated dependencies [2f0775ec]
  - @leafygreen-ui/lib@6.3.0

## 1.0.0

### Major Changes

- 2419a8e2: Initial release of a11y package
