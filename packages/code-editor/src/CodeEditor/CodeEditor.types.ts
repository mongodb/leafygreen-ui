import { ReactNode } from 'react';
import type {
  EditorState,
  EditorView,
  Extension,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { type LanguageName } from './codeMirrorExtensions/createLanguageExtension';

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
  Cursor: '.cm-cursor',
  Editor: '.cm-editor',
  Focused: '.cm-focused',
  FoldGutter: '.cm-foldGutter',
  GutterElement: '.cm-gutterElement',
  Gutters: '.cm-gutters',
  HyperLink: '.cm-hyper-link-icon',
  Line: '.cm-line',
  LineNumbers: '.cm-lineNumbers',
  LineWrapping: '.cm-lineWrapping',
  SelectionBackground: '.cm-selectionBackground',
  Tooltip: '.cm-tooltip',
} as const;
export type CodeEditorSelectors =
  (typeof CodeEditorSelectors)[keyof typeof CodeEditorSelectors];

export const IndentUnits = {
  Space: 'space',
  Tab: 'tab',
} as const;
export type IndentUnits = (typeof IndentUnits)[keyof typeof IndentUnits];

export const CodeEditorTooltipSeverity = {
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Hint: 'hint',
} as const;
export type CodeEditorTooltipSeverity =
  (typeof CodeEditorTooltipSeverity)[keyof typeof CodeEditorTooltipSeverity];

export interface CodeEditorTooltip {
  /**
   * Which line in the document the tooltip should be rendered. 1 based.
   */
  line: number;

  /**
   * The length the text that the tooltip should cover in characters.
   */
  length: number;

  /**
   * Which character, going from left to right, the tooltip should start. 1 based.
   * Defaults to 1.
   */
  column?: number;

  /**
   * What gets rendered in the tooltip.
   */
  content: ReactNode;

  /**
   * Severity level of the tooltip. Defaults to 'info'.
   */
  severity?: CodeEditorTooltipSeverity;
}

export interface CodeEditorProps extends DarkModeProps {
  /**
   * Styling prop
   */
  className?: string;

  /**
   * Initial value to render in the editor.
   */
  defaultValue?: string;

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
   * Additional CodeMirror extensions to apply to the editor. These will be applied
   * with high precendence, meaning they can override extensions applied through
   * built in props.
   * @see {@link https://codemirror.net/docs/ref/#state.Extension}
   */
  extensions?: Array<CodeMirrorExtension>;

  /**
   * Forces parsing of complete document, even if it is not visible. USE WITH CAUTION!
   * By default the editor only parses the visible part of the code on the
   * screen. This significantly increases performance when there is a lot of
   * code rendered. When enabled, this forces parsing of non-visible code.
   * This should only be used in exceptional cases.
   */
  forceParsing?: boolean;

  /**
   * Sets the editor's height. If not set, the editor will automatically adjust
   * its height based on the content.
   */
  height?: string;

  /**
   * Sets the editor's indent size on tab click.
   */
  indentSize?: number;

  /**
   * Sets the editor's indent unit on tab click.
   */
  indentUnit?: IndentUnits;

  /**
   * Language to use for syntax highlighting. Will have no highlighting if not set.
   */
  language?: LanguageName;

  /**
   * Sets the editor's max height.
   */
  maxHeight?: string;

  /**
   * Sets the editor's max width.
   */
  maxWidth?: string;

  /**
   * Sets the editor's minimum height.
   */
  minHeight?: string;

  /**
   * Sets the editor's minimum width.
   */
  minWidth?: string;

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
   * Add tooltips to the editor content.
   */
  tooltips?: Array<CodeEditorTooltip>;

  /**
   * Sets the editor's width. If not set, the editor will be 100% width of its
   * parent container.
   */
  width?: string;
}
