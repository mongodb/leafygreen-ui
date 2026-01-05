# @leafygreen-ui/code-editor

## 1.0.4

### Patch Changes

- Updated dependencies [fda2d29]
  - @leafygreen-ui/modal@21.0.0

## 1.0.3

### Patch Changes

- 19c0cbe: Refactor `IconButton` instances to use compact tooltip UI

## 1.0.2

### Patch Changes

- 9cf3b18: Updates provider peer dependency version string to correctly use `pnpm` `workspace` syntax
- Updated dependencies [9cf3b18]
  - @leafygreen-ui/input-option@4.1.3
  - @leafygreen-ui/icon-button@17.1.3
  - @leafygreen-ui/text-input@16.2.1
  - @leafygreen-ui/typography@22.2.2
  - @leafygreen-ui/checkbox@18.1.3
  - @leafygreen-ui/tooltip@14.2.3
  - @leafygreen-ui/button@25.1.3
  - @leafygreen-ui/badge@10.2.3
  - @leafygreen-ui/modal@20.3.1
  - @leafygreen-ui/menu@33.0.1

## 1.0.1

### Patch Changes

- a7fc5a8: - Fixes stuck loading state
  - Includes minor small visual improvements
- Updated dependencies [d8c4e35]
  - @leafygreen-ui/typography@22.2.1

## 1.0.0

### Major Changes

- f73bab7: This release marks the V1.0.0 release of `@leafygreen-ui/code-editor`.

  Fixes remaining known of bugs. These include:

  - Adds gutter padding between the border and the caret when line numbers are turned off
  - Fixes icon button vertical alignment in the panel
  - Adds comprehensive story, that also include tooltips
  - Increases tooltip speed
  - Fixes collapsed chevron alignment
  - Darkens unfold icon in dark mode
  - Fixes widths. This includes making sure the panel and editor containers respect any set widths
  - Corrects the color of the copied icon checkmark
  - Disabled undo/redo when no undo/redo actions are available
  - Hides blinking cursor when editor is in read only mode
  - Allows for CTRL+click to pull up the context menu without losing the selection.
  - Insert the cursor in the location of the undone action when the undo button is pressed in the panel menu
  - Sets the loading height to be the same height as the future rendered editor
  - Persists editor when props change
  - Assures that font size and dark mode are respected in the panel
  - Enhances tests

### Minor Changes

- 92693df: Updated major version to Shadow tokens. `shadow` object and its key/values have been changed. Other packages utilizing the shadow values have had a minor update to accommodate the changes.
- 392b350: Updated menu to require either refEl or trigger prop
- 2d50b59: - Adds a custom search panel to the `CodeEditor` component. Contains all of the same functionality that was in the built in panel but matches the LG design language.
  - Adds prop to allow consumers to enable/disable the search panel.

### Patch Changes

- Updated dependencies [92693df]
- Updated dependencies [392b350]
- Updated dependencies [c6b4d3f]
- Updated dependencies [888a37d]
- Updated dependencies [3d64531]
  - @leafygreen-ui/tokens@4.0.0
  - @leafygreen-ui/emotion@5.1.0
  - @leafygreen-ui/modal@20.3.0
  - @leafygreen-ui/menu@33.0.0
  - @leafygreen-ui/icon@14.6.1
  - @leafygreen-ui/typography@22.2.0
  - @leafygreen-ui/badge@10.2.2
  - @leafygreen-ui/button@25.1.2
  - @leafygreen-ui/checkbox@18.1.2
  - @leafygreen-ui/hooks@9.2.2
  - @leafygreen-ui/icon-button@17.1.2
  - @leafygreen-ui/input-option@4.1.2
  - @leafygreen-ui/text-input@16.1.3
  - @leafygreen-ui/tooltip@14.2.2

## 0.1.1

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`
- Updated dependencies [f3a8bdc]
- Updated dependencies [9778d7b]
- Updated dependencies [c8559f3]
  - @leafygreen-ui/emotion@5.0.4
  - @leafygreen-ui/modal@20.2.0
  - @leafygreen-ui/icon-button@17.1.1
  - @leafygreen-ui/typography@22.1.4
  - @leafygreen-ui/tooltip@14.2.1
  - @leafygreen-ui/button@25.1.1
  - @leafygreen-ui/badge@10.2.1
  - @leafygreen-ui/menu@32.1.2

## 0.1.0

### Minor Changes

- 67e1205: Introduces a new `@leafygreen-ui/code-editor` package - a comprehensive code editor component built on CodeMirror 6.

  ## Features

  **Core Editor:**

  - Syntax highlighting support for multiple programming languages (JavaScript, TypeScript, JSON, CSS, HTML, Java, C++, C#, Go, Python, PHP, Rust)
  - Code formatting with Prettier and WASM formatters
  - Line numbers, code folding, and line wrapping
  - Auto-completion and syntax-aware editing
  - Read-only mode support
  - Customizable themes (light/dark) and font sizes
  - Clickable URLs within code content

  **Built-in UI Features:**

  - **Panel**: Compound component providing toolbar with formatting, copy, undo/redo, download, and custom action buttons
  - Built-in context menu with copy, cut, paste functionality
  - Integrated copy button with visual feedback and tooltips
  - Diagnostic tooltips for displaying errors, warnings, and information

  **Accessibility & Testing:**

  - Full keyboard navigation support
  - Screen reader compatibility
  - Comprehensive test utilities for component testing
  - Storybook integration with multiple usage examples

  The package includes extensive TypeScript support, modular architecture for tree-shaking, and follows LeafyGreen design system patterns for consistent styling and behavior.
