# @leafygreen-ui/menu

## 4.0.1

### Patch Changes

- 2f9a300: Use exported keyMap from lib
- 759523f: Add border-box property to MenuItems and update documentation
- Updated dependencies [2f9a300]
  - @leafygreen-ui/lib@3.2.0

## 4.0.0

### Major Changes

- 9c45cb4: Traps focus within the Menu when Menu is open and keyboard navigation is now accessible
- f6b6b7a: Children of Popover are no longer rendered to the DOM when the Popover is closed

### Patch Changes

- 319fb82: Update PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
- Updated dependencies [f6b6b7a]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/popover@2.0.0

## 3.0.3

- Updated dependencies [12fb220]:
  - @leafygreen-ui/popover@1.2.0

## 3.0.2

### Patch Changes

- 3a24668: Replaced existing Escape handling with new useEscapeKey hook

## 3.0.1

### Patch Changes

- aaa895e:
  - Fixes storybook, such that it reflects a generic Menu rather than MongoMenu
  - Fixes bug with `disabled` MenuItem styles

## 3.0.0

### Major Changes

- 23c7d20: Changed the semantic HTML for MenuItem component, as well as updated the styles of the entire Menu, which involved removing @leafygreen-ui/theme as a dependency and adding @leafygreen-ui/palette.

### Patch Changes

- ec4d8da: Removed `role='menu'` from MenuGroup in order to make component accessible

## 2.0.0

### Major Changes

- 7825641: Updated Menu API, such that the controlled version now accepts open and setOpen props. Using setOpen allows leafygreen to handle backdrop clicks and escape key-presses for consuming applications.

  - Previously the prop that controlled whether or not the Menu component would appear as open was called `active`, now the prop's name is `open`.
  - Added `setOpen` prop to allow leafygreen to help a consuming application, using the controlled api, close `Menu` component when backdrop is clicked or escape key is pressed.
  - Added `shouldClose` prop, so that consuming application can opt-out of default closing behavior.
