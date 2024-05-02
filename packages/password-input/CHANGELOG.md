# @leafygreen-ui/password-input

## 2.0.0

### Major Changes

- c406ab85: [LG-4135](https://jira.mongodb.org/browse/LG-4135)

  1. Updated styling:

  - updated spacing for `'small'` and `'large'` size variants
  - added `'xsmall'` variant
  - updated placeholder text color
  - removed validation icon from inside the input

  2. Added `errorMessage` and `successMessage` props

  - `errorMessage` will render a default of `'This input needs your attention'` and can be customized
  - `errorMessage` will only render when `state` is `warning` or `error`
  - `successMessage` will render a default of `'Success'` and can be customized
  - `successMessage` will only render when `state` is `valid`
  - both will only render if `aria-describedby` is undefined and `stateNotifications` is not an array

### Patch Changes

- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
  - @leafygreen-ui/form-field@1.2.0
  - @leafygreen-ui/typography@19.1.0
  - @leafygreen-ui/tokens@2.6.0

## 1.0.20

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 1.0.19

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 1.0.18

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/typography@18.2.3

## 1.0.17

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 1.0.16

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 1.0.15

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 1.0.14

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

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

## 1.0.12

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 1.0.11

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 1.0.10

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 1.0.9

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 1.0.8

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 1.0.7

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/typography@16.5.0

## 1.0.6

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/a11y@1.4.4

## 1.0.5

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 1.0.4

### Patch Changes

- 77320a6b8: Use token for large font size
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/tokens@2.0.3

## 1.0.3

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 1.0.2

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies
- Updated dependencies [ece595acd]
- Updated dependencies [9858ab8c5]
- Updated dependencies [89ede28ec]
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/typography@16.2.0
  - @leafygreen-ui/icon-button@15.0.8
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/icon@11.12.7
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 1.0.1

### Patch Changes

- 115dc632c: Remove ts-ignore on proptypes and fix `stateNotificationCheck` type
- 693e9696d: Adds `type="button"` to visibility toggle to prevent form submission when clicked
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/tokens@2.0.1

## 1.0.0

### Major Changes

- 4ccc353e7: First major release of `PasswordInput`

### Patch Changes

- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1
  - @leafygreen-ui/a11y@1.4.1
