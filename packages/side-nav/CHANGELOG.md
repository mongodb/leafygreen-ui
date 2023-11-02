# @leafygreen-ui/side-nav

## 14.1.0

### Minor Changes

- 1e0cea9d: SideNav now forwards refs

### Patch Changes

- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [783add80]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0
  - @leafygreen-ui/tooltip@11.0.0

## 14.0.5

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
- Updated dependencies [7c3e6d39]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/tooltip@10.1.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/portal@5.0.3

## 14.0.4

### Patch Changes

- 324d9730: Updates SideNav component to conform to updated dark mode palette
- Updated dependencies [324d9730]
  - @leafygreen-ui/typography@17.0.2

## 14.0.3

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/portal@5.0.2
  - @leafygreen-ui/tooltip@10.0.11
  - @leafygreen-ui/typography@17.0.1

## 14.0.2

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0
  - @leafygreen-ui/tooltip@10.0.10

## 14.0.1

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
  - @leafygreen-ui/portal@5.0.1
  - @leafygreen-ui/tooltip@10.0.9

## 14.0.0

### Major Changes

- 4fcf2e94: Refactors the `CollapseToggle` tooltip so that it no longer uses a portal, as React 18 displays the tooltip in the wrong position when the side nav is toggled.

  Refactor the internal function, `renderedChildren`.

### Patch Changes

- 4fcf2e94: Adds a `nodeRef` to <Transition> to get rid of StrictMode warnings
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/portal@5.0.0
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/tooltip@10.0.8
  - @leafygreen-ui/box@3.1.8
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 13.0.13

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/box@3.1.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/portal@4.1.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/tooltip@10.0.7
  - @leafygreen-ui/typography@16.5.4

## 13.0.12

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/box@3.1.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/portal@4.1.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/tooltip@10.0.6
  - @leafygreen-ui/typography@16.5.3

## 13.0.11

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/tooltip@10.0.5
  - @leafygreen-ui/portal@4.1.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/box@3.1.5
  - @leafygreen-ui/lib@10.4.1

## 13.0.10

### Patch Changes

- 76161cf0: Minor fixes to stories
- 76161cf0: Updates devDependencies
- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/tooltip@10.0.4
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/portal@4.1.4
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 13.0.9

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- d2ce54e2f: Exports primary component props
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/box@3.1.4
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/portal@4.1.3
  - @leafygreen-ui/tooltip@10.0.2
  - @leafygreen-ui/typography@16.5.0

## 13.0.8

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

## 13.0.7

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/tooltip@10.0.0
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 13.0.6

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [111b680c5]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/tooltip@9.1.8
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/box@3.1.3
  - @leafygreen-ui/portal@4.1.2
  - @leafygreen-ui/tokens@2.0.3

## 13.0.5

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/box@3.1.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/portal@4.1.1
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/tooltip@9.1.7
  - @leafygreen-ui/typography@16.2.1

## 13.0.4

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [52dcb3316]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/portal@4.1.0
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/tokens@2.0.1
  - @leafygreen-ui/tooltip@9.1.6

## 13.0.3

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [51c544e2e]
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/a11y@1.4.0
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/tooltip@9.1.4
  - @leafygreen-ui/typography@16.0.1

## 13.0.2

### Patch Changes

- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/portal@4.0.9
  - @leafygreen-ui/tooltip@9.1.3

## 13.0.1

### Patch Changes

- 86e2924c8: Updates Story file with better default props
- Updated dependencies [d8c589d35]
- Updated dependencies [703db871f]
  - @leafygreen-ui/typography@15.2.1
  - @leafygreen-ui/palette@3.4.6

## 13.0.0

### Major Changes

- 351fbd350: Updates `SideNav` for dark mode brand refresh. Also applies new file structure internally.

## 12.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/portal@4.0.8
  - @leafygreen-ui/tokens@1.4.1
  - @leafygreen-ui/tooltip@9.0.3
  - @leafygreen-ui/typography@15.1.1

## 12.0.1

### Patch Changes

- 1a335d0b2: Migrate component internals to check for glyphs explicity, rather than for Icon components as well
- ed0e425e5: Adds `polished` as an explicit dependency
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [ed0e425e5]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/tooltip@9.0.1
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0

## 12.0.0

### Patch Changes

- Updated dependencies [07b3c797]
- Updated dependencies [95c9fb0d]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/tooltip@9.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 11.0.1

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/tooltip@8.0.1
  - @leafygreen-ui/a11y@1.3.4
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/portal@4.0.7
  - @leafygreen-ui/typography@14.0.1

## 11.0.0

### Patch Changes

- Updated dependencies [7162f1ab]
- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/tooltip@8.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/typography@14.0.0

## 10.1.2

### Patch Changes

- 24921fd2: Fix dependency range in package.json

## 10.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/portal@4.0.6
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/tooltip@7.1.3
  - @leafygreen-ui/typography@13.2.1

## 10.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- Updated dependencies [dafe6be8]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/tooltip@7.1.2
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/portal@4.0.5
  - @leafygreen-ui/tokens@1.3.3

## 10.0.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [a1202635]
- Updated dependencies [7caa1c3e]
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
- Updated dependencies [5de9d6ad]
- Updated dependencies [1e708bd3]
  - @leafygreen-ui/menu@16.0.0
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/a11y@1.3.1
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/portal@4.0.4
  - @leafygreen-ui/tokens@1.3.2
  - @leafygreen-ui/tooltip@7.1.1

## 10.0.1

### Patch Changes

- Updated dependencies [5aba12f1]
  - @leafygreen-ui/typography@13.1.1

## 10.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0
  - @leafygreen-ui/menu@14.0.0
  - @leafygreen-ui/typography@13.0.0
  - @leafygreen-ui/tooltip@7.0.4

## 9.0.3

### Patch Changes

- Updated dependencies [f0a357e2]
  - @leafygreen-ui/tooltip@7.0.3

## 9.0.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/box@3.0.7
  - @leafygreen-ui/menu@13.1.0
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/portal@4.0.3
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/typography@11.0.2
  - @leafygreen-ui/lib@9.3.0

## 9.0.1

### Patch Changes

- 07efe081: Updates '@leafygreen-ui/palette' dependency for SideNav and ConfirmationModal. Updates collapsed nav items for visual brand refresh
- Updated dependencies [2670e4db]
  - @leafygreen-ui/icon@11.10.0

## 9.0.0

### Major Changes

- 909209c4: Updates sidenav for Visual Brand Refresh

### Patch Changes

- Updated dependencies [909209c4]
- Updated dependencies [bc2558c5]
  - @leafygreen-ui/typography@11.0.1
  - @leafygreen-ui/menu@13.0.1

## 8.0.0

### Major Changes

- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [ddd0f1ec]
- Updated dependencies [5f28fce1]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/menu@13.0.0
  - @leafygreen-ui/icon@11.9.0
  - @leafygreen-ui/tooltip@7.0.2

## 7.2.1

### Patch Changes

- dea88e7d: Fixes a bug where nested sidenavs would remain open when selecting a different group
- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
- Updated dependencies [ddb50977]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/portal@4.0.0
  - @leafygreen-ui/tooltip@6.3.1
  - @leafygreen-ui/a11y@1.2.2
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/menu@11.0.1

## 7.2.0

### Minor Changes

- 19369b05: Adds support for nested SideNavGroups

## 7.1.2

### Patch Changes

- Updated dependencies [8409a9ea]
  - @leafygreen-ui/menu@11.0.0

## 7.1.1

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/a11y@1.2.1
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/menu@10.0.3
  - @leafygreen-ui/portal@3.1.3
  - @leafygreen-ui/tooltip@6.2.2

## 7.1.0

### Minor Changes

- 1fe3e1a3: - Adds support for 16px base font size to SideNav.
  - Exposes a `widthOverride` prop that accepts a number (pixel-value), allowing consuming applications to control the width.
  - SideNavItems can be nested inside of one and other, and will appear when any ancestor is active.

### Patch Changes

- Updated dependencies [1fe3e1a3]
  - @leafygreen-ui/leafygreen-provider@2.1.1

## 7.0.1

### Patch Changes

- Updated dependencies [faeb0ce0]
- Updated dependencies [5bb0e25f]
- Updated dependencies [a4d3f000]
  - @leafygreen-ui/icon@11.0.0
  - @leafygreen-ui/menu@10.0.1
  - @leafygreen-ui/tooltip@6.2.1

## 7.0.0

### Minor Changes

- 842fc55b: Adds `hasActiveItem` prop for manual control over active item in collapsed side navigation.
- 857a680a: Improves accessibility of focus state for vision-impaired users.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/portal@3.1.2
  - @leafygreen-ui/leafygreen-provider@2.1.0
  - @leafygreen-ui/tooltip@6.2.0
  - @leafygreen-ui/menu@10.0.0

## 6.0.1

### Patch Changes

- Updated dependencies [90321b36]
- Updated dependencies [46f5de0b]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/a11y@1.2.0
  - @leafygreen-ui/tooltip@6.1.8
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/menu@9.1.4
  - @leafygreen-ui/portal@3.1.1

## 6.0.0

### Major Changes

- 2f0775ec: Redesigns the side navigation, adding the ability for a user to collapse it, and improving accessibility.

### Patch Changes

- Updated dependencies [2f0775ec]
- Updated dependencies [2f0775ec]
- Updated dependencies [2f0775ec]
  - @leafygreen-ui/a11y@1.1.0
  - @leafygreen-ui/icon@10.2.0
  - @leafygreen-ui/lib@6.3.0

## 5.0.4

### Patch Changes

- Updated dependencies [4b387979]
  - @leafygreen-ui/menu@9.1.3

## 5.0.3

### Patch Changes

- Updated dependencies [c8aee7eb]
  - @leafygreen-ui/palette@3.1.1

## 5.0.2

### Patch Changes

- ee766843: Updates Chevron title in SideNavGroup based on its open state. When open, the title is appropriately Chevron Down Icon and when closed, Chevron Right Icon.

## 5.0.1

### Patch Changes

- Updated dependencies [f3523462]
  - @leafygreen-ui/menu@9.1.2

## 5.0.0

### Major Changes

- ee7923d3: Performs some internal code refactoring with improved typing.

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/menu@9.1.1
  - @leafygreen-ui/lib@6.1.2

## 4.0.3

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/menu@9.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 4.0.2

### Patch Changes

- Updated dependencies [f7b3d668]
  - @leafygreen-ui/menu@9.0.2

## 4.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/emotion@3.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/menu@9.0.1
  - @leafygreen-ui/palette@3.0.1

## 4.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/emotion@3.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/menu@9.0.0
  - @leafygreen-ui/palette@3.0.0

## 3.2.0

### Minor Changes

- f8b285a7: Adds `initialCollapsed` prop

### Patch Changes

- Updated dependencies [a18b4e1b]
  - @leafygreen-ui/menu@8.0.0

## 3.1.0

### Minor Changes

- dd0b6d5f: Adds `collapsible` prop to SideNavGroup

### Patch Changes

- @leafygreen-ui/menu@7.0.10

## 3.0.10

### Patch Changes

- Updated dependencies [47846c77]
  - @leafygreen-ui/menu@7.0.9

## 3.0.9

### Patch Changes

- e599707: Require lodash dependencies instead of inlining them.

## 3.0.8

### Patch Changes

- Updated dependencies [6b0d0a2]
  - @leafygreen-ui/menu@7.0.8

## 3.0.7

### Patch Changes

- @leafygreen-ui/menu@7.0.7

## 3.0.6

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/emotion@2.0.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/menu@7.0.6
  - @leafygreen-ui/palette@2.0.2

## 3.0.5

### Patch Changes

- @leafygreen-ui/leafygreen-provider@1.1.3
- @leafygreen-ui/menu@7.0.5

## 3.0.4

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.2
  - @leafygreen-ui/menu@7.0.4

## 3.0.3

### Patch Changes

- Updated dependencies [e8f5376]
  - @leafygreen-ui/menu@7.0.3

## 3.0.2

### Patch Changes

- Updated dependencies [083eec3]
- Updated dependencies [083eec3]
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/menu@7.0.2

## 3.0.1

### Patch Changes

- Updated dependencies [0593116]
  - @leafygreen-ui/menu@7.0.1

## 3.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

### Patch Changes

- Updated dependencies [1d24966]
  - @leafygreen-ui/menu@7.0.0

## 2.0.14

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/menu@6.0.14

## 2.0.13

### Patch Changes

- Updated dependencies [1d86d56]
  - @leafygreen-ui/menu@6.0.13

## 2.0.12

### Patch Changes

- @leafygreen-ui/menu@6.0.12

## 2.0.11

### Patch Changes

- Updated dependencies [05779a1]
  - @leafygreen-ui/menu@6.0.11

## 2.0.10

### Patch Changes

- Updated dependencies [a11b521]
  - @leafygreen-ui/menu@6.0.10

## 2.0.9

### Patch Changes

- Updated dependencies [2a03117]
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/menu@6.0.9

## 2.0.8

### Patch Changes

- Updated dependencies [0391d01]
  - @leafygreen-ui/menu@6.0.8

## 2.0.7

### Patch Changes

- Updated dependencies [75c0693]
  - @leafygreen-ui/menu@6.0.7
  - @leafygreen-ui/palette@2.0.1

## 2.0.6

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/lib@4.4.1
  - @leafygreen-ui/menu@6.0.6

## 2.0.5

### Patch Changes

- Updated dependencies [64c03e7]
  - @leafygreen-ui/menu@6.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [94ed125]
  - @leafygreen-ui/leafygreen-provider@1.1.0
  - @leafygreen-ui/menu@6.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [dd342f5]
  - @leafygreen-ui/menu@6.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [cda96b2]
  - @leafygreen-ui/menu@6.0.2

## 2.0.1

### Patch Changes

- 0c26f35: Fixes inconsistencies in active/hover highlight sizes

## 2.0.0

### Major Changes

- ed2e2f8:
  - Wrap SideNavItem components in `React.useRef`
  - Update `z-index` rules on hover styles for SideNavItem components

## 1.1.1

### Patch Changes

- Updated dependencies [704e25c]
- Updated dependencies [347bcf6]
  - @leafygreen-ui/lib@4.3.1
  - @leafygreen-ui/menu@6.0.1

## 1.1.0

### Minor Changes

- 6eb9d26:
  - Exports width and side padding so that users can reference both in integrating the component without hardcoding these values and to future-proof design changes
  - Design updates to match standards

### Patch Changes

- Updated dependencies [6eb9d26]
  - @leafygreen-ui/lib@4.3.0

## 1.0.4

### Patch Changes

- 3a7bd19: Modifies styles to avoid conflicts with pre-existing focus states of anchors

## 1.0.3

### Patch Changes

- d766d73: Adjusts spacing in SideNav
- Updated dependencies [786ccf1]
- Updated dependencies [690888a]
  - @leafygreen-ui/menu@6.0.0

## 1.0.2

### Patch Changes

- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/menu@5.1.0
  - @leafygreen-ui/lib@4.2.0

## 1.0.1

### Patch Changes

- 0eb010c: Improves handling of Aria roles in MenuItems, and increases label contrast for accessibility

## 1.0.0

### Major Changes

- 11b2217: Initial release of SideNav component

### Patch Changes

- Updated dependencies [11b2217]
- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/emotion@2.0.1
