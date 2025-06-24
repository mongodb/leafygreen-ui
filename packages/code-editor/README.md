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

<CodeEditor defaultValue={sampleCode} language={LanguageName.javascipt} />;
```

#### Properties

| Name                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                         | Default     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------- |
| `defaultValue` _(optional)_        | Initial value to render in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `string`                     | `undefined` |
| `enableClickableUrls` _(optional)_ | Renders URLs as clickable links in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `boolean`                    | `true`      |
| `enableCodeFolding` _(optional)_   | Enables code folding arrows in the gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                    | `true`      |
| `enableLineNumbers` _(optional)_   | Enables line numbers in the editor’s gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                    | `true`      |
| `enableLineWrapping` _(optional)_  | Enables line wrapping when the text exceeds the editor’s width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `boolean`                    | `true`      |
| `extensions` _(optional)_          | Additional CodeMirror extensions to apply to the editor. These will be applied with high precendence, meaning they can override extensions applied through built in props. See the [CodeMirror v6 System Guide](https://codemirror.net/docs/guide/) for more information.                                                                                                                                                                                                                                                      | `Array<CodeMirrorExtension>` | `[]`        |
| `forceParsing` _(optional)_        | _**This should be used with caution as it can significantly impact performance!**_<br><br>Forces the parsing of the complete document, even parts not currently visible.<br><br>By default, the editor optimizes performance by only parsing the code that is visible on the screen, which is especially beneficial when dealing with large amounts of code. Enabling this option overrides this behavior and forces the parsing of all code, visible or not. This should generally be reserved for exceptional circumstances. | `boolean`                    | `false`     |
| `indentSize` _(optional)_          | Sets the editor's indent size on tab click. made.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `number`                     | `2`         |
| `indentUnit` _(optional)_          | Sets the editor's indent unit on tab click. made.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `'space' \| 'tab'`           | `space`     |
| `language` _(optional)_            | Specifies the language for syntax highlighting and autocompletion. The following languages are supported::<br><ul><li>cpp</li><li>csharp</li><li>css</li><li>go</li><li>html</li><li>java</li><li>javascript</li><li>json</li><li>kotlin</li><li>php</li><li>python</li><li>ruby</li><li>rust</li><li>typescript</li></ul>                                                                                                                                                                                                     | `LanguageName`               | `undefined` |
| `onChange` _(optional)_            | Callback that receives the updated editor value when changes are made.                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `(value: string) => void;`   | `undefined` |
| `placeholder` _(optional)_         | Value to display in the editor when it is empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `HTMLElement \| string`      | `undefined` |
| `readOnly` _(optional)_            | Enables read only mode, making the contents uneditable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `boolean`                    | `false`     |
| `tooltips` _(optional)_            | Add tooltips to the editor content that appear on hover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `Array<Tooltip>`             | `undefined` |

## Types and Variables

| Name                         | Description                                                                                                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CodeEditorProps`            | Props that can be passed to the `CodeEditor` component.                                                                                                                                                   |
| `CodeEditorSelectors`        | Enum-like map of CSS selectors for common elements that make up the code editor. These can be useful in testing.                                                                                          |
| `CodeEditorTooltip`          | Describes a tooltip to be displayed on hover                                                                                                                                                              |
| `CodeEditorTooltip.column`   | Optional number. Which character, going from left to right, the tooltip should be rendered. 1 based. Defaults to 1.                                                                                       |
| `CodeEditorTooltip.content`  | ReactNode. What gets rendered in the tooltip.                                                                                                                                                             |
| `CodeEditorTooltip.length`   | Number. The length the text that the tooltip should cover in characters.                                                                                                                                  |
| `CodeEditorTooltip.line`     | Number. Which line in the document the tooltip should be rendered. 1 based.                                                                                                                               |
| `CodeEditorTooltip.severity` | Optional `CodeEditorTooltipSeverity` level. Defaults to 'info'.                                                                                                                                           |
| `CodeEditorTooltipSeverity`  | Possible severity levels a `CodeEditorTooltip` can have.                                                                                                                                                  |
| `CodeMirrorExtension`        | Underlying CodeMirror editor `Extension` type. For more information see https://codemirror.net/docs/ref/#state.Extension.                                                                                 |
| `CodeMirrorRef`              | Underlying CodeMirror editor ref type. When a ref is passed to the `CodeEditor` it will be of this type and give you direct access to CodeMirror internals such as `CodeMirrorState` and `CodeMirrorView` |
| `CodeMirrorState`            | Underlying CodeMirror editor `EditorState` type. For more information see https://codemirror.net/docs/ref/#state.EditorState.                                                                             |
| `CodeMirrorView`             | Underlying CodeMirror editor `EditorView` type. For more information see https://codemirror.net/docs/ref/#view.EditorView.                                                                                |
| `IndentUnits`                | Unit options that can be set via the `indentUnit` prop of `CodeEditor`.                                                                                                                                   |
| `LanguageName`               | Record of all supported languages.                                                                                                                                                                        |
| `RenderedTestEditorType`     | Editor type used to interact with editor in a Jest test. More info in Test Utilities section.                                                                                                             |
| `RenderedTestResult`         | Type returned by the `renderEditor` test utility. More info in Test Utilities section.                                                                                                                    |

## Test Utlities

### `codeSnippets`

Code snippets for all supported languages.

```ts
const snippet = codeSnippets[LanguageName.javascript];
```

### `renderEditor`

Renders the editor in a Jest test.

```tsx
function renderEditor(props?: Partial<CodeEditorProps>): RenderResult;
```

### `RenderResult`

#### `container`

HTML element of the container of the editor that was rendered.

#### `editor`

Editor object used for querying and interacting with the rendered editor.

Has the following interface:

```tsx
{
  /**
   * Returns the first element matching a specific CodeEditor selector
   * @param selector - The CSS selector to look for in the editor
   * @param options - Optional filtering options
   * @param options.text - Optional text content filter
   * @returns The first DOM element matching the selector and optional text filter
   * @throws Error if no elements or multiple elements are found
   */
  getBySelector(
    selector: CodeEditorSelectors,
    options?: { text?: string },
  ): Element;

  /**
   * Returns all elements matching a specific CodeEditor selector
   * @param selector - The CSS selector to look for in the editor
   * @param options - Optional filtering options
   * @param options.text - Optional text content filter
   * @returns All DOM elements matching the selector and optional text filter
   * @throws Error if no elements are found
   */
  function getAllBySelector(
    selector: CodeEditorSelectors,
    options?: { text?: string },
  ): Array<Element>;

  /**
   * Returns the first element matching a specific CodeEditor selector or null if not found
   * @param selector - The CSS selector to look for in the editor
   * @param options - Optional filtering options
   * @param options.text - Optional text content filter
   * @returns The first DOM element matching the selector and optional text filter, or null if not found
   */
  queryBySelector(selector: CodeEditorSelectors, options?: {
    text?: string;
  }): Element | null;

  /**
   * Returns all elements matching a specific CodeEditor selector or null if none are found
   * @param selector - The CSS selector to look for in the editor
   * @param options - Optional filtering options
   * @param options.text - Optional text content filter
   * @returns All DOM elements matching the selector and optional text filter, or null if none found
   */
  function queryAllBySelector(
    selector: CodeEditorSelectors,
    options?: { text?: string },
  ): Array<Element> | null;

  /**
   * Checks if the editor is in read-only mode
   * @returns Boolean indicating whether the editor is in read-only mode
   */
  function isReadOnly(): boolean;

  /**
   * Retrieves the current indentation unit configuration from the editor
   * @returns The string used for indentation (spaces or tab)
   */
  function getIndentUnit(): IndentUnit;

  /**
   * Checks if line wrapping is enabled in the editor
   * @returns Boolean indicating whether line wrapping is enabled
   */
  function isLineWrappingEnabled(): boolean;

  // Group of actions that can be performed on the editor.
  interactions: {
    /**
     * Inserts text into the editor at the specified position
     * @param text - The text to insert
     * @param options - Optional position options
     * @param options.from - Starting position for insertion (defaults to 0)
     * @param options.to - End position for replacement (optional)
     * @throws Error if editor view is not initialized
     */
    insertText(text: string, options?: { to?: number; from?: number; }): undefined;
  }
}
```

### Examples

#### Test selector has rendered

```tsx
import { TestUtils } from '@leafygreen-ui/code-editor';

const { renderEditor } = TestUtils;

test('Line numbers rendered', () => {
  const { editor } = renderCodeEditor({
    defaultValue: 'content',
    enableLineNumbers: true,
  });
  expect(
    editor.getBySelector(CodeEditorSelectors.GutterElement, {
      text: '1',
    }),
  ).toBeInTheDocument();
});
```

#### Test selector has not rendered

```tsx
import { TestUtils } from '@leafygreen-ui/code-editor';

const { renderEditor } = TestUtils;

test('Fold gutter does not render', () => {
  const { editor } = renderCodeEditor({ enableCodeFolding: false });
  expect(
    // Note use of queryBy instead of getBy when test if not rendered
    editor.queryBySelector(CodeEditorSelectors.FoldGutter),
  ).not.toBeInTheDocument();
});
```

#### Test user interaction

```tsx
import { TestUtils } from '@leafygreen-ui/code-editor';

const { renderEditor } = TestUtils;

test('Updates value on when user types', () => {
  const { editor } = renderCodeEditor();

  expect(
    editor.getBySelector(CodeEditorSelectors.Content),
  ).not.toHaveTextContent('new content');

  act(() => {
    editor.interactions.insertText('new content');
  });

  expect(editor.getBySelector(CodeEditorSelectors.Content)).toHaveTextContent(
    'new content',
  );
});
```

## CodeMirror Utils

[CodeMirror v6](https://codemirror.net/) is used to drive `CodeEditor` under the
hood. Some implementations of a CodeMirror editor may be so unique that adopting
this component is too difficult. However, there may be a desire to bring in certain
aspects of this editor to be better inline with the design system - E.g. language
support, themes, and syntax highlighting. For this reason, custom CodeMirror
utils or extensions that are used internally are also exported from this package.

### Utils

#### `createCodeMirrorLanguageExtensions(language: LanguageName): CodeMirrorExtension`

Utility method that will load the language extension used in `CodeEditor` for
any supported `LanguageName`.

##### Usage

```ts
import { createCodeMirrorLanuageExtension, LanguageName } from "@leafygreen-ui/code-editor";
import { EditorState } from "@codemirror/state"

let state = EditorState.create({extensions: [
  createCodeMirrorLanuageExtension(LanguageName.javascript);
]});
```
