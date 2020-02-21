# @leafygreen-ui/lib

## 4.3.0

### Minor Changes

- 6eb9d26: This introduces the following updates:
  - Lib is updated internally with shared test helpers
  - Side Nav is updated to match design standards, and to export width and side padding so that users can reference both in integrating the side nav without hardcoding these values and to future-proof design changes
  - Mongo Nav is updated with a disabled state for the Org Nav, used for pages where there is no concept of a current project or organization. Additionally, Mongo Nav exports the different nav heights for the above reason

## 4.2.0

### Minor Changes

- fabc1c9: `isComponentType` function now types return-element more specifically, rather than just as `React.ReactElement`

## 4.1.0

### Minor Changes

- 11b2217: Introduces the SideNav component. Adds enumerated aria-current values to lib for general use.

### Patch Changes

- Updated dependencies [bd3bcd9]
  - @leafygreen-ui/emotion@2.0.1

## 4.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/emotion@2.0.0

## 3.2.0

### Minor Changes

- 2f9a300: Add keyMap to lib

## 3.1.0

### Minor Changes

- 9c45cb4: Add isComponentType function
