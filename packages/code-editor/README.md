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

```ts
import { CodeEditor } from '@leafygreen-ui/code-editor';

<CodeEditor />;
```

#### Properties

| Name                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                       | Default     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ----------- |
| `defaultValue` _(optional)_                 | Initial value to render in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `string`                   | `undefined` |
| `enableActiveLineHighlighting` _(optional)_ | Enables highlighting of the active line.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `boolean`                  | `true`      |
| `enableClickableUrls` _(optional)_          | Renders URLs as clickable links in the editor.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `boolean`                  | `true`      |
| `enableCodeFolding` _(optional)_            | Enables code folding arrows in the gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                  | `true`      |
| `enableLineNumbers` _(optional)_            | Enables line numbers in the editor’s gutter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                  | `true`      |
| `enableLineWrapping` _(optional)_           | Enables line wrapping when the text exceeds the editor’s width.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `boolean`                  | `true`      |
| `forceParsing` _(optional)_                 | _**This should be used with caution as it can significantly impact performance!**_<br><br>Forces the parsing of the complete document, even parts not currently visible.<br><br>By default, the editor optimizes performance by only parsing the code that is visible on the screen, which is especially beneficial when dealing with large amounts of code. Enabling this option overrides this behavior and forces the parsing of all code, visible or not. This should generally be reserved for exceptional circumstances. | `boolean`                  | `false`     |
| `onChange` _(optional)_                     | Callback that receives the updated editor value when changes are made.                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `(value: string) => void;` | `undefined` |
| `placeholder` _(optional)_                  | Value to display in the editor when it is empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `HTMLElement \| string`    | `undefined` |
| `readOnly` _(optional)_                     | Enables read only mode, making the contents uneditable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `boolean`                  | `false`     |

## Types

| Name                     | Description                                                                                                                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CodeEditorProps`        | Props that can be passed to the `CodeEditor` component.                                                                                                                                                   |
| `CodeEditorSelectors`    | Enum-like map of CSS selectors for common elements that make up the code editor. These can be useful in testing.                                                                                          |
| `CodeMirrorExtension`    | Underlying CodeMirror editor `Extension` type. For more information see https://codemirror.net/docs/ref/#state.Extension.                                                                                 |
| `CodeMirrorRef`          | Underlying CodeMirror editor ref type. When a ref is passed to the `CodeEditor` it will be of this type and give you direct access to CodeMirror internals such as `CodeMirrorState` and `CodeMirrorView` |
| `CodeMirrorState`        | Underlying CodeMirror editor `EditorState` type. For more information see https://codemirror.net/docs/ref/#state.EditorState.                                                                             |
| `CodeMirrorView`         | Underlying CodeMirror editor `EditorView` type. For more information see https://codemirror.net/docs/ref/#view.EditorView.                                                                                |
| `RenderedTestResult`     | Type returned by the `renderEditor` test utility. More info in Test Utilities section.                                                                                                                    |
| `RenderedTestEditorType` | Editor type used to interact with editor in a Jest test. More info in Test Utilities section.                                                                                                             |

## Test Utlities

### `renderEditor`

Renders the editor in a Jest test.

```ts
function renderEditor(props?: Partial<CodeEditorProps>): RenderResult;
```

### `RenderResult`

#### `container`

HTML element of the container of the editor that was rendered.

#### `editor`

Editor object used for querying and interacting with the rendered editor.

Has the following interface:

```ts
{
  // Used to find single element in the editor. Will throw error if not found.
  getBySelector(
    selector: CodeEditorSelectors,
    options?: { text?: string },
  ): Element;

  // Used to find single element in the editor. Will return null if not found. Useful when checking if something has not rendered.
  queryBySelector(selector: CodeEditorSelectors, options?: {
    text?: string;
  }): Element | null;

  // Returns whether editor is in a read only state.
  isReadOnly(): boolean;

  // Returns whether line wrapping is enabled in editor.
  isLineWrappingEnabled(): boolean;

  // Group of actions that can be performed on the editor.
  interactions: {
    // Insert text into the editor
    insertText(text: string, options?: { to?: number; from?: number; }): undefined;
  }
}
```

### Examples

#### Test selector has rendered

```ts
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

```ts
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

```ts
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
