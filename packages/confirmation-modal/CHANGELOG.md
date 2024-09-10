# @leafygreen-ui/confirmation-modal

## 5.2.0

### Minor Changes

- 1e9f2030: - Drops the `isRequired` from the `buttonText` prop type. As of [version 5.1.0](https://github.com/mongodb/leafygreen-ui/blob/main/packages/confirmation-modal/CHANGELOG.md#510), `buttonText` is a deprecated prop that is now optional.
  - Fixes existing confirm button disabled state logic
    - Previously, when the modal was closed using the cancel or confirm button and reopened, the confirm button would always reset to a disabled state, disregarding `requiredInputText` prop value.
    - Now, the confirm button will reset to a disabled state only when `requiredInputText` is provided.
  - Adds missing confirm button disabled state logic
    - Previously, when the modal was closed using the modal close button and reopened, the confirm button would never reset to a disabled state.
    - Now, the confirm button will reset to a disabled state when `requiredInputText` is provided.

### Patch Changes

- Updated dependencies [7bc4fcde]
- Updated dependencies [1e9f2030]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/modal@16.0.8
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 5.1.0

### Minor Changes

- 9ef03272: - Adds new prop `confirmButtonProps`. This prop is an object that accepts all `Button` props except for the `variant` prop. The variant is controlled by the `variant` prop.
  - Adds new prop `cancelButtonProps`. This prop is an object that accepts all `Button` props. The `onClick` property will also fire when the `X` button, or backdrop is clicked.
  - Prop `onConfirm` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `onClick` property.
    ```js
    confirmButtonProps: {
      {
        onClick: () => {};
      }
    }
    ```
  - Prop `buttonText` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `children` property.
    ```js
    confirmButtonProps: {
      {
        children: 'hi';
      }
    }
    ```
  - Prop `submitDisabled` is now marked as `deprecated`. Please transition to `confirmButtonProps` and pass the `disabled` property.
    ```js
    confirmButtonProps: {
      {
        disabled: true;
      }
    }
    ```
  - Prop `onCancel` is now marked as `deprecated`. Please transition to `cancelButtonProps` and pass the `onClick` property.
    ```js
    cancelButtonProps: {
      {
        onClick: () => {};
      }
    }
    ```

### Patch Changes

- Updated dependencies [ae44834e]
- Updated dependencies [3273045c]
- Updated dependencies [3b86b3bd]
  - @leafygreen-ui/icon@12.4.0
  - @leafygreen-ui/text-input@13.1.0

## 5.0.14

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/button@21.2.0
  - @leafygreen-ui/text-input@13.0.2

## 5.0.13

### Patch Changes

- 4fa8281c: - Resets `confirm` button so that it is not enabled in a newly opened modal. [LG-4011](https://jira.mongodb.org/browse/LG-4011)
  - Updates `data-testid`'s to match [STYLEGUIDE.md](https://github.com/mongodb/leafygreen-ui/blob/main/STYLEGUIDE.md#variable-naming)
- Updated dependencies [9402ba0e]
- Updated dependencies [9b71e34d]
- Updated dependencies [27ad3121]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [c3906f78]
- Updated dependencies [070736c4]
  - @leafygreen-ui/icon@12.1.0
  - @leafygreen-ui/typography@18.4.0
  - @leafygreen-ui/text-input@13.0.0
  - @leafygreen-ui/lib@13.4.0
  - @leafygreen-ui/palette@4.0.10

## 5.0.12

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/button@21.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/modal@16.0.7
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/text-input@12.1.27
  - @leafygreen-ui/tokens@2.5.2

## 5.0.11

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/text-input@12.1.26
  - @leafygreen-ui/modal@16.0.6
  - @leafygreen-ui/typography@18.2.3

## 5.0.10

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/modal@16.0.5
  - @leafygreen-ui/icon@11.29.1

## 5.0.9

### Patch Changes

- ae4afdcd: Adds `data-testids` to better support end-to-end testing
- Updated dependencies [e6c70b73]
  - @leafygreen-ui/icon@11.28.0

## 5.0.8

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [0b91826e]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/text-input@12.1.23
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/button@21.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/modal@16.0.3

## 5.0.7

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/button@21.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/modal@16.0.2
  - @leafygreen-ui/text-input@12.1.22
  - @leafygreen-ui/typography@17.0.1

## 5.0.6

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/text-input@12.1.21

## 5.0.5

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/modal@16.0.0
  - @leafygreen-ui/button@21.0.5
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/text-input@12.1.19
  - @leafygreen-ui/typography@16.5.5

## 5.0.4

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/button@21.0.3
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/modal@15.0.6
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/text-input@12.1.18
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 5.0.3

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/button@21.0.2
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/modal@15.0.5
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/text-input@12.1.17
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 5.0.2

### Patch Changes

- Updated dependencies [cfba537d]
  - @leafygreen-ui/button@21.0.0

## 5.0.1

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/text-input@12.1.16
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/button@20.3.1
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/modal@15.0.4
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 5.0.0

### Major Changes

- 30bd6f50: Component now accepts a ref prop

### Patch Changes

- Updated dependencies [348e56cb]
- Updated dependencies [1e6ddb60]
- Updated dependencies [5c3b9a85]
  - @leafygreen-ui/icon@11.20.0
  - @leafygreen-ui/button@20.3.0

## 4.0.10

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/button@20.2.1
  - @leafygreen-ui/text-input@12.1.14
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 4.0.9

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/modal@15.0.3

## 4.0.8

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
- Updated dependencies [2dfc4d0ea]
  - @leafygreen-ui/button@20.1.0
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/modal@15.0.2
  - @leafygreen-ui/text-input@12.1.13
  - @leafygreen-ui/typography@16.5.0

## 4.0.7

### Patch Changes

- Updated dependencies [67a0ea5fe]
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/modal@15.0.0
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/text-input@12.1.11
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/button@20.0.6

## 4.0.6

### Patch Changes

- 25729b36a: Removes `size` prop from component, as width is fixed.
- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/button@20.0.4
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/modal@14.0.5
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/text-input@12.1.9
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 4.0.5

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
- Updated dependencies [52dcb3316]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/text-input@12.1.7
  - @leafygreen-ui/button@20.0.2
  - @leafygreen-ui/modal@14.0.3
  - @leafygreen-ui/tokens@2.0.1

## 4.0.4

### Patch Changes

- Updated dependencies [1cff328a3]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/button@20.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/modal@14.0.2
  - @leafygreen-ui/text-input@12.1.5
  - @leafygreen-ui/typography@16.0.1

## 4.0.3

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.

## 4.0.2

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/button@19.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/modal@14.0.1
  - @leafygreen-ui/text-input@12.1.4

## 4.0.1

### Patch Changes

- Updated dependencies [95bd93ef9]
- Updated dependencies [3bb4b7506]
- Updated dependencies [a0d6638c4]
- Updated dependencies [d5c206876]
- Updated dependencies [1271944b2]
  - @leafygreen-ui/icon@11.12.3
  - @leafygreen-ui/typography@15.2.0
  - @leafygreen-ui/modal@14.0.0
  - @leafygreen-ui/text-input@12.1.1

## 4.0.0

### Major Changes

- 07331dad9: Updates `Confirmation Modal` for dark mode brand refresh

### Patch Changes

- Updated dependencies [b7f7a4c95]
- Updated dependencies [07331dad9]
  - @leafygreen-ui/button@19.0.2
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/modal@13.0.0
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1
  - @leafygreen-ui/typography@15.1.1

## 3.1.4

### Patch Changes

- Updated dependencies [3cb2e1f7]
  - @leafygreen-ui/text-input@12.0.0
  - @leafygreen-ui/button@19.0.0
  - @leafygreen-ui/modal@12.0.0

## 3.1.3

### Patch Changes

- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/modal@11.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/button@18.0.0
  - @leafygreen-ui/text-input@11.0.1

## 3.1.2

### Patch Changes

- Updated dependencies [0b6435fa]
  - @leafygreen-ui/button@17.0.0
  - @leafygreen-ui/modal@11.0.0
  - @leafygreen-ui/text-input@11.0.0

## 3.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/button@16.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/modal@10.1.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/text-input@10.2.1
  - @leafygreen-ui/tokens@1.3.4

## 3.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Exports `ModalProps` from Modal.
  Extends `ModalProps` in Confirmation & Marketing modals
- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/button@16.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/modal@10.1.0
  - @leafygreen-ui/text-input@10.2.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 3.0.7

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/button@16.0.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/modal@10.0.1
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/text-input@10.1.3
  - @leafygreen-ui/tokens@1.3.2

## 3.0.6

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
- Updated dependencies [e317392f]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/text-input@10.0.0
  - @leafygreen-ui/button@16.0.0
  - @leafygreen-ui/modal@10.0.0

## 3.0.5

### Patch Changes

- fd2f6de0: Updates to TSDocs, PropTypes, and Storybook files
- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
- Updated dependencies [8d12b918]
- Updated dependencies [86a7f3c3]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/button@15.0.2
  - @leafygreen-ui/modal@9.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 3.0.4

### Patch Changes

- 07efe081: Updates '@leafygreen-ui/palette' dependency for SideNav and ConfirmationModal. Updates collapsed nav items for visual brand refresh
- Updated dependencies [646c00f7]
  - @leafygreen-ui/button@15.0.1

## 3.0.3

### Patch Changes

- Updated dependencies [3a14d852]
- Updated dependencies [91e24dfe]
- Updated dependencies [08fe9960]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
  - @leafygreen-ui/button@15.0.0
  - @leafygreen-ui/modal@9.0.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/text-input@9.0.0

## 3.0.2

### Patch Changes

- Updated dependencies [f3aad7e2]
- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [2f6e595d]
- Updated dependencies [f3aad7e2]
- Updated dependencies [c1f9c4d4]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1
  - @leafygreen-ui/modal@8.0.1
  - @leafygreen-ui/text-input@7.0.1

## 3.0.1

### Patch Changes

- 63f87292: Updating button version to v13.0.1

## 3.0.0

### Major Changes

- ab1fd9e: Updates modal and confirmation modal styles in line with visual brand refresh. Add prop closeIconColor.

### Patch Changes

- Updated dependencies [ab1fd9e]
  - @leafygreen-ui/modal@8.0.0

## 2.2.3

### Patch Changes

- Updated dependencies [b3ea62a]
  - @leafygreen-ui/modal@7.0.0

## 2.2.2

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [fe542c15]
- Updated dependencies [b8f03aa1]
- Updated dependencies [24930836]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/text-input@6.0.4
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/button@12.0.4
  - @leafygreen-ui/modal@6.1.2

## 2.2.1

### Patch Changes

- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
  - @leafygreen-ui/text-input@6.0.3
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/button@12.0.3
  - @leafygreen-ui/modal@6.1.1

## 2.2.0

### Minor Changes

- 04869b3b: Adds support for `darkMode` prop

### Patch Changes

- Updated dependencies [04869b3b]
- Updated dependencies [dda5c8bb]
- Updated dependencies [37780eb8]
  - @leafygreen-ui/modal@6.1.0
  - @leafygreen-ui/button@12.0.2
  - @leafygreen-ui/text-input@6.0.2

## 2.1.6

### Patch Changes

- Updated dependencies [801f3221]
  - @leafygreen-ui/text-input@6.0.0
  - @leafygreen-ui/button@12.0.0

## 2.1.5

### Patch Changes

- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/text-input@5.0.11
  - @leafygreen-ui/button@11.0.2
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/modal@6.0.2

## 2.1.4

### Patch Changes

- 65032024: Updates component to Button v11
- Updated dependencies [65032024]
- Updated dependencies [65032024]
  - @leafygreen-ui/palette@3.2.0
  - @leafygreen-ui/button@11.0.0

## 2.1.3

### Patch Changes

- Updated dependencies [c8aee7eb]
- Updated dependencies [fd9b1102]
  - @leafygreen-ui/palette@3.1.1
  - @leafygreen-ui/modal@6.0.0

## 2.1.2

### Patch Changes

- 23feeb60: Ensures that text that appears and functions like heading text is marked up as such
- Updated dependencies [36ec9078]
  - @leafygreen-ui/text-input@5.0.6

## 2.1.1

### Patch Changes

- Updated dependencies [8b0ea602]
- Updated dependencies [8b0ea602]
  - @leafygreen-ui/button@10.0.0
  - @leafygreen-ui/text-input@5.0.0

## 2.1.0

### Minor Changes

- 720078e7: Adds `submitDisabled` prop

### Patch Changes

- Updated dependencies [10bdc295]
- Updated dependencies [374430ea]
- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/button@9.0.0
  - @leafygreen-ui/text-input@4.1.1
  - @leafygreen-ui/modal@5.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 2.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/button@8.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/modal@5.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/text-input@4.0.1

## 2.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/button@8.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/modal@5.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/text-input@4.0.0

## 1.0.1

### Patch Changes

- Updated dependencies [6883ccd0]
- Updated dependencies [d5d40791]
  - @leafygreen-ui/button@7.0.0

## 1.0.0

### Major Changes

- ab4c074: Initial release of confirmation modal

### Patch Changes

- Updated dependencies [ab4c074]
  - @leafygreen-ui/modal@4.0.0
