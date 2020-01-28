# @leafygreen-ui/icon

## 3.0.1

### Patch Changes

- 8fd107a: Fixes an issue where leafygreen-ui's local module definition for SVG files was overriding the module definition in consuming applications
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

- cdcf687: Add support for `title`

## 2.0.0

### Major Changes

- eb49b56: - Icon now uses currentColor to set fill. If the fill prop is not set, the fill of an icon will now be inherited from its decendent's color.
  - Icon now includes a `small` size variant that renders the glyph as a 14x14px SVG element.
