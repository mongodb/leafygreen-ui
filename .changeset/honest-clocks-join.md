---
'@leafygreen-ui/code-editor': minor
---

**Feature**: Add download functionality to CodeEditor component

- **Imperative API**: Added `downloadContent(filename?)` method to CodeEditor ref handle for programmatic file downloads
- **Smart file extensions**: Automatic file extension mapping based on editor language (`.js`, `.ts`, `.py`, `.css`, etc.) with fallback to `.txt`
- **Panel integration**: Download button in Panel secondary menu now performs actual file downloads with proper filename handling
- **Context support**: Download function available to child components via `CodeEditorContext` for custom UI implementations
- **Content validation**: Prevents downloads of empty or whitespace-only content with user-friendly warnings
- **Enhanced TypeScript**: Complete `downloadContent` method documentation in `CodeEditorHandle` interface
- **Comprehensive testing**: Behavior-focused tests that verify actual download triggers rather than implementation details
- **Language support**: Built-in extension mapping for 16+ languages including JavaScript, TypeScript, Python, Java, Go, Rust, and more

**Technical implementation**: Uses browser-native Blob API and temporary anchor elements for downloads. Maintains full backward compatibility while adding new download capabilities. Language extension mapping ensures downloaded files have appropriate extensions for syntax highlighting in external editors.
