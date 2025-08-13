# Code Editor

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/code-editor.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/code-editor/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/code-editor
```

### Yarn

```shell
yarn add @leafygreen-ui/code-editor
```

### NPM

```shell
npm install @leafygreen-ui/code-editor
```

## Component

### `<CodeEditor>`

#### Example

```tsx
import { CodeEditor, LanguageName } from '@leafygreen-ui/code-editor';

const sampleCode = `// Your code goes here
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet('MongoDB user'));`;

<CodeEditor defaultValue={sampleCode} language={LanguageName.javascript} />;
```

#### Properties

| Name                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                         | Default     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------- |
| `baseFontSize` _(optional)_        | Font size of text in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `BaseFontSize`               | `14`        |
| `className` _(optional)_           | CSS class name to apply to the editor container.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `string`                     | `undefined` |
| `darkMode` _(optional)_            | Determines if the component appears in dark mode. When not provided, the component will inherit the dark mode state from the LeafyGreen Provider.                                                                                                                                                                                                                                                                                                                                                                              | `boolean`                    | `undefined` |
| `defaultValue` _(optional)_        | Initial value to render in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `string`                     | `undefined` |
| `enableClickableUrls` _(optional)_ | Renders URLs as clickable links in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `boolean`                    | `undefined` |
| `enableCodeFolding` _(optional)_   | Enables code folding arrows in the gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                    | `undefined` |
| `enableLineNumbers` _(optional)_   | Enables line numbers in the editor’s gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                    | `true`      |
| `enableLineWrapping` _(optional)_  | Enables line wrapping when the text exceeds the editor's width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `boolean`                    | `true`      |
| `extensions` _(optional)_          | Additional CodeMirror extensions to apply to the editor. These will be applied with high precendence, meaning they can override extensions applied through built in props. See the [CodeMirror v6 System Guide](https://codemirror.net/docs/guide/) for more information.                                                                                                                                                                                                                                                      | `Array<CodeMirrorExtension>` | `[]`        |
| `forceParsing` _(optional)_        | _**This should be used with caution as it can significantly impact performance!**_<br><br>Forces the parsing of the complete document, even parts not currently visible.<br><br>By default, the editor optimizes performance by only parsing the code that is visible on the screen, which is especially beneficial when dealing with large amounts of code. Enabling this option overrides this behavior and forces the parsing of all code, visible or not. This should generally be reserved for exceptional circumstances. | `boolean`                    | `false`     |
| `height` _(optional)_              | Sets the editor's height. If not set, the editor will automatically adjust its height based on the content.                                                                                                                                                                                                                                                                                                                                                                                                                    | `string`                     | `undefined` |
| `indentSize` _(optional)_          | Sets the editor's indent size on tab click.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `number`                     | `undefined` |
| `indentUnit` _(optional)_          | Sets the editor's indent unit on tab click.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `IndentUnits`                | `undefined` |
| `isLoading` _(optional)_           | Renders the editor in a loading state. The CodeEditor is an asynchronous component that relies on lazy loading of modules. Due to this, regardless of the `isLoading` prop, the editor will always render a loading state until all required modules are loaded.                                                                                                                                                                                                                                                               | `boolean`                    | `false`     |
| `language` _(optional)_            | Specifies the language for syntax highlighting and autocompletion. The following languages are supported:<br><ul><li>cpp</li><li>csharp</li><li>css</li><li>go</li><li>html</li><li>java</li><li>javascript</li><li>jsx</li><li>json</li><li>kotlin</li><li>php</li><li>python</li><li>ruby</li><li>rust</li><li>typescript</li><li>tsx</li></ul>                                                                                                                                                                              | `LanguageName`               | `undefined` |
| `maxHeight` _(optional)_           | Sets the editor's maximum height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `string`                     | `undefined` |
| `maxWidth` _(optional)_            | Sets the editor's maximum width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `string`                     | `undefined` |
| `minHeight` _(optional)_           | Sets the editor's minimum height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `string`                     | `undefined` |
| `minWidth` _(optional)_            | Sets the editor's minimum width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `string`                     | `undefined` |
| `onChange` _(optional)_            | Callback that receives the updated editor value when changes are made.                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `(value: string) => void`    | `undefined` |
| `placeholder` _(optional)_         | Value to display in the editor when it is empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `HTMLElement \| string`      | `undefined` |
| `readOnly` _(optional)_            | Enables read only mode, making the contents uneditable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `boolean`                    | `false`     |
| `tooltips` _(optional)_            | Add tooltips to the editor content that appear on hover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `Array<CodeEditorTooltip>`   | `undefined` |
| `value` _(optional)_               | Controlled value of the editor. If set, the editor will be controlled and will not update its value on change. Use `onChange` to update the value externally.                                                                                                                                                                                                                                                                                                                                                                  | `string`                     | `undefined` |
| `width` _(optional)_               | Sets the editor's width. If not set, the editor will be 100% width of its parent container.                                                                                                                                                                                                                                                                                                                                                                                                                                    | `string`                     | `undefined` |

## Code Formatting

The CodeEditor component includes built-in code formatting functionality is integrated into the `Panel` component or can be used independently via the `useFormattingExtension` hook.

### Supported Languages and Formatters

The formatting system supports multiple languages using different formatting backends:

#### Prettier-based Languages

These languages use [Prettier](https://prettier.io/) for code formatting:

- **JavaScript/JSX**: Uses `prettier/parser-babel`
- **TypeScript/TSX**: Uses `prettier/parser-typescript`
- **CSS**: Uses `prettier/parser-postcss`
- **HTML**: Uses `prettier/parser-html`
- **JSON**: Uses `prettier/parser-babel`
- **Java**: Uses `prettier-plugin-java`
- **Kotlin**: Uses `prettier-plugin-kotlin`
- **PHP**: Uses `@prettier/plugin-php`
- **Ruby**: Uses `@prettier/plugin-ruby`
- **Rust**: Uses `prettier-plugin-rust`

#### WASM-based Languages

These languages use WebAssembly-compiled formatters for in-browser formatting:

- **C/C++/C#**: Uses `@wasm-fmt/clang-format`
- **Go**: Uses `@wasm-fmt/gofmt`
- **Python**: Uses `@wasm-fmt/ruff_fmt`

### Using Code Formatting

#### Via CodeEditor and Panel

The formatting functionality is accessible through the `CodeEditor` component and automatically available in the `Panel` component:

```tsx
import { useRef } from 'react';
import {
  CodeEditor,
  Panel,
  type CodeEditorHandle,
  LanguageName,
} from '@leafygreen-ui/code-editor';

function MyComponent() {
  const editorRef = useRef<CodeEditorHandle>(null);

  const handleFormatCode = async () => {
    if (editorRef.current?.isFormattingAvailable()) {
      const formattedCode = await editorRef.current.formatCode();
      console.log('Formatted code:', formattedCode);
    }
  };

  return (
    <div>
      <CodeEditor
        ref={editorRef}
        defaultValue="const x=1;const y=2;"
        language={LanguageName.javascript}
        panel={<Panel showFormatButton />}
      />
      <button onClick={handleFormatCode}>Format Code Externally</button>
    </div>
  );
}
```

#### Via useFormattingExtension Hook

For more advanced use cases, you can use the `useFormattingExtension` hook directly:

```tsx
import {
  useFormattingExtension,
  useLazyModules,
  useFormattingModuleLoaders,
  LanguageName,
  type FormattingOptions,
} from '@leafygreen-ui/code-editor';

function MyFormattingComponent() {
  const moduleLoaders = useFormattingModuleLoaders(LanguageName.javascript);
  const { modules } = useLazyModules(moduleLoaders);

  const { formatCode, isFormattingAvailable } = useFormattingExtension({
    props: { language: LanguageName.javascript },
    modules,
  });

  const handleFormat = async () => {
    if (isFormattingAvailable()) {
      const options: FormattingOptions = {
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      };

      const formatted = await formatCode('const x=1;', options);
      console.log(formatted); // "const x = 1;"
    }
  };

  return <button onClick={handleFormat}>Format Code</button>;
}
```

### Formatting Options

The `FormattingOptions` interface provides configuration for different formatters:

```tsx
interface FormattingOptions {
  // Prettier options
  semi?: boolean; // Add semicolons (default: true)
  singleQuote?: boolean; // Use single quotes (default: true)
  tabWidth?: number; // Tab width (default: varies by language)
  useTabs?: boolean; // Use tabs instead of spaces (default: false)
  printWidth?: number; // Line length (default: varies by language)
  trailingComma?: 'none' | 'es5' | 'all'; // Trailing commas
  bracketSpacing?: boolean; // Spaces around object brackets
  jsxBracketSameLine?: boolean; // JSX bracket placement
  arrowParens?: 'avoid' | 'always'; // Arrow function parentheses
}
```

## Types and Variables

| Name                        | Description                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `CodeEditorProps`           | TypeScript interface defining all props that can be passed to the `CodeEditor` component.                       |
| `CodeEditorSelectors`       | Constant object containing CSS selectors for common CodeEditor elements. Useful for testing and custom styling. |
| `CodeEditorTooltip`         | TypeScript interface defining the structure for tooltips displayed on hover in the editor.                      |
| `CodeEditorTooltipSeverity` | Constant object defining possible severity levels for tooltips (`info`, `warning`, `error`, `hint`).            |
| `CodeMirrorExtension`       | Re-export of CodeMirror's `Extension` type. See https://codemirror.net/docs/ref/#state.Extension.               |
| `CodeMirrorState`           | Re-export of CodeMirror's `EditorState` type. See https://codemirror.net/docs/ref/#state.EditorState.           |
| `CodeMirrorView`            | Re-export of CodeMirror's `EditorView` type. See https://codemirror.net/docs/ref/#view.EditorView.              |
| `IndentUnits`               | Constant object defining indent unit options (`space`, `tab`) for the `indentUnit` prop.                        |
| `LanguageName`              | Constant object containing all supported programming languages for syntax highlighting.                         |
| `CodeEditorModules`         | TypeScript interface defining the structure of lazy-loaded CodeMirror modules used by extension hooks.          |
| `FormattingOptions`         | TypeScript interface defining formatting options for different formatters (Prettier and WASM-based).            |
| `CodeEditorHandle`          | TypeScript interface for the imperative handle of the CodeEditor component, including formatting methods.       |

## Test Utilities

The `@leafygreen-ui/code-editor` package provides a comprehensive testing utility to help you test CodeEditor components in your Jest tests.

### `renderCodeEditor(props?)`

Renders a CodeEditor component with the specified props for testing purposes.

**Parameters:**

- `props` _(optional)_: Partial `CodeEditorProps` to pass to the CodeEditor component

**Returns:**

- `container`: The rendered container element from `@testing-library/react`
- `editor`: Editor test utilities object with methods for interacting with the editor

**Example:**

```tsx
import { renderCodeEditor } from '@leafygreen-ui/code-editor';

test('renders code editor with default value', async () => {
  const { editor, container } = renderCodeEditor({
    defaultValue: 'console.log("Hello World");',
  });
  await editor.waitForEditorView();

  expect(container).toHaveTextContent('console.log("Hello World");');
});
```

### Editor Test Utilities

The `editor` object returned by `renderCodeEditor` provides the following methods:

#### `editor.waitForEditorView(timeout?)`

Waits for the editor view to be available before proceeding with tests.

**Parameters:**

- `timeout` _(optional)_: Maximum time to wait in milliseconds (default: 5000)

**Returns:** Promise that resolves when the editor view is available

**Example:**

```tsx
const { editor } = renderCodeEditor();
await editor.waitForEditorView(); // Wait before interacting with editor
```

#### `editor.getBySelector(selector, options?)`

Returns the first element matching a specific CodeEditor selector. Throws an error if no element or multiple elements are found.

**Parameters:**

- `selector`: The CSS selector from `CodeEditorSelectors` enum
- `options` _(optional)_: Object with optional `text` property for filtering by text content

**Example:**

```tsx
// Get the content element
const content = editor.getBySelector(CodeEditorSelectors.Content);

// Get a specific line number
const lineNumber = editor.getBySelector(CodeEditorSelectors.GutterElement, {
  text: '1',
});
```

#### `editor.getAllBySelector(selector, options?)`

Returns all elements matching a specific CodeEditor selector. Throws an error if no elements are found.

**Parameters:**

- `selector`: The CSS selector from `CodeEditorSelectors` enum
- `options` _(optional)_: Object with optional `text` property for filtering by text content

**Example:**

```tsx
// Get all line numbers
const allLineNumbers = editor.getAllBySelector(
  CodeEditorSelectors.GutterElement,
);
```

#### `editor.queryBySelector(selector, options?)`

Returns the first element matching a specific CodeEditor selector, or null if not found. Useful when you're not sure if an element exists.

**Parameters:**

- `selector`: The CSS selector from `CodeEditorSelectors` enum
- `options` _(optional)_: Object with optional `text` property for filtering by text content

**Example:**

```tsx
// Check if fold gutter exists
const foldGutter = editor.queryBySelector(CodeEditorSelectors.FoldGutter);
expect(foldGutter).not.toBeInTheDocument();
```

#### `editor.queryAllBySelector(selector, options?)`

Returns all elements matching a specific CodeEditor selector, or null if none are found.

**Parameters:**

- `selector`: The CSS selector from `CodeEditorSelectors` enum
- `options` _(optional)_: Object with optional `text` property for filtering by text content

#### `editor.isReadOnly()`

Checks if the editor is in read-only mode.

**Returns:** Boolean indicating whether the editor is in read-only mode

**Example:**

```tsx
const { editor } = renderCodeEditor({ readOnly: true });
await editor.waitForEditorView();

expect(editor.isReadOnly()).toBe(true);
```

#### `editor.getIndentUnit()`

Retrieves the current indentation unit configuration from the editor.

**Returns:** The string used for indentation (spaces or tab character)

**Example:**

```tsx
const { editor } = renderCodeEditor({
  indentUnit: 'space',
  indentSize: 4,
});
await editor.waitForEditorView();

expect(editor.getIndentUnit()).toBe('    '); // 4 spaces
```

#### `editor.isLineWrappingEnabled()`

Checks if line wrapping is enabled in the editor.

**Returns:** Boolean indicating whether line wrapping is enabled

**Example:**

```tsx
const { editor } = renderCodeEditor({ enableLineWrapping: true });
await editor.waitForEditorView();

expect(editor.isLineWrappingEnabled()).toBe(true);
```

#### `editor.interactions.insertText(text, options?)`

Inserts text into the editor at the specified position.

**Parameters:**

- `text`: The text to insert
- `options` _(optional)_: Object with optional position properties
  - `from`: Starting position for insertion (defaults to 0)
  - `to`: End position for replacement (optional)

**Example:**

```tsx
import { act } from '@testing-library/react';

const { editor } = renderCodeEditor();
await editor.waitForEditorView();

act(() => {
  editor.interactions.insertText('new content');
});

expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
  'new content',
);
```

### Complete Test Example

```tsx
import {
  renderCodeEditor,
  CodeEditorSelectors,
} from '@leafygreen-ui/code-editor';
import { act } from '@testing-library/react';

test('comprehensive editor testing', async () => {
  const { editor, container } = renderCodeEditor({
    defaultValue: 'const greeting = "Hello";',
    language: LanguageName.javascript,
    enableLineNumbers: true,
    enableCodeFolding: true,
  });

  // Wait for editor to initialize
  await editor.waitForEditorView();

  // Check initial content
  expect(container).toHaveTextContent('const greeting = "Hello";');

  // Verify line numbers are present
  expect(
    editor.getBySelector(CodeEditorSelectors.GutterElement, { text: '1' }),
  ).toBeInTheDocument();

  // Verify fold gutter is present
  expect(
    editor.getBySelector(CodeEditorSelectors.FoldGutter),
  ).toBeInTheDocument();

  // Insert new text
  act(() => {
    editor.interactions.insertText('\nconsole.log(greeting);', { from: 25 });
  });

  // Verify the new content
  expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
    'const greeting = "Hello";\nconsole.log(greeting);',
  );
});
```

## CodeMirror Extension Hooks

The `CodeEditor` component is built on [CodeMirror v6](https://codemirror.net/) and provides a complete, ready-to-use editor experience. However, some applications may need highly customized CodeMirror implementations that don't fit the standard `CodeEditor` API, while still wanting to maintain consistency with the LeafyGreen design system.

For these use cases, this package exports individual extension hooks that encapsulate specific CodeMirror functionality with LeafyGreen theming and behavior. These hooks allow you to build custom CodeMirror editors while leveraging the same language support, themes, syntax highlighting, and other features used by the main `CodeEditor` component.

### Common API Pattern

All extension hooks (except `useExtension`) follow a consistent API pattern:

```tsx
function useXExtension({
  editorViewInstance,
  props,
  modules,
}: {
  editorViewInstance: EditorView | null;
  props: Partial<CodeEditorProps>;
  modules: Partial<CodeEditorModules>;
}) {
  // Returns a CodeMirror Extension
}
```

**Common Parameters:**

- `editorViewInstance`: The CodeMirror editor view instance
- `props`: Partial CodeEditor props containing relevant configuration
- `modules`: Lazy-loaded CodeMirror modules required for the extension

### Base Extension Hook

#### `useExtension<T>(config)`

The foundational hook that all other extension hooks build upon. It provides dynamic reconfiguration of CodeMirror extensions using compartments.

**Parameters:**

- `editorViewInstance`: The CodeMirror editor view instance
- `value`: Value of type `T` to pass to the factory function
- `factory`: Function that creates an extension from the provided value
- `stateModule` _(optional)_: The `@codemirror/state` module for compartment management. While optional, if not provided, an empty extension will be returned since the state module is required to create compartments. This parameter is only optional because modules are lazy-loaded internally and may not be available on the initial call.

**Example:**

```tsx
import { useExtension } from '@leafygreen-ui/code-editor';

const myExtension = useExtension({
  editorViewInstance,
  stateModule: modules?.['@codemirror/state'],
  value: { myConfig: 'value' },
  factory: ({ myConfig }) => (myConfig ? someExtension() : []),
});
```

### Aggregated Extension Hook

#### `useExtensions(config)`

A convenience hook that aggregates and configures all CodeMirror extensions used by the CodeEditor component. This hook internally calls all individual extension hooks and returns a complete array of configured extensions ready to be applied to a CodeMirror editor.

This hook manages the initialization and configuration of all available extensions including auto-completion, code folding, syntax highlighting, hyperlinks, line wrapping, line numbers, indentation, placeholder text, tooltips, language support, theme styling, and read-only mode.

**Parameters:**

- `editorViewInstance`: The CodeMirror editor view instance
- `props`: Partial CodeEditor props containing user configuration options
- `modules`: Partial CodeEditor modules containing dynamically loaded CodeMirror modules

**Returns:** Array of configured CodeMirror extensions

**Example:**

```tsx
import {
  useExtensions,
  useLazyLoadedModules,
  useModuleLoaders,
} from '@leafygreen-ui/code-editor';

const props = {
  language: LanguageName.javascript,
  enableLineNumbers: true,
  enableCodeFolding: true,
  readOnly: false,
  // ... other props
};

const moduleLoaders = useModuleLoaders(props);
const { isLoading, modules } = useLazyModules(moduleLoaders);

const allExtensions = useExtensions({
  editorViewInstance,
  props,
  modules,
});

// Apply all extensions to your CodeMirror editor
const editorState = EditorState.create({
  doc: initialContent,
  extensions: allExtensions,
});
```

### Feature Extension Hooks

#### `useAutoCompleteExtension(config)`

Provides intelligent code completion based on the selected language.

**Required Props:** `language`  
**Required Modules:** `@codemirror/autocomplete`, `@codemirror/state`

#### `useCodeFoldingExtension(config)`

Enables code folding with custom LeafyGreen UI icons (ChevronDown/ChevronRight).

**Required Props:** `enableCodeFolding`  
**Required Modules:** `@codemirror/language`, `@codemirror/state`

#### `useHighlightExtension(config)`

Manages syntax highlighting and text search highlighting functionality.

**Required Props:** `darkMode`  
**Required Modules:** `@codemirror/search`, `@codemirror/view`, `@codemirror/state`

#### `useHyperLinkExtension(config)`

Makes URLs in the editor clickable when enabled.

**Required Props:** `enableClickableUrls`  
**Required Modules:** `@uiw/codemirror-extensions-hyper-link`, `@codemirror/state`

#### `useIndentExtension(config)`

Configures indentation behavior including tabs vs spaces and indent size.

**Required Props:** `indentUnit`, `indentSize`  
**Required Modules:** `@codemirror/language`, `@codemirror/state`

#### `useLanguageExtension(config)`

Provides language-specific syntax highlighting and features for supported languages.

**Required Props:** `language`  
**Required Modules:** `@codemirror/state` and language-specific modules based on selected language:

- JavaScript/TypeScript/JSX/TSX: `@codemirror/lang-javascript`
- Python: `@codemirror/lang-python`
- Java: `@codemirror/lang-java`
- C++: `@codemirror/lang-cpp`
- CSS: `@codemirror/lang-css`
- HTML: `@codemirror/lang-html`
- JSON: `@codemirror/lang-json`
- Go: `@codemirror/lang-go`
- PHP: `@codemirror/lang-php`
- Rust: `@codemirror/lang-rust`
- C#: `@replit/codemirror-lang-csharp`
- Kotlin: `@codemirror/language`, `@codemirror/legacy-modes/mode/clike`
- Ruby: `@codemirror/language`, `@codemirror/legacy-modes/mode/ruby`

#### `useLineNumbersExtension(config)`

Displays line numbers in the editor's gutter when enabled.

**Required Props:** `enableLineNumbers`  
**Required Modules:** `@codemirror/view`, `@codemirror/state`

#### `useLineWrapExtension(config)`

Enables line wrapping to prevent horizontal scrolling.

**Required Props:** `enableLineWrapping`  
**Required Modules:** `@codemirror/view`, `@codemirror/state`

#### `usePlaceholderExtension(config)`

Shows placeholder text when the editor is empty.

**Required Props:** `placeholder`  
**Required Modules:** `@codemirror/view`, `@codemirror/state`

#### `useReadOnlyExtension(config)`

Controls the read-only state of the editor.

**Required Props:** `readOnly`  
**Required Modules:** `@codemirror/state`

#### `useThemeExtension(config)`

Applies LeafyGreen UI theming including colors, typography, and spacing.

**Required Props:** `darkMode`, `baseFontSize`  
**Required Modules:** `@codemirror/view`, `@codemirror/state`

#### `useTooltipExtension(config)`

Adds hover tooltips to editor content with configurable severity levels.

**Required Props:** `tooltips`  
**Required Modules:** `@codemirror/view`, `@codemirror/state`

#### `useFormattingExtension(config)`

Provides code formatting functionality using language-specific formatters. This hook doesn't return a CodeMirror extension but rather a formatting utility that can format code content. It supports multiple formatting backends:

- **Prettier-based formatters**: For JavaScript, TypeScript, CSS, HTML, JSON, Java, Kotlin, PHP, Ruby, and Rust
- **WASM-based formatters**: For C/C++, C#, Go, and Python

**Required Props:** `language`  
**Required Modules:** Depends on language:

- Prettier languages: `prettier/standalone` + language-specific parser/plugin
- WASM languages: `@wasm-fmt/clang-format`, `@wasm-fmt/gofmt`, or `@wasm-fmt/ruff_fmt`

**Returns:**

- `formatCode(code: string, options?: FormattingOptions): Promise<string>` - Formats the provided code
- `isFormattingAvailable(): boolean` - Checks if formatting is available for current language

**Example:**

```tsx
const { formatCode, isFormattingAvailable } = useFormattingExtension({
  editorViewInstance: null, // Not needed for standalone formatting
  props: { language: LanguageName.javascript },
  modules: lazyModules,
});

if (isFormattingAvailable()) {
  const formatted = await formatCode('const x=1;');
  console.log(formatted); // "const x = 1;"
}
```

### Example Usage

```tsx
import {
  useLanguageExtension,
  useThemeExtension,
  useLineNumbersExtension,
  LanguageName,
} from '@leafygreen-ui/code-editor';
import { Theme } from '@leafygreen-ui/lib';

// In a custom CodeMirror implementation
const languageExt = useLanguageExtension({
  editorViewInstance,
  props: { language: LanguageName.javascript },
  modules: lazyModules,
});

const themeExt = useThemeExtension({
  editorViewInstance,
  props: { theme: Theme.Dark, baseFontSize: 14 },
  modules: lazyModules,
});

const lineNumbersExt = useLineNumbersExtension({
  editorViewInstance,
  props: { enableLineNumbers: true },
  modules: lazyModules,
});

// Combine extensions
const allExtensions = [languageExt, themeExt, lineNumbersExt];
```
