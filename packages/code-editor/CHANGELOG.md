# @leafygreen-ui/code-editor

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
