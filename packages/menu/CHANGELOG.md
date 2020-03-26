# @leafygreen-ui/menu

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
