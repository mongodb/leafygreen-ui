---
'@leafygreen-ui/code-editor': minor
---

**Feature**: Add comprehensive undo/redo functionality to CodeEditor component

- **Imperative API**: Added `undo()` and `redo()` methods to CodeEditor ref handle that return boolean success indicators
- **Panel integration**: Existing undo/redo buttons in Panel secondary menu now perform actual operations instead of just triggering callbacks
- **Context support**: Undo/redo functions available to child components via `CodeEditorContext` for custom UI implementations
- **Enhanced TypeScript**: Complete `CodeEditorHandle` interface documentation with all imperative methods (`getContents`, `formatCode`, `undo`, `redo`, `getEditorViewInstance`)
- **Test utilities**: New testing helpers including `editor.getContent()`, `editor.getHandle()`, `editor.interactions.undo()`, and `editor.interactions.redo()`, plus dedicated Panel testing utilities with selectors, interaction helpers, and context configuration for testing Panel components
- **Improved testing**: Functional tests verify actual content changes rather than just mock function calls
- **Documentation**: New "Imperative API" section in README with comprehensive examples and reorganized structure

**Technical implementation**: Leverages CodeMirror's built-in `@codemirror/commands` module with proper error handling and integration into existing lazy-loading architecture. Maintains full backward compatibility while extending functionality.
