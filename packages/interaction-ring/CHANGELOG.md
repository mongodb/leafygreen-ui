# @leafygreen-ui/interaction-ring

## 6.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1

## 5.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0

## 4.0.3

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4

## 4.0.2

### Patch Changes

- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3

## 4.0.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2

## 4.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 3.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [5f28fce1]
  - @leafygreen-ui/leafygreen-provider@2.2.0

## 2.0.0

### Major Changes

- 8457f92: Updates interaction ring styles in line with visual brand refresh

### Patch Changes

- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 1.1.1

### Patch Changes

- b3ea62a: Removes problematic default styles from InteractionRing component

## 1.1.0

### Minor Changes

- fe542c15: Fixes a bug in TextInput & TextArea where the focus ring was not visible when using the mouse. Also adds functionality to InteractioRing to ignore keyboard context and use the default focus behavior.

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/emotion@4.0.0
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.3

## 1.0.4

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.2

## 1.0.3

### Patch Changes

- b1854dd8: InteractionRing now uses focus blue in light and dark modes.

## 1.0.2

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.3

## 1.0.1

### Patch Changes

- 67edce02: Fixes issue where components using interaction ring do not have onFocus and onBlur handlers called

## 1.0.0

### Major Changes

- 8b0ea602: - Added an `InteractionRing` component for advanced use cases where one wants to apply standard visual hover and focus states to wrapped components.
