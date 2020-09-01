# @leafygreen-ui/menu

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
