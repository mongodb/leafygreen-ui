# @leafygreen-ui/menu

## 13.1.1

### Patch Changes

- fad2b287: Fixes a bug where occasionally the max menu height would be set to 0 if a ref was left unset

## 13.1.0

### Minor Changes

- 6792bc44: Adds a `maxHeight` prop. Menu will automatically restrict its height to the smallest of `maxHeight` and the available vertical space (using the hook `useAvailableSpace`).

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/box@3.0.7
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 13.0.1

### Patch Changes

- bc2558c5: Adding named exports for select components and types
- Updated dependencies [bc2558c5]
  - @leafygreen-ui/icon-button@11.0.1

## 13.0.0

### Major Changes

- Updated dependencies [c48e943e]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- ddd0f1ec: Adds `aria-current` attribute to active menu item
- Updated dependencies [e13d2487]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/tokens@1.3.0

## 12.2.0

### Minor Changes

- 24d31147: Allows custom props to be passed to MenuItem components inside Menu/SubMenu

### Patch Changes

- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [ef84b5fd]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1
  - @leafygreen-ui/popover@7.2.3

## 12.1.0

### Minor Changes

- acd6919: Updates `MenuSeparator` to optionally accept a `className` prop

### Patch Changes

- acd6919: Removes an undocumented change where both `href` and `description` would be rendered if provided to `MenuItem`. Now only `description` will be rendered.
- acd6919: - Eliminates fuzzy text on hover in `menu` and `tabs`
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/palette@3.3.2
  - @leafygreen-ui/icon-button@10.0.0

## 12.0.0

### Major Changes

- 8457f92: Updates Menu in line with visual brand refresh. Note: menus are now dark with light text

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 11.0.1

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/icon-button@9.1.6
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/popover@7.2.2

## 11.0.0

### Major Changes

- 8409a9ea: Styles text on the MenuItem container such that styles can be overwritten by consuming applications

## 10.0.3

### Patch Changes

- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/icon-button@9.1.5
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/popover@7.2.1

## 10.0.2

### Patch Changes

- 4b7b7322: Adds `role='presentation'` to glyphs rendered before menu items

## 10.0.1

### Patch Changes

- 5bb0e25f: CaretIcons no longer announced to scren readers, since they are not focusable
- a4d3f000: Updates icons in inactive menu and submenu items to `uiColors.gray.dark1`

## 10.0.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0
  - @leafygreen-ui/popover@7.2.0

## 9.1.4

### Patch Changes

- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/icon-button@9.1.3
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/popover@7.1.4

## 9.1.3

### Patch Changes

- 4b387979: Adds `role="none"` to li element in `MenuItem` component

## 9.1.2

### Patch Changes

- f3523462: Implementation update that avoids some unnecessary rerenders

## 9.1.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [627333c2]
  - @leafygreen-ui/lib@6.1.2
  - @leafygreen-ui/icon-button@9.1.0

## 9.1.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/popover@7.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 9.0.2

### Patch Changes

- f7b3d668: Fixes issue where scrollbar is always visible

## 9.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/icon-button@9.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/popover@7.0.1

## 9.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/icon-button@9.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/popover@7.0.0

## 8.0.0

### Major Changes

- a18b4e1b: Menus are now scrollable when their contents exceed their size. Previously the excess content would be hidden.

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1
  - @leafygreen-ui/icon-button@8.0.1

## 7.0.10

### Patch Changes

- Updated dependencies [6e210765]
  - @leafygreen-ui/popover@6.0.0

## 7.0.9

### Patch Changes

- 47846c77: Fixes unintentional exclusion of `ref` from TypeScript typing of props for `Button`, `SubMenu`, and `MenuItem` components.
- Updated dependencies [a84219f1]
  - @leafygreen-ui/icon-button@8.0.0

## 7.0.8

### Patch Changes

- 6b0d0a2: Removed an extraneous propType
- Updated dependencies [a14a079]
- Updated dependencies [290c9fc]
  - @leafygreen-ui/box@2.1.4
  - @leafygreen-ui/popover@5.2.1

## 7.0.7

### Patch Changes

- Updated dependencies [ab4c074]
  - @leafygreen-ui/icon-button@7.0.0

## 7.0.6

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/icon-button@6.1.4
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/popover@5.1.4

## 7.0.5

### Patch Changes

- Updated dependencies [fa55b3d]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.3
  - @leafygreen-ui/popover@5.1.3

## 7.0.4

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/box@2.1.2
  - @leafygreen-ui/icon-button@6.1.2
  - @leafygreen-ui/leafygreen-provider@1.1.2
  - @leafygreen-ui/popover@5.1.2

## 7.0.3

### Patch Changes

- e8f5376: Ensures that only props that are of type `string` are recognized as being passed to the `href` prop.
- Updated dependencies [e8f5376]
- Updated dependencies [4873650]
  - @leafygreen-ui/box@2.1.1
  - @leafygreen-ui/icon@6.2.0
  - @leafygreen-ui/icon-button@6.1.1

## 7.0.2

### Patch Changes

- 083eec3: Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
- Updated dependencies [083eec3]
- Updated dependencies [083eec3]
- Updated dependencies [27f8ea1]
- Updated dependencies [27f8ea1]
  - @leafygreen-ui/popover@5.1.1
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/icon@6.1.2
  - @leafygreen-ui/icon-button@6.1.0

## 7.0.1

### Patch Changes

- 0593116: Uses enhanced `ExtendableBox` type to set smarter default `as` component in `MenuItem` and `SubMenu`
- Updated dependencies [0593116]
  - @leafygreen-ui/box@2.1.0

## 7.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 6.0.14

### Patch Changes

- eba8391: Component now extends `Box` in order to enforce stronger typings
- Updated dependencies [06fbf05]
- Updated dependencies [eba8391]
- Updated dependencies [eba8391]
  - @leafygreen-ui/popover@5.1.0
  - @leafygreen-ui/box@2.0.0
  - @leafygreen-ui/icon@6.1.1
  - @leafygreen-ui/icon-button@6.0.1

## 6.0.13

### Patch Changes

- 1d86d56: Imports Glyphs directly, rather than importing the entire Icon package, when Glyph components are used
- Updated dependencies [1d86d56]
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0
  - @leafygreen-ui/icon-button@6.0.0

## 6.0.12

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0
  - @leafygreen-ui/icon-button@5.0.4

## 6.0.11

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.
- Updated dependencies [2fc4ef9]
- Updated dependencies [05779a1]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0
  - @leafygreen-ui/popover@5.0.2
  - @leafygreen-ui/icon-button@5.0.3

## 6.0.10

### Patch Changes

- a11b521: Fixes issue with SubMenu, such that open is now set by Menu when the Menu itself is open

## 6.0.9

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
- Updated dependencies [c812eb3]
  - @leafygreen-ui/icon-button@5.0.2
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/popover@5.0.1
  - @leafygreen-ui/icon@5.1.0

## 6.0.8

### Patch Changes

- 0391d01: Fixes style bug when MenuItem is focused and rendered as anchor tag
- Updated dependencies [2176b77]
  - @leafygreen-ui/popover@5.0.0

## 6.0.7

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/palette@2.0.1
  - @leafygreen-ui/popover@4.0.1
  - @leafygreen-ui/icon-button@5.0.1

## 6.0.6

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon-button@5.0.0
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 6.0.5

### Patch Changes

- 64c03e7: Fixes SubMenuIcon padding to account for change in size of xlarge glyphs
- Updated dependencies [bc47b13]
- Updated dependencies [1b298cc]
  - @leafygreen-ui/popover@4.0.0
  - @leafygreen-ui/hooks@2.1.0

## 6.0.4

### Patch Changes

- Updated dependencies [4c268a5]
- Updated dependencies [94ed125]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.0
  - @leafygreen-ui/icon-button@4.1.5

## 6.0.3

### Patch Changes

- dd342f5: MenuItem component renders any ReactElement description, rather than only strings.
- Updated dependencies [e1568c6]
  - @leafygreen-ui/icon@4.3.0
  - @leafygreen-ui/icon-button@4.1.4

## 6.0.2

### Patch Changes

- cda96b2: Updates text color when MenuItem is focused

## 6.0.1

### Patch Changes

- 347bcf6: Fix typings in Menu component
- Updated dependencies [347bcf6]
- Updated dependencies [704e25c]
  - @leafygreen-ui/icon-button@4.1.1
  - @leafygreen-ui/lib@4.3.1

## 6.0.0

### Major Changes

- 786ccf1:
  - Changes `glyph` prop from `string` to `React.ReactElement` in SubMenu component
  - Adds `glyph` and `size` props to MenuItem component

### Minor Changes

- 690888a: Adds `spacing` prop to Menu component

### Patch Changes

- Updated dependencies [ac5c473]
  - @leafygreen-ui/hooks@2.0.1

## 5.1.0

### Minor Changes

- fabc1c9:
  - MenuItems accept an `as` prop to determine what component to render as.
  - Introduces `SubMenu` components with stronger accessibility logic

### Patch Changes

- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
- Updated dependencies [232cf52]
  - @leafygreen-ui/icon-button@4.0.0
  - @leafygreen-ui/lib@4.2.0
  - @leafygreen-ui/popover@3.0.2

## 5.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Minor Changes

- 5c9202d: Introduces support for LeafyGreenProvider for improved focus state management

### Patch Changes

- 31f6bfd: Removes deprecated `title` prop from the Menu component propTypes
- Updated dependencies [5c9202d]
- Updated dependencies [464c09d]
  - @leafygreen-ui/leafygreen-provider@1.0.0
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/popover@3.0.0

## 4.0.3

### Patch Changes

- 8c2e838: Updates styles to fix bugs on Safari and Firefox

## 4.0.2

### Patch Changes

- ad74307: Changes default behavior in MenuItems with anchor tags, such that the default is to `target="\_self"`, and ensures ability of consumer to override the default
- ff55bb5: Updates anchor styles to minimize overrides
- baf45f6: Allows target and rel props to be passed to MenuItem, when MenuItem is a link

## 4.0.1

### Patch Changes

- 2f9a300: Uses exported keyMap from lib
- 759523f: Adds border-box property to MenuItems and update documentation
- Updated dependencies [2f9a300]
  - @leafygreen-ui/lib@3.2.0

## 4.0.0

### Major Changes

- 9c45cb4: Traps focus within the Menu when Menu is open and keyboard navigation is now accessible
- f6b6b7a: No longer renders children of Popover component to the DOM when the Popover is closed

### Patch Changes

- 319fb82: Updates PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
- Updated dependencies [f6b6b7a]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/popover@2.0.0

## 3.0.3

- Updated dependencies [12fb220]:
  - @leafygreen-ui/popover@1.2.0

## 3.0.2

### Patch Changes

- 3a24668: Replaces existing Escape handling with new useEscapeKey hook

## 3.0.1

### Patch Changes

- aaa895e:
  - Fixes storybook, such that it reflects a generic Menu rather than MongoMenu
  - Fixes bug with `disabled` MenuItem styles

## 3.0.0

### Major Changes

- 23c7d20: Changes the semantic HTML for MenuItem component, as well as updates the styles of the entire Menu, which involves removing @leafygreen-ui/theme as a dependency and adding @leafygreen-ui/palette.

### Patch Changes

- ec4d8da: Removes `role='menu'` from MenuGroup in order to make component accessible

## 2.0.0

### Major Changes

- 7825641:
  - Updates Menu API, such that the controlled version now accepts `open` and `setOpen` props. Using `setOpen` allows leafygreen to handle backdrop clicks and Escape key-presses for consuming applications.
  - Previously the prop that controlled whether or not the Menu component would appear as open was called `active`, now the prop's name is `open`.
  - Adds `setOpen` prop to allow leafygreen to help a consuming application, using the controlled api, close `Menu` component when backdrop is clicked or escape key is pressed.
  - Adds `shouldClose` prop, so that consuming application can opt-out of default closing behavior.
