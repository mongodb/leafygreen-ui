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

## Components

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

| Name                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Type                         | Default     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------- |
| `baseFontSize` _(optional)_           | Font size of text in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `BaseFontSize`               | `13`        |
| `className` _(optional)_              | CSS class name to apply to the editor container.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`                     | `undefined` |
| `copyButtonAppearance` _(optional)_   | Determines the appearance of the copy button when no panel is present. The copy button allows the code block to be copied to the user's clipboard by clicking the button.<br><br>If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.<br><br>If `persist`, the copy button will always be visible.<br><br>If `none`, the copy button will not be rendered.<br><br>**Note:** When a `<CodeEditor.Panel>` child component is present, this prop is ignored as the panel provides its own copy button.                                                                   | `CopyButtonAppearance`       | `"hover"`   |
| `customContextMenuItems` _(optional)_ | Additional menu items to show in the context menu below the default Cut/Copy/Paste items. A separator will automatically be added between default and custom items if custom items are provided. Each item can include a label, action function, disabled state, and separator flag.                                                                                                                                                                                                                                                                                                                                                                               | `Array<MenuItem>`            | `undefined` |
| `darkMode` _(optional)_               | Determines if the component appears in dark mode. When not provided, the component will inherit the dark mode state from the LeafyGreen Provider.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `boolean`                    | `undefined` |
| `defaultValue` _(optional)_           | Initial value to render in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `string`                     | `undefined` |
| `enableClickableUrls` _(optional)_    | Renders URLs as clickable links in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                    | `undefined` |
| `enableCodeFolding` _(optional)_      | Enables code folding arrows in the gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `boolean`                    | `undefined` |
| `enableLineNumbers` _(optional)_      | Enables line numbers in the editor’s gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `boolean`                    | `true`      |
| `enableLineWrapping` _(optional)_     | Enables line wrapping when the text exceeds the editor’s width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `boolean`                    | `true`      |
| `enableSearchPanel` \_(optional))     | Enables the find and replace search panel in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `boolean`                    | `true`      |
| `extensions` _(optional)_             | Additional CodeMirror extensions to apply to the editor. These will be applied with high precendence, meaning they can override extensions applied through built in props. See the [CodeMirror v6 System Guide](https://codemirror.net/docs/guide/) for more information.                                                                                                                                                                                                                                                                                                                                                                                          | `Array<CodeMirrorExtension>` | `[]`        |
| `forceParsing` _(optional)_           | _**This should be used with caution as it can significantly impact performance!**_<br><br>Forces the parsing of the complete document, even parts not currently visible.<br><br>By default, the editor optimizes performance by only parsing the code that is visible on the screen, which is especially beneficial when dealing with large amounts of code. Enabling this option overrides this behavior and forces the parsing of all code, visible or not. This should generally be reserved for exceptional circumstances.                                                                                                                                     | `boolean`                    | `false`     |
| `height` _(optional)_                 | Sets the editor's height. If not set, the editor will automatically adjust its height based on the content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `string`                     | `undefined` |
| `indentSize` _(optional)_             | Sets the editor's indent size on tab click.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `number`                     | `undefined` |
| `indentUnit` _(optional)_             | Sets the editor's indent unit on tab click.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `IndentUnits`                | `undefined` |
| `isLoading` _(optional)_              | Renders the editor in a loading state. The CodeEditor is an asynchronous component that relies on lazy loading of modules. Due to this, regardless of the `isLoading` prop, the editor will always render a loading state until all required modules are loaded.                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                    | `false`     |
| `language` _(optional)_               | Specifies the language for syntax highlighting and autocompletion. The following languages are supported:<br><ul><li>cpp</li><li>csharp</li><li>css</li><li>go</li><li>html</li><li>java</li><li>javascript</li><li>jsx</li><li>json</li><li>kotlin</li><li>php</li><li>python</li><li>ruby</li><li>rust</li><li>typescript</li><li>tsx</li></ul>                                                                                                                                                                                                                                                                                                                  | `LanguageName`               | `undefined` |
| `maxHeight` _(optional)_              | Sets the editor's maximum height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `string`                     | `undefined` |
| `maxWidth` _(optional)_               | Sets the editor's maximum width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`                     | `undefined` |
| `minHeight` _(optional)_              | Sets the editor's minimum height.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `string`                     | `undefined` |
| `minWidth` _(optional)_               | Sets the editor's minimum width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`                     | `undefined` |
| `onChange` _(optional)_               | Callback that receives the updated editor value when changes are made.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `(value: string) => void`    | `undefined` |
| `placeholder` _(optional)_            | Value to display in the editor when it is empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `HTMLElement \| string`      | `undefined` |
| `preLoadedModules` _(optional)_       | **Use with caution**. By default, the editor lazy loads required packages dynamically to reduce bundle size and improve load performance, causing a brief loading state on initial render. This prop allows passing pre-loaded modules instead. When used, the editor skips all dynamic loading and relies exclusively on the provided modules. You must include the core modules (`codemirror`, `@codemirror/view`, `@codemirror/state`, `@codemirror/commands`, `@codemirror/search`) plus any additional modules for your specific functionality. See the [CodeMirror Extension Hooks](#codemirror-extension-hooks) section for module requirements by feature. | `Partial<CodeEditorModules>` | `undefined` |
| `readOnly` _(optional)_               | Enables read only mode, making the contents uneditable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `boolean`                    | `false`     |
| `tooltips` _(optional)_               | Add tooltips to the editor content that appear on hover. See the [`CodeEditorTooltip`](#codeeditortooltip) interface for available properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `Array<CodeEditorTooltip>`   | `undefined` |
| `value` _(optional)_                  | Controlled value of the editor. If set, the editor will be controlled and will not update its value on change. Use `onChange` to update the value externally.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `string`                     | `undefined` |
| `width` _(optional)_                  | Sets the editor's width. If not set, the editor will be 100% width of its parent container.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `string`                     | `undefined` |

### `<CodeEditor.Panel>`

The Panel component provides a toolbar interface for the CodeEditor with formatting, copying, download, and custom action buttons. It displays at the top of the CodeEditor and can include a title, action buttons, and custom content. When used within a CodeEditor, the Panel automatically integrates with the editor's functionality - the download button performs actual file downloads with appropriate extensions, undo/redo buttons operate on the editor history, and the format button processes the editor content.

**Note:** Panel is used as a compound component (`CodeEditor.Panel`) and passed as a child to the CodeEditor, not as a prop.

#### Example

```tsx
import { CodeEditor, LanguageName } from '@leafygreen-ui/code-editor';
import CloudIcon from '@leafygreen-ui/icon';

<CodeEditor
  defaultValue="const greeting = 'Hello World';"
  language={LanguageName.javascript}
>
  <CodeEditor.Panel
    title="index.ts"
    showFormatButton
    showCopyButton
    showSecondaryMenuButton
    downloadFileName="my-script.js"
    customSecondaryButtons={[
      {
        label: 'Deploy to Cloud',
        glyph: <CloudIcon />,
        onClick: () => console.log('Deploy clicked'),
        'aria-label': 'Deploy code to cloud',
      },
    ]}
    onFormatClick={() => console.log('Format clicked')}
    onCopyClick={() => console.log('Copy clicked')}
    onDownloadClick={() => console.log('Download clicked')}
  />
</CodeEditor>;
```

#### Properties

| Name                                   | Description                                                                                                                                                                                                                      | Type                           | Default     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `baseFontSize` _(optional)_            | Font size of text in the panel. Controls the typography scale used for the panel title and other text elements.                                                                                                                  | `BaseFontSize`                 | `13`        |
| `customSecondaryButtons` _(optional)_  | Array of custom secondary buttons to display in the secondary menu. Each button can include a label, icon, click handler, href, and aria-label for accessibility.                                                                | `Array<SecondaryButtonConfig>` | `undefined` |
| `darkMode` _(optional)_                | Determines if the component appears in dark mode. When not provided, the component will inherit the dark mode state from the LeafyGreen Provider.                                                                                | `boolean`                      | `undefined` |
| `downloadFileName` _(optional)_        | Optional filename to use when downloading the editor content. If provided, the file will be downloaded with this exact filename. If not provided, uses the default filename 'code' with appropriate extension based on language. | `string`                       | `undefined` |
| `innerContent` _(optional)_            | React node to render between the title and the buttons. Can be used to add custom controls to the panel.                                                                                                                         | `React.ReactNode`              | `undefined` |
| `onCopyClick` _(optional)_             | Callback fired when the copy button is clicked. Called after the copy operation is attempted.                                                                                                                                    | `() => void`                   | `undefined` |
| `onDownloadClick` _(optional)_         | Callback fired when the download button in the secondary menu is clicked. Called after the actual file download is triggered. When used within CodeEditor, downloads the editor content automatically.                           | `() => void`                   | `undefined` |
| `onFormatClick` _(optional)_           | Callback fired when the format button is clicked. Called after the formatting operation is attempted.                                                                                                                            | `() => void`                   | `undefined` |
| `onRedoClick` _(optional)_             | Callback fired when the redo button in the secondary menu is clicked. Called after the redo operation is attempted.                                                                                                              | `() => void`                   | `undefined` |
| `onUndoClick` _(optional)_             | Callback fired when the undo button in the secondary menu is clicked. Called after the undo operation is attempted.                                                                                                              | `() => void`                   | `undefined` |
| `onViewShortcutsClick` _(optional)_    | Callback fired when the view shortcuts button in the secondary menu is clicked. Called after the view shortcuts operation is attempted.                                                                                          | `() => void`                   | `undefined` |
| `showCopyButton` _(optional)_          | Determines whether to show the copy button in the panel. When enabled, users can copy the editor content to their clipboard.                                                                                                     | `boolean`                      | `undefined` |
| `showFormatButton` _(optional)_        | Determines whether to show the format button in the panel. When enabled and formatting is available for the current language, users can format/prettify their code.                                                              | `boolean`                      | `undefined` |
| `showSecondaryMenuButton` _(optional)_ | Determines whether to show the secondary menu button (ellipsis icon) in the panel. When enabled, displays a menu with additional actions like undo, redo, download, and view shortcuts.                                          | `boolean`                      | `undefined` |
| `title` _(optional)_                   | Title text to display in the panel header. Typically used to show the current language or content description.                                                                                                                   | `string`                       | `undefined` |

#### `SecondaryButtonConfig`

| Name                      | Description                                                            | Type                 | Default     |
| ------------------------- | ---------------------------------------------------------------------- | -------------------- | ----------- |
| `aria-label` _(optional)_ | Accessible label for the button to provide context for screen readers. | `string`             | `undefined` |
| `disabled` _(optional)_   | Whether the button is disabled.                                        | `boolean`            | `undefined` |
| `glyph` _(optional)_      | Icon element to display in the button.                                 | `React.ReactElement` | `undefined` |
| `href` _(optional)_       | URL to navigate to when the button is clicked.                         | `string`             | `undefined` |
| `label`                   | Text label for the button.                                             | `string`             | —           |
| `onClick` _(optional)_    | Callback fired when the button is clicked.                             | `() => void`         | `undefined` |

## Types

| Name                    | Description                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `CodeEditorHandle`      | TypeScript interface for the imperative handle of the CodeEditor component, including formatting methods.                  |
| `CodeEditorModules`     | TypeScript interface defining the structure of lazy-loaded CodeMirror modules used by extension hooks.                     |
| `CodeEditorProps`       | TypeScript interface defining all props that can be passed to the `CodeEditor` component.                                  |
| `CodeEditorTooltip`     | TypeScript interface defining the structure for tooltips displayed on hover in the editor. See below for full interface.   |
| `CodeMirrorExtension`   | Re-export of CodeMirror's `Extension` type. See https://codemirror.net/docs/ref/#state.Extension.                          |
| `CodeMirrorState`       | Re-export of CodeMirror's `EditorState` type. See https://codemirror.net/docs/ref/#state.EditorState.                      |
| `CodeMirrorView`        | Re-export of CodeMirror's `EditorView` type. See https://codemirror.net/docs/ref/#view.EditorView.                         |
| `ContextMenuItem`       | TypeScript interface defining the structure for context menu items with label, action, disabled state, and separator flag. |
| `PanelProps`            | TypeScript interface defining all props that can be passed to the `Panel` component.                                       |
| `SecondaryButtonConfig` | TypeScript interface defining the structure for custom secondary buttons in the Panel component.                           |

## Constants & Variables

| Name                        | Description                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `CodeEditorSelectors`       | Constant object containing CSS selectors for common CodeEditor elements. Useful for testing and custom styling. |
| `CodeEditorTooltipSeverity` | Constant object defining possible severity levels for tooltips (`info`, `warning`, `error`, `hint`).            |
| `CopyButtonAppearance`      | Constant object defining appearance options for the copy button (`hover`, `persist`, `none`).                   |
| `IndentUnits`               | Constant object defining indent unit options (`space`, `tab`) for the `indentUnit` prop.                        |
| `LanguageName`              | Constant object containing all supported programming languages for syntax highlighting.                         |

#### `CodeEditorTooltip`

TypeScript interface defining the structure for tooltips displayed on hover in the editor:

| Name                    | Description                                                                   | Type                                       | Default     |
| ----------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `line`                  | Which line in the document the tooltip should be rendered. 1 based.           | `number`                                   | -           |
| `length`                | The length the text that the tooltip should cover in characters.              | `number`                                   | -           |
| `column` _(optional)_   | Which character, going from left to right, the tooltip should start. 1 based. | `number`                                   | `1`         |
| `severity` _(optional)_ | Severity level of the tooltip.                                                | `'info' \| 'warning' \| 'error' \| 'hint'` | `'info'`    |
| `messages` _(optional)_ | Messages to display in the tooltip.                                           | `Array<string>`                            | `undefined` |
| `links` _(optional)_    | Links to display in a section at the bottom of the tooltip.                   | `Array<{ label: string; href: string; }>`  | `undefined` |

## Code Formatting

The CodeEditor component includes built-in code formatting functionality that integrates with the `Panel` component or can be used independently via the `useCodeFormatter` hook.

### Supported Languages

The formatting system supports the following languages:

- **JavaScript/JSX**
- **TypeScript/TSX**
- **CSS**
- **HTML**
- **JSON**
- **Java**
- **C++**
- **C#**
- **Go**
- **Python**

**Note:** Kotlin, PHP, Ruby, and Rust are not supported due to current browser compatibility limitations.

### Using Code Formatting

There are several ways to format code with the CodeEditor:

#### 1. Via Panel Component (Automatic)

Enable the format button in the Panel for user-triggered formatting. Formatting will occur automatically on click for supported languages:

```tsx
import { CodeEditor, LanguageName } from '@leafygreen-ui/code-editor';

function MyComponent() {
  return (
    <CodeEditor
      defaultValue="const x=1;const y=2;"
      language={LanguageName.javascript}
    >
      <CodeEditor.Panel showFormatButton />
    </CodeEditor>
  );
}
```

#### 2. Via CodeEditor Ref (Programmatic)

Access formatting programmatically through the CodeEditor ref. See the [Imperative API](#imperative-api) section for complete details and examples.

#### 3. Via useCodeFormatter Hook (Standalone)

Use the formatting functionality independently without the CodeEditor component. For detailed documentation, examples, and module loading requirements, see the [`useCodeFormatter`](#usecodeformatterconfig) hook documentation in the CodeMirror Extension Hooks section.

## Imperative API

The CodeEditor exposes an imperative handle through a ref that provides programmatic access to editor functionality including content manipulation, formatting, and undo/redo operations.

### CodeEditor Ref

Access the editor's imperative methods through a ref:

```tsx
import { useRef } from 'react';
import {
  CodeEditor,
  type CodeEditorHandle,
  LanguageName,
} from '@leafygreen-ui/code-editor';

function MyComponent() {
  const editorRef = useRef<CodeEditorHandle>(null);

  const handleFormatCode = async () => {
    if (editorRef.current?.isFormattingAvailable) {
      const formatted = await editorRef.current.formatCode();
      console.log('Formatted code:', formatted);
    }
  };

  const handleUndo = () => {
    if (editorRef.current) {
      const success = editorRef.current.undo();
      console.log('Undo successful:', success);
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      const success = editorRef.current.redo();
      console.log('Redo successful:', success);
    }
  };

  const handleGetContents = () => {
    if (editorRef.current) {
      const contents = editorRef.current.getContents();
      console.log('Current contents:', contents);
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      editorRef.current.downloadContent('my-script'); // Downloads as 'my-script.js'
    }
  };

  return (
    <>
      <CodeEditor
        ref={editorRef}
        defaultValue="const x=1;const y=2;"
        language={LanguageName.javascript}
      />
      <button onClick={handleFormatCode}>Format Code</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <button onClick={handleGetContents}>Get Contents</button>
      <button onClick={handleDownload}>Download</button>
    </>
  );
}
```

### Available Methods

The `CodeEditorHandle` provides the following methods:

- **`getContents()`** - Returns the current text content of the editor
- **`formatCode()`** - Formats the current code content (returns a Promise)
- **`isFormattingAvailable`** - Boolean indicating if formatting is available for the current language
- **`undo()`** - Undoes the last editor action, returns boolean indicating success
- **`redo()`** - Redoes the last undone action, returns boolean indicating success
- **`downloadContent(filename?)`** - Downloads the editor content as a file. If filename is provided, used exactly as-is; if not provided, defaults to 'code' with appropriate extension
- **`getEditorViewInstance()`** - Returns the underlying CodeMirror EditorView instance

#### Download Functionality

The `downloadContent` method uses a simple approach to filename handling:

- **When a filename is provided**: Uses the filename exactly as provided, with no modifications
- **When no filename is provided**: Uses the default filename 'code' and adds an appropriate extension based on the editor's language

```tsx
// Downloads as 'script' (uses filename exactly as provided)
editorRef.current.downloadContent('script');

// Downloads as 'my-file.py' (uses filename exactly as provided)
editorRef.current.downloadContent('my-file.py');

// Downloads as 'code' (uses filename exactly as provided, even though it's "code")
editorRef.current.downloadContent('code');

// Downloads as 'code' (default behavior - no filename parameter provided)
editorRef.current.downloadContent(); // No filename provided
```

## Test Utilities

The `@leafygreen-ui/code-editor` package provides test utilities to help test CodeEditor and Panel components in your applications.

### `getTestUtils(lgId?)`

Returns utilities for testing CodeEditor and Panel components. These utilities follow the `@testing-library` pattern with `get*`, `find*`, and `query*` variants for each element.

**Parameters:**

- `lgId` _(optional)_: Custom lgId string to scope the queries. Must follow the pattern `lg-${string}`. Defaults to `'lg-code_editor'`

**Returns:**

An object with methods for testing the CodeEditor and its Panel.

#### Editor Utilities

- `getEditor()` / `findEditor()` / `queryEditor()` - Get the CodeEditor root element
- `getContentContainer()` / `findContentContainer()` / `queryContentContainer()` - Get the content container element
- `getCopyButton()` / `findCopyButton()` / `queryCopyButton()` - Get the copy button element (when not using panel)

#### Loading Utilities

- `isLoading()` - Checks if the editor is currently in a loading state
- `waitForLoadingToComplete(timeout?)` - Waits for the loading state to complete (returns `Promise<void>`)

#### Panel Utilities

- `getPanelUtils()` - Gets panel-specific utilities if panel is present

Returns an object with:

- `getPanelElement()` / `findPanelElement()` / `queryPanelElement()` - Get the panel element
- `getFormatButton()` / `findFormatButton()` / `queryFormatButton()` - Get the format button element
- `getPanelCopyButton()` / `findPanelCopyButton()` / `queryPanelCopyButton()` - Get the panel's copy button element
- `getSecondaryMenuButton()` / `findSecondaryMenuButton()` / `querySecondaryMenuButton()` - Get the secondary menu button element
- `getSecondaryMenu()` / `findSecondaryMenu()` / `querySecondaryMenu()` - Get the secondary menu element

#### Example Usage

**Basic Testing:**

```tsx
import { render } from '@testing-library/react';
import { getTestUtils } from '@leafygreen-ui/code-editor/testing';
import { CodeEditor, LanguageName } from '@leafygreen-ui/code-editor';

test('CodeEditor structure and panel work correctly', async () => {
  render(
    <CodeEditor
      defaultValue="const greeting = 'Hello World';"
      language={LanguageName.javascript}
      data-lgid="lg-my-editor"
    >
      <CodeEditor.Panel
        title="JavaScript"
        showFormatButton
        showCopyButton
        showSecondaryMenuButton
        data-lgid="lg-my-editor"
      />
    </CodeEditor>,
  );

  const utils = getTestUtils('lg-my-editor');

  // Test editor presence and basic structure
  expect(utils.getEditor()).toBeInTheDocument();
  expect(utils.getContentContainer()).toBeInTheDocument();

  // Test panel functionality
  const panelUtils = utils.getPanelUtils();
  expect(panelUtils.getPanelElement()).toBeInTheDocument();
  expect(panelUtils.getFormatButton()).toBeInTheDocument();
  expect(panelUtils.getPanelCopyButton()).toBeInTheDocument();
  expect(panelUtils.getSecondaryMenuButton()).toBeInTheDocument();

  // Test loading state
  expect(typeof utils.isLoading()).toBe('boolean');

  // Wait for loading to complete if needed
  await utils.waitForLoadingToComplete();
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

##### Common Parameters

- `editorViewInstance`: The CodeMirror editor view instance
- `props`: Partial CodeEditor props containing relevant configuration
- `modules`: Lazy-loaded CodeMirror modules required for the extension

### Base Extension Hook

#### `useExtension<T>(config)`

The foundational hook that all other extension hooks build upon. It provides dynamic reconfiguration of CodeMirror extensions using compartments.

##### Parameters

- `editorViewInstance`: The CodeMirror editor view instance
- `value`: Value of type `T` to pass to the factory function
- `factory`: Function that creates an extension from the provided value
- `stateModule` _(optional)_: The `@codemirror/state` module for compartment management. While optional, if not provided, an empty extension will be returned since the state module is required to create compartments. This parameter is only optional because modules are lazy-loaded internally and may not be available on the initial call.

##### Example

```tsx
import { useExtension } from '@leafygreen-ui/code-editor';

const myExtension = useExtension({
  editorViewInstance,
  stateModule: modules?.['@codemirror/state'],
  value: { myConfig: 'value' },
  factory: ({ myConfig }) => (myConfig ? someExtension() : []),
});
```

### Feature Extension Hooks

#### `useAutoCompleteExtension(config)`

Provides intelligent code completion based on the selected language.

##### Required Props

`language`

##### Required Modules

`@codemirror/autocomplete`, `@codemirror/state`

#### `useCodeFoldingExtension(config)`

Enables code folding with custom LeafyGreen UI icons (ChevronDown/ChevronRight).

##### Required Props

`enableCodeFolding`

##### Required Modules

`@codemirror/language`, `@codemirror/state`

#### `useHighlightExtension(config)`

Manages syntax highlighting and text search highlighting functionality.

##### Required Props

`darkMode`

##### Required Modules

`@codemirror/search`, `@codemirror/view`, `@codemirror/state`

#### `useHyperLinkExtension(config)`

Makes URLs in the editor clickable when enabled.

##### Required Props

`enableClickableUrls`

##### Required Modules

`@uiw/codemirror-extensions-hyper-link`, `@codemirror/state`

#### `useIndentExtension(config)`

Configures indentation behavior including tabs vs spaces and indent size.

##### Required Props

`indentUnit`, `indentSize`

##### Required Modules

`@codemirror/language`, `@codemirror/state`

#### `useLanguageExtension(config)`

Provides language-specific syntax highlighting and features for supported languages.

##### Required Props

`language`

##### Required Modules

`@codemirror/state` and language-specific modules based on selected language:

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

##### Required Props

`enableLineNumbers`

##### Required Modules

`@codemirror/view`, `@codemirror/state`

#### `useLineWrapExtension(config)`

Enables line wrapping to prevent horizontal scrolling.

##### Required Props

`enableLineWrapping`

##### Required Modules

`@codemirror/view`, `@codemirror/state`

#### `usePlaceholderExtension(config)`

Shows placeholder text when the editor is empty.

##### Required Props

`placeholder`

##### Required Modules

`@codemirror/view`, `@codemirror/state`

#### `useReadOnlyExtension(config)`

Controls the read-only state of the editor.

##### Required Props

`readOnly`

##### Required Modules

`@codemirror/state`

#### `useThemeExtension(config)`

Applies LeafyGreen UI theming including colors, typography, and spacing.

##### Required Props

`darkMode`, `baseFontSize`

##### Required Modules

`@codemirror/view`, `@codemirror/state`

#### `useTooltipExtension(config)`

Adds hover tooltips to editor content with configurable severity levels.

##### Required Props

`tooltips`

##### Required Modules

`@codemirror/view`, `@codemirror/state`

#### `useCodeFormatter(config)`

Provides code formatting functionality using language-specific formatters with pre-loaded modules.

##### Supported Languages

- **Prettier-based**: JavaScript/JSX, TypeScript/TSX, CSS, HTML, JSON
- **WASM-based**: Java, C++, C#, Go, Python

**Note:** Kotlin, PHP, Ruby, and Rust are not supported due to current browser compatibility limitations.

##### Required Props

- `language` - Target programming language
- `indentSize` _(optional)_ - Number of spaces/tabs for indentation
- `indentUnit` _(optional)_ - Whether to use spaces or tabs

##### Required Modules

`modules` - Pre-loaded formatting modules (see Module Requirements below)

##### Returns

- `formatCode(code: string): Promise<string>` - Formats the provided code using opinionated defaults
- `isFormattingAvailable: boolean` - Whether formatting is available for the current language

##### Module Loading Requirements

Code formatting requires specific modules to be loaded depending on the target language. Consumers are responsible for loading the required modules and passing them to the `useCodeFormatter` hook.

###### Important Notes

- You must load and provide the required modules for your target language(s)
- Check `isFormattingAvailable` before attempting to format code
- Different languages require different module combinations (see Module Requirements by Language below)
- Formatting will gracefully fail and return the original code if required modules are not provided

###### Module Requirements by Language

- **JavaScript/JSX/JSON**:

  - `prettier/standalone`
  - `prettier/parser-babel`

- **TypeScript/TSX**:

  - `prettier/standalone`
  - `prettier/parser-typescript`

- **CSS**:

  - `prettier/standalone`
  - `prettier/parser-postcss`

- **HTML**:

  - `prettier/standalone`
  - `prettier/parser-html`

- **Java/C++/C#**:

  - `@wasm-fmt/clang-format`

- **Go**:

  - `@wasm-fmt/gofmt`

- **Python**:
  - `@wasm-fmt/ruff_fmt`

##### Example

```tsx
import { useCodeFormatter, LanguageName } from '@leafygreen-ui/code-editor';
// Import the modules you need based on your target language
import * as PrettierStandaloneModule from 'prettier/standalone';
import * as PrettierParserBabelModule from 'prettier/parser-babel';

function MyFormattingComponent() {
  const { formatCode, isFormattingAvailable } = useCodeFormatter({
    props: {
      language: LanguageName.javascript,
      indentSize: 2,
      indentUnit: 'space',
    },
    modules: {
      'prettier/standalone': PrettierStandaloneModule,
      'prettier/parser-babel': PrettierParserBabelModule,
    },
  });

  const handleFormat = async () => {
    if (isFormattingAvailable) {
      const formatted = await formatCode('const x=1;');
      console.log(formatted); // "const x = 1;"
    }
  };

  return <button onClick={handleFormat}>Format Code</button>;
}
```

### Full Hook Usage Example

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
  props: { theme: Theme.Dark, baseFontSize: 13 },
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

### Extension Testing Utilities

The `@leafygreen-ui/code-editor` package provides specialized testing utilities for LG extension hooks. These utilities eliminate duplication and provide consistent fake modules for testing extension functionality.

#### Extension Test Utilities

The following utilities are available for testing extension hooks:

```tsx
import {
  createMockStateModule,
  createMockViewModule,
  createMockLanguageModule,
  createMockLezerHighlightModule,
  createMockAutoCompleteModule,
  createMockLintModule,
  createMockHyperLinkModule,
  createComprehensiveFakeModules,
  createMockExtension,
  FakeCompartment,
} from '@leafygreen-ui/code-editor';
```

#### Basic Fake Module Creators

- `createMockStateModule(additionalMethods?)` - Creates a fake `@codemirror/state` module
- `createMockViewModule(additionalMethods?)` - Creates a fake `@codemirror/view` module
- `createMockLanguageModule(additionalMethods?)` - Creates a fake `@codemirror/language` module
- `createMockLezerHighlightModule()` - Creates a fake `@lezer/highlight` module
- `createMockAutoCompleteModule()` - Creates a fake `@codemirror/autocomplete` module
- `createMockLintModule()` - Creates a fake `@codemirror/lint` module
- `createMockHyperLinkModule()` - Creates a fake `@uiw/codemirror-extensions-hyper-link` module

#### Comprehensive Test Setup

- `createComprehensiveFakeModules()` - Creates a complete set of fake modules for testing complex scenarios
- `createMockExtension(label)` - Creates a fake Extension object for testing
- `FakeCompartment` - A fake Compartment class for testing

#### Usage Examples

##### Testing a Single Extension Hook

```tsx
import { renderHook } from '@testing-library/react';
import {
  createMockStateModule,
  createMockViewModule,
} from '@leafygreen-ui/code-editor';
import { useThemeExtension } from '@leafygreen-ui/code-editor/hooks/extensions';

describe('useThemeExtension', () => {
  const fakeStateModule = createMockStateModule();
  const fakeViewModule = createMockViewModule();

  test('should apply theme correctly', () => {
    const { result } = renderHook(() =>
      useThemeExtension({
        editorViewInstance: null,
        props: { darkMode: true, baseFontSize: 16 },
        modules: {
          '@codemirror/state': fakeStateModule,
          '@codemirror/view': fakeViewModule,
        },
      }),
    );

    expect(result.current).toBeTruthy();
  });
});
```

##### Testing Multiple Extensions

```tsx
import { renderHook } from '@testing-library/react';
import { createComprehensiveFakeModules } from '@leafygreen-ui/code-editor';
import { useExtensions } from '@leafygreen-ui/code-editor/hooks/extensions';

describe('useExtensions', () => {
  const fakeModules = createComprehensiveFakeModules();

  test('should aggregate all extensions', () => {
    const { result } = renderHook(() =>
      useExtensions({
        editorViewInstance: null,
        props: {
          language: 'javascript',
          enableLineNumbers: true,
          enableCodeFolding: true,
        },
        modules: fakeModules,
      }),
    );

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBeGreaterThan(0);
  });
});
```

##### Custom Module Configuration

```tsx
import { createMockStateModule } from '@leafygreen-ui/code-editor';

// Extend base module with custom methods
const customStateModule = createMockStateModule({
  myCustomMethod: jest.fn(() => 'custom result'),
});
```
