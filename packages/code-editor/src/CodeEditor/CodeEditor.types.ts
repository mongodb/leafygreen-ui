import { type ReactNode } from 'react';
import { type EditorState, type Extension } from '@codemirror/state';
import { type EditorView } from '@codemirror/view';

import { type DarkModeProps } from '@leafygreen-ui/lib';

import { type LanguageName } from './hooks/extensions/useLanguageExtension';

/**
 * Re-export of CodeMirror's {@link Extension} type.
 * Extensions provide additional functionality to the editor.
 * @see {@link https://codemirror.net/docs/ref/#state.Extension}
 */
export type CodeMirrorExtension = Extension;

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
 * Type for the DOM node that the CodeMirror editor is rendered into.
 */
export interface HTMLElementWithCodeMirror extends HTMLDivElement {
  _cm?: EditorView;
}

export const CopyButtonAppearance = {
  Hover: 'hover',
  Persist: 'persist',
  None: 'none',
} as const;
export type CopyButtonAppearance =
  (typeof CopyButtonAppearance)[keyof typeof CopyButtonAppearance];

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

export type CodeEditorProps = DarkModeProps & {
  /**
   * Font size of text in the editor.
   *
   * @default 14
   */
  baseFontSize?: 14 | 16;

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
   * Enables line wrapping when the text exceeds the editor's width.
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
   * Renders the editor in a loading state.
   *
   * @remarks
   * The CodeEditor is an asynchronous component that relies on lazy loading of
   * modules. Due to this, regardless of the `isLoading` prop, the editor will
   * always render a loading state until all required modules are loaded.
   * This is to ensure that the editor is fully functional before it is displayed.
   */
  isLoading?: boolean;

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
   * Controlled value of the editor. If set, the editor will not be editable
   * and will not update its value on change. Use `onChange` to update the
   * value externally.
   */
  value?: string;

  /**
   * Sets the editor's width. If not set, the editor will be 100% width of its
   * parent container.
   */
  width?: string;
} & (
    | {
        /**
         * Determines the appearance of the copy button without a panel. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
         *
         * If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.
         *
         * If `persist`, the copy button will always be visible.
         *
         * If `none`, the copy button will not be rendered.
         *
         * Note: 'panel' cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         * @default `hover`
         */
        copyButtonAppearance?: CopyButtonAppearance;

        /**
         * Slot to pass the `<Panel/>` sub-component which will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         */
        panel?: never;
      }
    | {
        /**
         * Determines the appearance of the copy button without a panel. The copy button allows the code block to be copied to the user's clipboard by clicking the button.
         *
         * If `hover`, the copy button will only appear when the user hovers over the code block. On mobile devices, the copy button will always be visible.
         *
         * If `persist`, the copy button will always be visible.
         *
         * If `none`, the copy button will not be rendered.
         *
         * Note: 'panel' cannot be used with `copyButtonAppearance`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         * @default `hover`
         */
        copyButtonAppearance?: never;

        /**
         * Slot to pass the `<Panel/>` sub-component which will render the top panel with a language switcher, custom action buttons, and copy button. If no props are passed to the panel sub-component, the panel will render with only the copy button. Note: `copyButtonAppearance` cannot be used with `panel`. Either use `copyButtonAppearance` or `panel`, not both.
         *
         */
        panel?: React.ReactNode;
      }
  );

/**
 * Imperative handle for the CodeEditor component.
 */
export interface CodeEditorHandle {
  getEditorViewInstance: () => EditorView | null;

  /**
   * Formats the current code content using the appropriate formatter for the selected language.
   * @returns Promise resolving to the formatted code string
   */
  formatCode: () => Promise<string>;

  /**
   * Checks if formatting is available for the current language and configuration.
   * @returns boolean indicating whether formatting is available
   */
  isFormattingAvailable: () => boolean;
}
