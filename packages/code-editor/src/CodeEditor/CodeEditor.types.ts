import type {
  EditorState,
  EditorView,
  Extension,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';

import { DarkModeProps } from '@leafygreen-ui/lib';

/**
 * Re-export of CodeMirror's {@link Extension} type.
 * Extensions provide additional functionality to the editor.
 * @see {@link https://codemirror.net/docs/ref/#state.Extension}
 */
export type CodeMirrorExtension = Extension;

/**
 * Re-export of CodeMirror's {@link ReactCodeMirrorRef} type.
 * Provides access to the editor instance through React refs.
 * @see {@link https://uiwjs.github.io/react-codemirror/#/basic}
 */
export type CodeMirrorRef = ReactCodeMirrorRef;

/**
 * Re-export of CodeMirror's {@link EditorState} type.
 * Represents the complete editor state configuration.
 * @see {@link https://codemirror.net/docs/ref/#state.EditorState}
 */
export type CodeMirrorState = EditorState;

/**
 * Re-export of CodeMirror's {@link EditorView} type.
 * The main editor component that displays and manages the document.
 * @see {@link https://codemirror.net/docs/ref/#view.EditorView}
 */
export type CodeMirrorView = EditorView;

/**
 * The important elements in the code mirror editor have regular (non-generated)
 * CSS class names, which can be targeted. For example, the outer element has
 * class cm-editor. This is a mapping of those selectors which can be used for
 * both testing and styling.
 */
export const CodeEditorSelectors = {
  ActiveLine: '.cm-activeLine',
  ActiveLineGutter: '.cm-activeLineGutter',
  Content: '.cm-content',
  FoldGutter: '.cm-foldGutter',
  GutterElement: '.cm-gutterElement',
  HyperLink: '.cm-hyper-link-icon',
  LineWrapping: '.cm-lineWrapping',
} as const;
export type CodeEditorSelectors =
  (typeof CodeEditorSelectors)[keyof typeof CodeEditorSelectors];

export const IndentUnits = {
  Space: 'space',
  Tab: 'tab',
} as const;
export type IndentUnits = (typeof IndentUnits)[keyof typeof IndentUnits];

export interface CodeEditorProps extends DarkModeProps {
  /**
   * Initial value to render in the editor.
   */
  defaultValue?: string;

  /**
   * Enables highlighting of the active line.
   */
  enableActiveLineHighlighting?: boolean;

  /**
   * Renders URLs as clickable links in the editor.
   */
  enableClickableUrls?: boolean;

  /**
   * Enables code folding arrows in the gutter.
   */
  enableCodeFolding?: boolean;

  /**
   * Enables line numbers in the editor’s gutter.
   */
  enableLineNumbers?: boolean;

  /**
   * Enables line wrapping when the text exceeds the editor’s width.
   */
  enableLineWrapping?: boolean;

  /**
   * Forces parsing of complete document, even if it is not visible. USE WITH CAUTION!
   * By default the editor only parses the visible part of the code on the
   * screen. This significantly increases performance when there is a lot of
   * code rendered. When enabled, this forces parsing of non-visible code.
   * This should only be used in exceptional cases.
   */
  forceParsing?: boolean;

  /**
   * Callback that receives the updated editor value when changes are made.
   */
  onChange?: (value: string) => void;

  /**
   * Value to display in the editor when it is empty.
   */
  placeholder?: HTMLElement | string;

  /**
   * Enables read only mode, making the contents uneditable.
   */
  readOnly?: boolean;

  /**
   * Sets the editor's indent unit on tab click.
   */
  indentUnit?: IndentUnits;

  /**
   * Sets the editor's indent size on tab click.
   */
  indentSize?: number;
}
