# @leafygreen-ui/combobox

## 9.1.1

### Patch Changes

- cfa830701: Updates `ComboboxOption`.

  - Removes custom `min-height`, `padding`, and `line-height`. Instead these styles will come from `InputOptionContent`.

  Updates `ComboboxMenu`.

  - Updates the menu `background-color` to match the background from `InputOptionContent`.

- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/input-option@2.0.0
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/typography@19.2.1

## 9.1.0

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
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 9.0.0

### Major Changes

- c406ab85: [LG-4133](https://jira.mongodb.org/browse/LG-4133)

  1. Updated styling:

  - updated spacing for `'small'`, `'xsmall'`, and `'large'` size variants
  - updated placeholder text color
  - moved error icon from inside the input to underneath the input, alongside the error message

  2. A default `errorMessage` of `'This input needs your attention'` will render below combobox when state is invalid.

  3. Added a `valid` state with success icon and `successMessage` prop. A default `successMessage` of `'Success'` will render when state is valid. `successMessage` prop allows customization.

  4. Disabled `Combobox` component no longer renders the `disabled` attribute and instead relies on `aria-disabled` and `readonly` attributes.

  The last change is made to ensure that disabled components are still focusable to users using keyboard navigation.

  For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

  #### Migration guide

  Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

  ##### Jest/RTL

  Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

  However, there are cases where this may still need to be tested. You can replace any `expect(combobox).toBeDisabled()` with an explicit check for `expect(combobox).toHaveAttribute('aria-disabled', 'true')`.

  ##### Cypress

  Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(combobox).should('be.disabled');` checks with `cy.get(combobox).invoke('attr', 'aria-disabled').should('eq', 'true');`

### Patch Changes

- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
- Updated dependencies [c406ab85]
  - @leafygreen-ui/form-field@1.2.0
  - @leafygreen-ui/typography@19.1.0
  - @leafygreen-ui/tokens@2.6.0

## 8.1.4

### Patch Changes

- Updated dependencies [dfd6972c]
- Updated dependencies [1ec45a7e]
  - @leafygreen-ui/typography@19.0.0
  - @leafygreen-ui/checkbox@13.1.0
  - @leafygreen-ui/input-option@1.1.3

## 8.1.3

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
- Updated dependencies [7a0ff1be]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/checkbox@13.0.0
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/chip@1.0.2
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/input-option@1.1.2
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 8.1.2

### Patch Changes

- Updated dependencies [7c6166f9]
- Updated dependencies [74057388]
  - @leafygreen-ui/chip@1.0.1
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20
  - @leafygreen-ui/typography@18.2.3

## 8.1.1

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [8ad4fdbc]
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/popover@11.3.0
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/input-option@1.1.1
  - @leafygreen-ui/checkbox@12.1.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 8.1.0

### Minor Changes

- 36a8ded2: `description` prop can now be a `React.ReactNode` rather than a `string`

### Patch Changes

- Updated dependencies [c2854e9b]
- Updated dependencies [11d12cc4]
  - @leafygreen-ui/tokens@2.4.0
  - @leafygreen-ui/typography@18.2.1

## 8.0.0

### Major Changes

- 371aecac: - Adds optional `inputValue` and `onInputChange` props to Combobox. These props are used to control the value of the inner text input (not the selected combobox value itself).

  - `onChange` callback now fires when the input is blurred and the input contains a valid selection value.

### Patch Changes

- Updated dependencies [58e86c60]
- Updated dependencies [be92f17c]
  - @leafygreen-ui/typography@18.2.0
  - @leafygreen-ui/checkbox@12.1.0

## 7.2.0

### Minor Changes

- 0eba26c5: Combobox `onChange` callback now receives a 2nd argument. Use this argument to determine what value was inserted or deleted from a multiselect value.
  [JIRA Ticket](https://jira.mongodb.org/browse/LG-3959)

  Example:

  ```tsx
  <Combobox
    multiselect
    value={['apple', 'banana']}
    onChange={(val, diff) => {
      console.log(value); // ['apple']
      console.log(diff); // { diffType: 'delete', value: 'banana' }
    }}
  />
  ```

  ```ts
  interface DiffObject {
    diffType: 'insert' | 'delete';
    value: string | Array<string>;
  }
  ```

### Patch Changes

- bfda5392: Fixes bug where Combobox incorrectly makes selection on "Enter" key press.
- Updated dependencies [2bceccb1]
- Updated dependencies [2645cd50]
  - @leafygreen-ui/hooks@8.1.1
  - @leafygreen-ui/lib@13.2.1
  - @leafygreen-ui/tokens@2.3.0

## 7.1.0

### Minor Changes

- e7d206e6: Exports `ComboboxOptionProps` & `ComboboxGroupProps`.
  Internal refactor of `type` file organization.

## 7.0.1

### Patch Changes

- 9a471879: - Updates disabled dark mode caret from `gray.dark2` to `gray.dark1`
  - Updates dark mode dropdown border from `gray.dark3` to `gray.dark2`
- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/checkbox@12.0.20
  - @leafygreen-ui/inline-definition@6.0.13
  - @leafygreen-ui/input-option@1.0.13
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 7.0.0

### Major Changes

- 9a728c7b: Replaces internal `Chip` component with new LG `Chip` component and exposes an upgraded `TruncationLocation` object which capitalizes the first letter of each key. Instead of referring to it as `TruncationLocation.end`, it will now be represented as `TruncationLocation.End`.

### Patch Changes

- Updated dependencies [9a728c7b]
  - @leafygreen-ui/chip@1.0.0

## 6.0.15

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/checkbox@12.0.19
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/inline-definition@6.0.12
  - @leafygreen-ui/input-option@1.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/typography@17.0.1

## 6.0.14

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/checkbox@12.0.18
  - @leafygreen-ui/input-option@1.0.10

## 6.0.13

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/checkbox@12.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17

## 6.0.12

### Patch Changes

- 4fcf2e94: Type assert children as `Array<React.ReactNode>` inside the internal function `renderedMenuContents` and add explicit return type to internal function `renderCombobox`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/checkbox@12.0.16
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/inline-definition@6.0.11
  - @leafygreen-ui/input-option@1.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 6.0.11

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/checkbox@12.0.15
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/inline-definition@6.0.10
  - @leafygreen-ui/input-option@1.0.8
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 6.0.10

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/checkbox@12.0.14
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/inline-definition@6.0.9
  - @leafygreen-ui/input-option@1.0.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 6.0.9

### Patch Changes

- e8ef95e6: Updates disabled styles

## 6.0.8

### Patch Changes

- 2603d7ac: Component props now properly inherit from `PopoverProps` interface

## 6.0.7

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/inline-definition@6.0.8
  - @leafygreen-ui/input-option@1.0.6
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/checkbox@12.0.13
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 6.0.6

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/checkbox@12.0.12
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/inline-definition@6.0.7
  - @leafygreen-ui/input-option@1.0.5
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 6.0.5

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11

## 6.0.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/checkbox@12.0.11
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/inline-definition@6.0.6
  - @leafygreen-ui/input-option@1.0.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/typography@16.5.0

## 6.0.3

### Patch Changes

- 78d36936d: Combobox tooltips receive same zindex as Combobox menu
- Updated dependencies [6a3f03fd2]
  - @leafygreen-ui/typography@16.4.1

## 6.0.2

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/checkbox@12.0.10

## 6.0.1

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/checkbox@12.0.9
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2
  - @leafygreen-ui/inline-definition@6.0.5

## 6.0.0

### Major Changes

- 77320a6b8: - Adds new size variants, `small` and `xsmall`.
  - Removes truncation from chips when overflow is set to `scroll-x`. Chips do not need truncation since consumers can scroll horizontally to read the text.
  - Sets a max height of 3 rows to the input when overflow is `expand-y`. An overflow shadow is added to indicate there is a scroll.
  - Warning icon that appears when `state='error'` is now positioned to the left of the caret or clear icon. Previously it replaced the caret icon.

### Minor Changes

- 77320a6b8: - Adds `onClick` and `description` prop to `ComboboxOption`

### Patch Changes

- 77320a6b8: Switch to `useAutoScroll` hook to auto scroll the focused option
- d9d8f770d: Updates disabled styles
- ce0fcb3f6: Excludes `children` from story controls
- 77320a6b8: Fix padding discrepancy between Combobox, Select, Text Input, and Number Input
- Updated dependencies [55d33e435]
- Updated dependencies [77320a6b8]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/input-option@1.0.3
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/tokens@2.0.3

## 5.0.11

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/checkbox@12.0.8
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/inline-definition@6.0.4
  - @leafygreen-ui/input-option@1.0.2
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 5.0.10

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/checkbox@12.0.7
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/inline-definition@6.0.3
  - @leafygreen-ui/input-option@1.0.1
  - @leafygreen-ui/tokens@2.0.1

## 5.0.9

### Patch Changes

- 2e8a572db: Internal refactoring. Adds `input-option` as a dependency
- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1

## 5.0.8

### Patch Changes

- 95eeb5a06: Spread `...rest` to `ComboboxOption`
- d58af1054: Fixes bug where clicking the clear icon button triggered the menu to reopen.
- Updated dependencies [0541bd776]
- Updated dependencies [ec2a3d66d]
- Updated dependencies [ec2a3d66d]
  - @leafygreen-ui/lib@10.2.0
  - @leafygreen-ui/hooks@7.6.0

## 5.0.7

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.
- Updated dependencies [64eee134d]
- Updated dependencies [64eee134d]
  - @leafygreen-ui/inline-definition@6.0.2
  - @leafygreen-ui/popover@11.0.5
  - @leafygreen-ui/lib@10.1.0

## 5.0.6

### Patch Changes

- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/icon-button@15.0.4
  - @leafygreen-ui/checkbox@12.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/popover@11.0.4

## 5.0.5

### Patch Changes

- c4eb3ec26: Removes use of uiColors from component
- Updated dependencies [d8c589d35]
- Updated dependencies [703db871f]
  - @leafygreen-ui/typography@15.2.1
  - @leafygreen-ui/palette@3.4.6

## 5.0.4

### Patch Changes

- 4215ef424: Update some PropTypes to use `oneOfType` instead of `oneOf`. Also downgrades `Chalk` package.
- Updated dependencies [75f26afbc]
- Updated dependencies [95bd93ef9]
- Updated dependencies [3bb4b7506]
- Updated dependencies [a0d6638c4]
  - @leafygreen-ui/icon-button@15.0.3
  - @leafygreen-ui/icon@11.12.3
  - @leafygreen-ui/typography@15.2.0

## 5.0.3

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/checkbox@12.0.3
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/icon-button@15.0.2
  - @leafygreen-ui/inline-definition@6.0.1
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/popover@11.0.2
  - @leafygreen-ui/tokens@1.4.1
  - @leafygreen-ui/typography@15.1.1

## 5.0.2

### Patch Changes

- 38181cc1d: Update to consume darkMode from `useDarkMode`. Some components were setting `darkMode = false` as a default which would override the default value provided by the `LeafyGreenProvider`.
- Updated dependencies [38181cc1d]
  - @leafygreen-ui/checkbox@12.0.2

## 5.0.1

### Patch Changes

- 1a335d0b2: Migrate component internals to check for glyphs explicity, rather than for Icon components as well
- ed0e425e5: Adds `polished` as an explicit dependency
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0
  - @leafygreen-ui/checkbox@12.0.1
  - @leafygreen-ui/icon-button@15.0.1
  - @leafygreen-ui/popover@11.0.1

## 5.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/checkbox@12.0.0
  - @leafygreen-ui/icon-button@15.0.0
  - @leafygreen-ui/inline-definition@6.0.0
  - @leafygreen-ui/popover@11.0.0

## 4.0.1

### Patch Changes

- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon-button@14.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/checkbox@11.0.1
  - @leafygreen-ui/inline-definition@5.0.1
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/popover@10.0.1
  - @leafygreen-ui/typography@14.0.1

## 4.0.0

### Patch Changes

- d51afee1: Fixes a bug where the combobox Text Input content would overflow the container
- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/checkbox@11.0.0
  - @leafygreen-ui/icon-button@14.0.0
  - @leafygreen-ui/inline-definition@5.0.0
  - @leafygreen-ui/popover@10.0.0
  - @leafygreen-ui/typography@14.0.0

## 3.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/checkbox@10.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/icon-button@13.2.1
  - @leafygreen-ui/inline-definition@4.1.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/popover@9.1.1
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 3.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components
- 58a5a05e: - Ensures the combobox does not open on initial focus. The menu should only open when clicked, or a relevant key is pressed when the input is focused.
  - Opens the menu on `Enter` key press if the menu is closed.

### Patch Changes

- 3690df49: Extends `div` element props
- 58a5a05e: Adds missing PropTypes declarations
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/checkbox@10.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/icon-button@13.2.0
  - @leafygreen-ui/inline-definition@4.1.0
  - @leafygreen-ui/popover@9.1.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 3.0.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [1e708bd3]
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
- Updated dependencies [1e708bd3]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/popover@9.0.1
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/checkbox@10.0.3
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/icon-button@13.1.1
  - @leafygreen-ui/inline-definition@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2
  - @leafygreen-ui/tooltip@7.1.1

## 3.0.0

### Major Changes

- 2ff9ac32: Removes `Overflow.ExpandX` option.

  Overflow.ExpandX has always been an edge case, and is causing some issues with styling. Instead of increasing the complexity of the component to account for this edge case, we are removing this option.

  In most cases the `x` direction will be more space-limited and not many folks will opt to use this option. And if they do use expand-x, it's inherently limited to the size of the container/window and we'll need to restrict the width regardless. Just providing scroll-x and expand-y overflow options will cover most use cases.

### Patch Changes

- 090bd806: Fixes broken button styles in Combobox Chip.
  Reduces inline padding when `overflow === 'scroll-x'`.
  Flags `Overflow.ExpandX` as deprecated. Will be removed in the next major release.
- Updated dependencies [19a62173]
- Updated dependencies [30e038a3]
  - @leafygreen-ui/checkbox@10.0.1
  - @leafygreen-ui/palette@3.4.1

## 2.0.2

### Patch Changes

- bf320048: Updates the highlighting function (wrapJSX) to ensure all values are accepted, including regex special characters
- bf320048: Adds missing `leafygreen-provider` as a peer dependency
- Updated dependencies [65c86281]
- Updated dependencies [4ad8cbc0]
- Updated dependencies [9cb53590]
- Updated dependencies [bac1e809]
- Updated dependencies [bac1e809]
- Updated dependencies [9dafe83a]
  - @leafygreen-ui/icon-button@13.1.0
  - @leafygreen-ui/tooltip@7.1.0
  - @leafygreen-ui/typography@13.1.0
  - @leafygreen-ui/checkbox@10.0.0

## 2.0.1

### Patch Changes

- 5f82468e: Updates lodash imports in combobox. Lodash functions are now imported individually to reduce bundle size
- Updated dependencies [13a4adcc]
  - @leafygreen-ui/typography@13.0.1

## 2.0.0

### Major Changes

- a0beace8: Updates Combobox for visual refresh. Adds Dark Mode

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/checkbox@9.0.0
  - @leafygreen-ui/icon-button@13.0.0
  - @leafygreen-ui/popover@9.0.0
  - @leafygreen-ui/typography@13.0.0
  - @leafygreen-ui/tooltip@7.0.4
  - @leafygreen-ui/inline-definition@4.0.1

## 1.2.2

### Patch Changes

- fad2b287: Fixes a bug where occasionally the max menu height would be set to 0 if a ref was left unset

## 1.2.1

### Patch Changes

- Updated dependencies [f0a357e2]
  - @leafygreen-ui/tooltip@7.0.3

## 1.2.0

### Minor Changes

- 8ab46ed4: Adds `Large` size variant to Combobox. Additionally, restores legacy font in Label & Description
- d241af9e: Adds a `disabled` prop to ComboboxOptions. Note, disabled options will still be rendered in the menu, but not selectable

### Patch Changes

- d5c12b77: Updates filtering behavior. Now when opening the menu all options will be displayed, regardless of whether a selection has already been made
- a5d19177: Updates backdrop click behavior to match native `<select>`. Now, when clicking away from an open menu to close it, the Combobox will retain focus and no click handlers should fire on clicked elements until the menu is closed
- 8f7f8555: Updates combobox focus ring behavior. The combobox will now display a focus ring whenever the user is able to type in thy combobox. The outer focus ring will not render if a chip or the clear button is focused.
- 4f2ff237: - Updates min-width of the input to fit all characters (previously wide characters would be cut off).
  - Updates text wrapping of menu items so long unbroken strings (like ids) won't overflow, but wrap.
- d241af9e: Restores menu font to legacy Akzidenz font
- 6792bc44: Refactors Combobox and Select to use the new `useAvailableSpace` hook to calculate the max menu height
- 266e0d8e: Ensures the focus remains in the combobox when a chip is removed. Focus is set to either the input, or the next chip to the right, whichever is relevant
- 422dbfcd: Adds additional tests for internal Combobox utilities
- Updated dependencies [1356d50d]
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/checkbox@8.0.3
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/inline-definition@3.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 1.1.0

### Minor Changes

- e9c39305: - Reduces `min-width` of combobox down to `24px`

### Patch Changes

- a526ac52: Adds `@leafygreen-ui/tokens` and `@leafygreen-ui/tooltip` to dependencies
- e9c39305: Updates highlighting function to fix a bug where some text would be duplicated
  - Fixes left padding when `overflow="scroll-x"`
  - Clarifies wording for `initialValue` prop docs
- Updated dependencies [e630a889]
- Updated dependencies [2670e4db]
- Updated dependencies [6c12e85a]
  - @leafygreen-ui/checkbox@8.0.2
  - @leafygreen-ui/icon@11.10.0

## 1.0.3

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/checkbox@8.0.0
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/interaction-ring@3.0.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/typography@11.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/icon@11.8.0
  - @leafygreen-ui/checkbox@7.0.0
  - @leafygreen-ui/palette@3.3.2

## 1.0.1

### Patch Changes

- e8f1a97: - Updates focus behavior, allowing users to re-open the menu with the mouse after making a selection
  - Adds a warning if `multiselect` and `value` props don't align
  - Fixes a bug where long display names would get truncated early
  - Fixes a bug where the space bar wouldn't type a space character
  - Fixes a bug where some characters could not be typed when a `value` prop was passed in
  - Updates hooks dependency to `^7.2.0`
- Updated dependencies [e8f1a97]
  - @leafygreen-ui/icon@11.7.0
  - @leafygreen-ui/icon-button@10.0.0

## 1.0.0

### Major Changes

- 548ca2c: - Release Combobox as v1
  - Adds standard popover props: `usePortal`, `popoverZIndex`, `popoverClassName`, `portalContainer`, and `scrollContainer`.
  - Fixes issue where clicking on elements within a Combobox option wouldn't select that option.
