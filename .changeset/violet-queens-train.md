---
'@leafygreen-ui/code-editor': minor
---

Adds comprehensive code formatting functionality to CodeEditor

This release introduces a powerful code formatting system that supports multiple programming languages:

**New Features:**

- **Panel Integration**: Format button in Panel component with automatic language detection
- **Programmatic Formatting**: `formatCode` method available via CodeEditor ref and context
- **Standalone Hook**: `useCodeFormatter` hook for independent formatting functionality
- **Multi-language Support**: JavaScript/JSX, TypeScript/TSX, CSS, HTML, JSON, Java, C++, C#, Go, and Python
- **Configurable Options**: Support for formatting options like semicolons, quotes, line width, and more

**Supported Languages:**

- **Prettier-based**: JavaScript, JSX, TypeScript, TSX, CSS, HTML, JSON
- **WASM-based**: Java (clang-format), C++ (clang-format), C# (clang-format), Go (gofmt), Python (ruff)

**New Dependencies:**

- `prettier` (2.8.8) - Core formatting engine
- `@wasm-fmt/clang-format` (^20.1.7) - C++/C# formatting via WASM
- `@wasm-fmt/gofmt` (^0.4.9) - Go formatting via WASM
- `@wasm-fmt/ruff_fmt` (^0.10.0) - Python formatting via WASM

**New Exports:**

- `useCodeFormatter` - Standalone formatting hook
- `FormattingOptions` - TypeScript interface for formatting configuration

**Enhanced Components:**

- **Panel**: New `isFormattingAvailable` context integration and intelligent format button state
- **CodeEditor**: Enhanced context with formatting capabilities and ref methods

The formatting system automatically loads required dependencies and provides fallback behavior for unsupported languages. Format button is automatically disabled when formatting is not available for the current language.
