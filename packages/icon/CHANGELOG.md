# @leafygreen-ui/icon

## 4.2.0

### Minor Changes

- a2948f6: Adds University glyph

## 4.1.0

### Minor Changes

- 71327dd: Adds ActivityFeed, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Folder, InviteUser, and Megaphone icons

## 4.0.0

### Major Changes

- 0a75bd6: Changes values of `large` and `xlarge` icons to be `20` and `24` respectively. If using `<Icon size="large" />` previously, update to `<Icon size="xlarge" />`

### Patch Changes

- Updated dependencies [fabc1c9]
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 8fd107a: Fixes an issue where local module definition for SVG files was overriding the module definition in consuming applications
- Updated dependencies [11b2217]
  - @leafygreen-ui/lib@4.1.0

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 2.1.0

### Minor Changes

- cdcf687: Adds support for `title` prop

## 2.0.0

### Major Changes

- eb49b56:
  - Uses `currentColor` to set fill. If the fill prop is not set, the fill of an icon will now be inherited from its decendent's color.
  - Icon now includes a `small` size variant that renders the glyph as a 14x14px SVG element.
