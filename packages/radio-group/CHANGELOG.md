# @leafygreen-ui/radio-group

## 12.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/tokens@2.11.1

## 11.0.3

### Patch Changes

- e7bc12814: Adds more thorough test coverage for disabled inputs
- Updated dependencies [c1b8b633b]
- Updated dependencies [fe2483937]
  - @leafygreen-ui/hooks@8.1.4

## 11.0.2

### Patch Changes

- 668cb1183: Ensures that event handlers do not fire when input is disabled

## 11.0.1

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 11.0.0

### Major Changes

- 7a0ff1be: [LG-4126](https://jira.mongodb.org/browse/LG-4126)

  Disabled `Checkbox`, `RadioBox`, and `Radio` components no longer render the `disabled` attribute, but rely on `aria-disabled` instead.

  This change is made to ensure that disabled components are still focusable to users using keyboard navigation.

  For more on `aria-disabled` see the [documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)

  Additionally, styling changes are made to ensure consistent implementation of `disabled` state styles.

  #### Migration guide

  Functionally, migration should be seamless, however there may be unit/integration/e2e tests that relied on this behavior.

  ##### Jest/RTL

  Generally, only this repo should need to test that these components have a specific attribute. We recommend updating unit tests to check that some event was or was not called.

  However, there are cases where this may still need to be tested. In these cases, replace any `expect(checkbox).toBeDisabled()` with an explicit check for `expect(checkbox).toHaveAttribute("aria-disabled", "true")`.

  ##### Cypress

  Similar to unit tests, you should generally test functionality and not implementation details. However, to test this in Cypress replace any `cy.get(checkbox).should('be.disabled');` checks with `cy.get(checkbox).invoke('attr', 'aria-disabled').should('eq', 'true');`

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 10.2.5

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [58f4a4c5]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/typography@18.2.2
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/hooks@8.1.2

## 10.2.4

### Patch Changes

- 0e6cb7a6: Updates the generated story in Chromatic to properly render children

## 10.2.3

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 10.2.2

### Patch Changes

- cd9952bb: Adds disabled cursor to disabled radio group.
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/typography@17.0.1

## 10.2.1

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 10.2.0

### Minor Changes

- 480cf95d: Adds `bold` prop to RadioGroup, such that you can change whether the label is displayed with a bold font weight.

## 10.1.11

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.8

## 10.1.10

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 10.1.9

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 10.1.8

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 10.1.7

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/lib@10.4.1

## 10.1.6

### Patch Changes

- 6c1b992e: Updates label color when disabled to match Figma spec

## 10.1.5

### Patch Changes

- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 10.1.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/typography@16.5.0

## 10.1.3

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/hooks@7.7.3

## 10.1.2

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 10.1.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 10.1.0

### Minor Changes

- bc7795932: - Adds a `description` prop to `Radio`.
  - Updates `RadioGroup` to leverage `flexbox`. Update `flex-direction` to render radios horizontrally

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/tokens@2.0.1

## 10.0.5

### Patch Changes

- bf2fedf6d: Version bumps lib
- 8c2755a9a: Uses Label from typography package, rather than the html tag. Refactors component to use new directory structure.
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/typography@16.0.1

## 10.0.4

### Patch Changes

- afde6f94c: RadioGroup inherits `darkMode` from `LeafyGreenProvider`
- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples
- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/palette@3.4.7

## 10.0.3

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/tokens@1.4.1

## 10.0.2

### Patch Changes

- a593238ff: Change darkMode disabled color from gray.dark1 to gray.base

## 10.0.1

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0

## 10.0.0

### Major Changes

- 30207122: Updates `RadioGroup` for dark mode brand refresh

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 9.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/interaction-ring@6.0.0
  - @leafygreen-ui/lib@10.0.0

## 8.1.2

### Patch Changes

- @leafygreen-ui/interaction-ring@5.0.0

## 8.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/interaction-ring@4.0.3
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/tokens@1.3.4

## 8.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- 3690df49: Spreads `...rest` on root element
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/interaction-ring@4.0.2
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 8.0.4

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/interaction-ring@4.0.1
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2

## 8.0.3

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/interaction-ring@4.0.0

## 8.0.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/lib@9.3.0

## 8.0.1

### Patch Changes

- Updated dependencies [e13d2487]
  - @leafygreen-ui/interaction-ring@3.0.0

## 8.0.0

### Major Changes

- 532986a: Updates radio group styles in line with visual brand refresh.

### Patch Changes

- Updated dependencies [532986a]
  - @leafygreen-ui/interaction-ring@2.0.0

## 7.0.6

### Patch Changes

- 6041b89b: Adds @leafygreen-ui/hooks to dependency list

## 7.0.5

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [fe542c15]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/interaction-ring@1.1.0
  - @leafygreen-ui/lib@9.0.0

## 7.0.4

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/interaction-ring@1.0.4

## 7.0.3

### Patch Changes

- 73b0ad00: Adds 'xsmall' size variant to valid array of PropType values for `size` prop

## 7.0.2

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/interaction-ring@1.0.2

## 7.0.1

### Patch Changes

- 03acbf6e: Sets `cursor:pointer` on Radio labels that are not disabled

## 7.0.0

### Major Changes

- 8b0ea602: Form-compatible components now display more visually consistent hover and focus states

### Patch Changes

- Updated dependencies [8b0ea602]
  - @leafygreen-ui/interaction-ring@1.0.0

## 6.0.3

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 6.0.2

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0

## 5.1.0

### Minor Changes

- cb12b399: Adds `xsmall` size for Charts

## 5.0.0

### Major Changes

- 1f7e9132: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the component appears in dark mode

## 4.0.3

### Patch Changes

- 6b0d0a2: Made some props optional that were previously required

## 4.0.2

### Patch Changes

- add8745: Make id generation deterministic using IdAllocator.create class. This improves SSR compatibility.

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.0.0

### Major Changes

- ea20761: Implements redesign for RadioGroup component, which includes changes to the DOM structure

### Patch Changes

- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 3.0.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 3.0.0

### Major Changes

- 823b057: Radio components no longer add className to both label and input element. Instead, the className is only applied to the label element.

## 2.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 1.3.4

### Patch Changes

- 7a4e32e: Updates label text adjacent to a disabled Checkbox, such that the cursor changes to 'not-allowed'
- ef114e6: Adds group role to RadioGroup container div and supplied aria-label to ensure component is accessible
