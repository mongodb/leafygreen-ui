# @leafygreen-ui/toolbar

## 1.1.3

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [9cf3b18]
  - @leafygreen-ui/descendants@3.0.6
  - @leafygreen-ui/icon-button@17.1.3
  - @leafygreen-ui/tooltip@14.2.3

## 1.1.2

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [c6b4d3f]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/hooks@9.2.2
  - @leafygreen-ui/icon-button@17.1.2
  - @leafygreen-ui/tooltip@14.2.2

## 1.1.1

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/descendants@3.0.5
  - @leafygreen-ui/icon-button@17.1.1
  - @leafygreen-ui/tooltip@14.2.1

## 1.1.0

### Minor Changes

- ceccfc1: Add `isTooltipEnabled` prop to `ToolbarIconButton` component for customizable tooltip behavior

### Patch Changes

- Updated dependencies [ff6b87e]
  - @leafygreen-ui/lib@15.5.0

## 1.0.6

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [1a5c69f]
- Updated dependencies [aeb3b3f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/icon-button@17.0.6
  - @leafygreen-ui/tooltip@14.1.4
  - @leafygreen-ui/hooks@9.1.4
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/emotion@5.0.3

## 1.0.5

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @leafygreen-ui/descendants@3.0.4
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/palette@5.0.2
  - @leafygreen-ui/tokens@3.2.4
  - @leafygreen-ui/tooltip@14.1.3
  - @lg-tools/test-harnesses@0.3.4

## 1.0.4

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/descendants@3.0.3
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/icon-button@17.0.4
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/palette@5.0.1
  - @leafygreen-ui/tokens@3.2.3
  - @leafygreen-ui/tooltip@14.1.2
  - @lg-tools/test-harnesses@0.3.3

## 1.0.3

### Patch Changes

- f9f9ed3: - Updates the active hover styles for `ToolbarIconButton`.
  - Updates the background-color for `ToolbarIconButton`.

## 1.0.2

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/descendants@3.0.2
  - @leafygreen-ui/hooks@9.1.1
  - @leafygreen-ui/icon@14.1.0
  - @leafygreen-ui/icon-button@17.0.3
  - @leafygreen-ui/leafygreen-provider@5.0.2
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.2
  - @leafygreen-ui/tooltip@14.1.1

## 1.0.1

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [f685e51]
- Updated dependencies [3bef1e7]
- Updated dependencies [3bef1e7]
- Updated dependencies [1eafbb5]
- Updated dependencies [da277d5]
- Updated dependencies [92c38b1]
- Updated dependencies [92c38b1]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/descendants@3.0.1
  - @leafygreen-ui/hooks@9.1.0
  - @leafygreen-ui/icon@14.1.0
  - @lg-tools/test-harnesses@0.3.2
  - @leafygreen-ui/tooltip@14.1.0
  - @leafygreen-ui/icon-button@17.0.2
  - @leafygreen-ui/leafygreen-provider@5.0.1
  - @leafygreen-ui/palette@5.0.0
  - @leafygreen-ui/tokens@3.1.1

## 1.0.0

### Major Changes

- caaaeeb: Initial release of `Toolbar`. Refer to the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/toolbar/README.md) for more information on usage and available props.

  ```tsx
  import {Toolbar, ToolbarIconButton} from `@leafygreen-ui/toolbar`;

  <Toolbar>
    <ToolbarIconButton glyph="Code" label="Code" active />
    <ToolbarIconButton glyph="Key" label="Key" />
    <ToolbarIconButton glyph="Plus" label="Plus" />
  </Toolbar>
  ```

### Patch Changes

- Updated dependencies [caaaeeb]
- Updated dependencies [8df5cd4]
- Updated dependencies [4bd4da3]
- Updated dependencies [caaaeeb]
  - @lg-tools/test-harnesses@0.3.1
  - @leafygreen-ui/tooltip@14.0.1
  - @leafygreen-ui/tokens@3.1.0
  - @leafygreen-ui/icon-button@17.0.1
  - @leafygreen-ui/descendants@3.0.0
