# @leafygreen-ui/number-input

## 2.2.0

### Minor Changes

- 02e1d77e: Expose `portalRef` in components that use `Popover`:

  - `Combobox`
  - `DatePicker`
  - `GuideCue`
  - `Menu`
  - `NumberInput`
  - `Select`
  - `SplitButton`
  - `Tooltip`

  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/select@12.1.0
  - @leafygreen-ui/tooltip@11.1.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 2.1.0

### Minor Changes

- 3b86b3bd: Allow type of `ReactNode` for `errorMessage` and `successMessage` props in `NumberInput`, `TextArea`, and `TextInput`

### Patch Changes

- Updated dependencies [ae44834e]
- Updated dependencies [3273045c]
  - @leafygreen-ui/icon@12.4.0
  - @leafygreen-ui/form-field@1.2.3

## 2.0.0

### Major Changes

- c406ab85: [LG-4134](https://jira.mongodb.org/browse/LG-4134)

  1. Updated styling:

  - updated spacing for `'small'` and `'xsmall'` size variants
  - added `'large'` variant
  - updated placeholder text color
  - moved error icon from inside the input to underneath the input, alongside the error message

  2. Added default `errorMessage` of `'This input needs your attention'`

  3. Added `valid` state variant and `successMessage` prop

  - `successMessage` will render a default of `'Success'` and can be customized
  - `successMessage` will only render when `state=valid`

### Patch Changes

- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
  - @leafygreen-ui/form-field@1.2.0
  - @leafygreen-ui/typography@19.1.0
  - @leafygreen-ui/select@12.0.0
  - @leafygreen-ui/tokens@2.6.0

## 1.0.23

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/select@11.3.2
  - @leafygreen-ui/tooltip@11.0.4

## 1.0.22

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/button@21.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/select@11.2.3
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2
  - @leafygreen-ui/tooltip@11.0.3

## 1.0.21

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/select@11.2.2
  - @leafygreen-ui/tooltip@11.0.2
  - @leafygreen-ui/typography@18.2.3

## 1.0.20

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [8ad4fdbc]
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/popover@11.3.0
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/tooltip@11.0.1
  - @leafygreen-ui/select@11.2.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 1.0.19

### Patch Changes

- e57c35c7: Fixes a bug where onBlur would not get invoked when arrow buttons were blurred.
  [LG-3940](https://jira.mongodb.org/browse/LG-3940)
- Updated dependencies [8142d306]
- Updated dependencies [3208b813]
  - @leafygreen-ui/icon@11.29.0
  - @leafygreen-ui/tokens@2.5.0

## 1.0.18

### Patch Changes

- Updated dependencies [e3f4d9ce]
- Updated dependencies [ace9cc03]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [783add80]
- Updated dependencies [f077faf1]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/select@11.1.0
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0
  - @leafygreen-ui/tooltip@11.0.0
  - @leafygreen-ui/button@21.0.10

## 1.0.17

### Patch Changes

- 9a471879: - Updates dark mode dropdown border from `gray.dark3` to `gray.dark2`
  - Updates disabled dark mode input border from `gray.dark3` to `gray.dark2`
  - Updates disabled dark mode input background from `gray.dark4` to `gray.dark3`
- Updated dependencies [dd4f3da8]
- Updated dependencies [9a471879]
- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
- Updated dependencies [7c3e6d39]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/select@11.0.1
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/tooltip@10.1.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 1.0.16

### Patch Changes

- Updated dependencies [c5d95794]
- Updated dependencies [a4b3b704]
- Updated dependencies [324d9730]
  - @leafygreen-ui/select@11.0.0
  - @leafygreen-ui/button@21.0.8
  - @leafygreen-ui/typography@17.0.2

## 1.0.15

### Patch Changes

- Updated dependencies [3a9b274d]
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/select@10.3.16
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/tooltip@10.0.11
  - @leafygreen-ui/typography@17.0.1

## 1.0.14

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/select@10.3.15
  - @leafygreen-ui/tooltip@10.0.10

## 1.0.13

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/a11y@1.4.9
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17
  - @leafygreen-ui/select@10.3.14
  - @leafygreen-ui/tooltip@10.0.9

## 1.0.12

### Patch Changes

- 4fcf2e94: Move custom select menu button into separate components and passes custom select menu button props to new internal select prop, `__INTERNAL__menuButtonSlotProps__`.
- 4fcf2e94: Adds the `setOpen()` state update inside the [flushSync](https://react.dev/reference/react-dom/flushSync) callback to prevent batch updates in React 18. This addresses an issue where the unit tooltip would occasionally appear without a transition, particularly when hovering. This should have no impact on behavior in React 17.

  Updates `README` code snippet.

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
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
  - @leafygreen-ui/select@10.3.13
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 1.0.11

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/select@10.3.12
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/tooltip@10.0.7
  - @leafygreen-ui/typography@16.5.4

## 1.0.10

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
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/select@10.3.11
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/tooltip@10.0.6
  - @leafygreen-ui/typography@16.5.3

## 1.0.9

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0
  - @leafygreen-ui/select@10.3.9

## 1.0.8

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tooltip@10.0.5
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/select@10.3.8
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 1.0.7

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
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
  - @leafygreen-ui/select@10.3.7
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 1.0.6

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11
  - @leafygreen-ui/select@10.3.6
  - @leafygreen-ui/tooltip@10.0.3

## 1.0.5

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/select@10.3.5
  - @leafygreen-ui/tooltip@10.0.2
  - @leafygreen-ui/typography@16.5.0

## 1.0.4

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/a11y@1.4.4
  - @leafygreen-ui/select@10.3.4
  - @leafygreen-ui/tooltip@10.0.1

## 1.0.3

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/select@10.3.3
  - @leafygreen-ui/tooltip@10.0.0
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2
  - @leafygreen-ui/button@20.0.6

## 1.0.2

### Patch Changes

- 77320a6b8: Fix padding discrepancy between Combobox, Select, Text Input, and Number Input
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/tooltip@9.1.8
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/button@20.0.5
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/select@10.3.2
  - @leafygreen-ui/tokens@2.0.3

## 1.0.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/button@20.0.4
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/select@10.3.1
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/tooltip@9.1.7
  - @leafygreen-ui/typography@16.2.1

## 1.0.0

### Major Changes

- fb47557dd: First major release of `NumberInput`

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies
- Updated dependencies [af2e2bb74]
- Updated dependencies [ece595acd]
- Updated dependencies [9858ab8c5]
- Updated dependencies [fb47557dd]
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
- Updated dependencies [fb47557dd]
  - @leafygreen-ui/select@10.3.0
  - @leafygreen-ui/typography@16.2.0
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1
  - @leafygreen-ui/button@20.0.3
